# CareerLauncher Pipeline v1.0 Technical Documentation

## System Overview

CareerLauncher is a comprehensive ETL pipeline designed to process job listings at scale. The system handles the complete data lifecycle from raw web crawl data discovery through to cleaned, structured storage in a production database.

## Architecture Diagram

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   CommonCrawl   │────│   Airflow    │────│   AWS Lambda    │
│   (Data Source) │    │   (Orchestr.) │    │   (Processing)  │
└─────────────────┘    └──────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   URL Discovery │    │   S3 Bucket  │    │   Supabase      │
│   (Client Sites)│    │   (Staging)  │    │   (Final DB)    │
└─────────────────┘    └──────────────┘    └─────────────────┘
```

## Technology Stack

### Infrastructure
- **Apache Airflow**: Workflow orchestration and job scheduling
- **AWS Lambda**: Serverless processing functions
- **AWS S3**: Staging storage for batch processing
- **Supabase**: PostgreSQL database with real-time capabilities

### Processing
- **Python 3.9+**: Core processing logic
- **TypeScript**: Lambda functions for performance
- **CommonCrawl**: Web crawl data source
- **BeautifulSoup**: HTML parsing and extraction

### Monitoring
- **CloudWatch**: AWS service monitoring
- **Airflow UI**: Pipeline monitoring and debugging
- **Supabase Dashboard**: Database performance tracking

## Data Flow Architecture

### 1. URL Discovery Phase
```python
def discover_job_sites():
    """
    Extract job board URLs from CommonCrawl index
    """
    crawl_index = get_latest_crawl_index()
    job_patterns = [
        '*/jobs/*',
        '*/careers/*',
        '*/job-openings/*',
        '*/employment/*'
    ]
    
    discovered_urls = []
    for pattern in job_patterns:
        urls = query_common_crawl(crawl_index, pattern)
        discovered_urls.extend(urls)
        
    return deduplicate_urls(discovered_urls)
```

### 2. Content Extraction
```typescript
export const extractJobData = async (url: string) => {
    try {
        const response = await fetch(url, {
            timeout: 30000,
            headers: {
                'User-Agent': 'CareerLauncher/1.0 (+https://careerlauncher.io)'
            }
        });
        
        const html = await response.text();
        const jobData = parseJobListing(html);
        
        return {
            url,
            extractedAt: new Date().toISOString(),
            ...jobData
        };
    } catch (error) {
        console.error(`Failed to extract from ${url}:`, error);
        throw error;
    }
};
```

### 3. Data Processing Pipeline
```python
class JobDataProcessor:
    def __init__(self):
        self.s3_client = boto3.client('s3')
        self.supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
    def process_batch(self, s3_key: str):
        """
        Process a batch of job listings from S3
        """
        raw_data = self.download_from_s3(s3_key)
        
        processed_jobs = []
        for job_data in raw_data:
            try:
                cleaned_job = self.clean_job_data(job_data)
                enriched_job = self.enrich_job_data(cleaned_job)
                processed_jobs.append(enriched_job)
            except Exception as e:
                self.log_processing_error(job_data, e)
                
        # Batch insert to database
        self.bulk_insert_jobs(processed_jobs)
        
        return len(processed_jobs)
```

## Database Schema

### Core Tables
```sql
-- Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE,
    industry VARCHAR(100),
    size_category VARCHAR(50),
    location_hq VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Job listings table
CREATE TABLE job_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    salary_currency CHAR(3),
    employment_type VARCHAR(50),
    experience_level VARCHAR(50),
    remote_allowed BOOLEAN DEFAULT FALSE,
    source_url VARCHAR(1000),
    posted_date DATE,
    scraped_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
);

-- Skills and requirements
CREATE TABLE job_skills (
    job_id UUID REFERENCES job_listings(id),
    skill_name VARCHAR(100),
    is_required BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (job_id, skill_name)
);

-- Location data
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city VARCHAR(100),
    state_province VARCHAR(100),
    country VARCHAR(100),
    coordinates POINT,
    timezone VARCHAR(50)
);
```

### Indexes for Performance
```sql
-- Search optimization
CREATE INDEX idx_job_listings_title_gin ON job_listings 
USING gin(to_tsvector('english', title));

CREATE INDEX idx_job_listings_location ON job_listings(location);
CREATE INDEX idx_job_listings_company_id ON job_listings(company_id);
CREATE INDEX idx_job_listings_posted_date ON job_listings(posted_date);

-- Skills search
CREATE INDEX idx_job_skills_name ON job_skills(skill_name);
```

## Airflow DAG Configuration

```python
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'careerlauncher',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1),
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=15)
}

dag = DAG(
    'job_data_pipeline',
    default_args=default_args,
    description='Daily job data processing pipeline',
    schedule_interval='0 2 * * *',  # Daily at 2 AM
    catchup=False,
    max_active_runs=1
)

# Task definitions
discover_urls_task = PythonOperator(
    task_id='discover_job_urls',
    python_callable=discover_job_sites,
    dag=dag
)

extract_data_task = PythonOperator(
    task_id='extract_job_data',
    python_callable=lambda **context: trigger_lambda_extraction(
        context['task_instance'].xcom_pull(task_ids='discover_job_urls')
    ),
    dag=dag
)

process_data_task = PythonOperator(
    task_id='process_job_data',
    python_callable=process_extracted_data,
    dag=dag
)

# Task dependencies
discover_urls_task >> extract_data_task >> process_data_task
```

## AWS Lambda Functions

### Job Data Extractor
```typescript
import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import * as cheerio from 'cheerio';

export const handler: APIGatewayProxyHandler = async (event) => {
    const { urls } = JSON.parse(event.body);
    const s3 = new S3();
    
    const extractionPromises = urls.map(async (url: string) => {
        try {
            const jobData = await extractJobData(url);
            return {
                url,
                success: true,
                data: jobData
            };
        } catch (error) {
            return {
                url,
                success: false,
                error: error.message
            };
        }
    });
    
    const results = await Promise.allSettled(extractionPromises);
    
    // Upload results to S3 for batch processing
    const timestamp = new Date().toISOString();
    const s3Key = `extractions/${timestamp}/batch.json`;
    
    await s3.putObject({
        Bucket: 'careerlauncher-staging',
        Key: s3Key,
        Body: JSON.stringify(results),
        ContentType: 'application/json'
    }).promise();
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            processedUrls: urls.length,
            s3Location: s3Key,
            successRate: results.filter(r => r.status === 'fulfilled').length / results.length
        })
    };
};
```

## Data Quality and Validation

### Input Validation
```python
from pydantic import BaseModel, validator, HttpUrl
from typing import Optional, List
from datetime import date

class JobListing(BaseModel):
    title: str
    company_name: str
    location: str
    description: str
    source_url: HttpUrl
    posted_date: Optional[date]
    salary_min: Optional[float]
    salary_max: Optional[float]
    employment_type: Optional[str]
    
    @validator('title')
    def title_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Job title cannot be empty')
        return v.strip()
        
    @validator('employment_type')
    def valid_employment_type(cls, v):
        valid_types = ['full-time', 'part-time', 'contract', 'internship', 'temporary']
        if v and v.lower() not in valid_types:
            raise ValueError(f'Employment type must be one of {valid_types}')
        return v
```

### Data Cleaning Pipeline
```python
def clean_job_data(raw_job: dict) -> JobListing:
    """
    Clean and standardize job data
    """
    # Normalize text fields
    raw_job['title'] = normalize_job_title(raw_job.get('title', ''))
    raw_job['company_name'] = clean_company_name(raw_job.get('company_name', ''))
    
    # Standardize location
    raw_job['location'] = standardize_location(raw_job.get('location', ''))
    
    # Parse salary information
    salary_data = parse_salary(raw_job.get('salary', ''))
    raw_job.update(salary_data)
    
    # Extract skills from description
    skills = extract_skills(raw_job.get('description', ''))
    raw_job['skills'] = skills
    
    return JobListing(**raw_job)
```

## Performance Monitoring

### Key Metrics
```python
# Pipeline performance tracking
PIPELINE_METRICS = {
    'total_urls_discovered': Counter(),
    'extraction_success_rate': Histogram(),
    'processing_time_seconds': Histogram(),
    'database_insert_rate': Counter(),
    'error_rate_by_source': Counter(),
}

def track_pipeline_performance(func):
    """Decorator to track pipeline performance metrics"""
    def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            PIPELINE_METRICS['extraction_success_rate'].observe(1.0)
            return result
        except Exception as e:
            PIPELINE_METRICS['extraction_success_rate'].observe(0.0)
            PIPELINE_METRICS['error_rate_by_source'].inc()
            raise
        finally:
            duration = time.time() - start_time
            PIPELINE_METRICS['processing_time_seconds'].observe(duration)
    return wrapper
```

### Alerting Configuration
```python
# Slack notifications for pipeline issues
def send_pipeline_alert(message: str, severity: str = 'warning'):
    webhook_url = os.getenv('SLACK_WEBHOOK_URL')
    
    color_map = {
        'info': '#36a64f',
        'warning': '#ffcc00',
        'error': '#ff0000'
    }
    
    payload = {
        'attachments': [{
            'color': color_map.get(severity, '#808080'),
            'text': message,
            'title': f'CareerLauncher Pipeline {severity.title()}',
            'timestamp': int(time.time())
        }]
    }
    
    requests.post(webhook_url, json=payload)
```

## Deployment and Operations

### Environment Configuration
```yaml
# docker-compose.yml for local development
version: '3.8'
services:
  airflow:
    image: apache/airflow:2.5.0
    environment:
      AIRFLOW__CORE__EXECUTOR: LocalExecutor
      AIRFLOW__DATABASE__SQL_ALCHEMY_CONN: postgresql://user:pass@postgres/airflow
    volumes:
      - ./dags:/opt/airflow/dags
      - ./logs:/opt/airflow/logs
    
  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: airflow
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    
  redis:
    image: redis:6
```

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy CareerLauncher Pipeline
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy Lambda Functions
        run: |
          sam build
          sam deploy --no-confirm-changeset --no-fail-on-empty-changeset
      - name: Update Airflow DAGs
        run: |
          aws s3 sync ./dags s3://$AIRFLOW_S3_BUCKET/dags/
```

## Future Enhancements

### Planned Features
1. **Real-time Processing**: Stream processing for immediate job posting updates
2. **ML Enhancement**: Job classification and salary prediction models
3. **API Layer**: Public API for job search functionality
4. **Advanced Analytics**: Company hiring trends and market insights

### Scaling Considerations
1. **Database Partitioning**: Partition job_listings by date for improved query performance
2. **Caching Layer**: Redis cache for frequently accessed job searches
3. **Load Balancing**: Multiple Lambda instances for high-volume processing
4. **Data Archival**: Move older job listings to cold storage

---

*This documentation covers the production v1.0 implementation processing 45k+ job listings daily with 89% success rate.*