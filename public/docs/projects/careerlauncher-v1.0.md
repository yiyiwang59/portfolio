# CareerLauncher Data Pipeline: Technical Architecture & Implementation

**A Production-Ready ETL Pipeline for Job Market Data Aggregation**

---

## Executive Summary

CareerLauncher is a collaborative data engineering project building a comprehensive job matching application platform. As the data pipeline architect, I designed and implemented a sophisticated ETL system that discovers, collects, processes, and serves job listing data from multiple recruitment platforms. 

The pipeline successfully processes 45,000+ job listings from 1,500+ companies across multiple aggregators, achieving 89.9% data quality rates with a 15-minute end-to-end execution time. Built with modern cloud-native technologies, this production-ready system demonstrates advanced data engineering patterns including dynamic task orchestration, intelligent batching, and fault-tolerant distributed processing.

---

## Project Context & Collaboration

**Timeline**: June 9, 2025 - August 18, 2025 (10 weeks)

**Project Structure**: Collaborative development with clear ownership boundaries:
- **Data Pipeline & ETL Architecture**: My primary responsibility (subject of this documentation)
- **Web Scraping Infrastructure**: Partner's domain expertise
- **Frontend Application**: Partner's responsibility

**Business Objective**: Build a job matching platform that helps candidates discover relevant opportunities by analyzing job requirements against their qualifications. The data pipeline serves as the foundation, aggregating comprehensive job market data while avoiding legal restrictions of major platforms.

**Current Status**: Production-ready data pipeline (MVP deployment pending frontend integration)

---

## Technical Architecture Overview

### Technology Stack
- **Orchestration**: Apache Airflow with dynamic task generation
- **Compute**: AWS Lambda (TypeScript/Node.js)
- **Data Processing**: Python for discovery, TypeScript for ETL operations
- **Storage**: AWS S3 (staging), Supabase PostgreSQL (production)
- **External Data**: CommonCrawl web crawl database
- **APIs**: SmartRecruiters, Greenhouse job aggregator platforms

### Core Architecture Principles
- **Microservices Design**: Isolated Lambda functions for each processing stage
- **Dynamic Scaling**: Task count automatically adjusts to data volume
- **Batch Processing**: Memory-efficient processing of large datasets
- **Fault Tolerance**: Individual component failures don't cascade
- **Data Quality**: Multi-stage validation and error recovery

---

## System Components

### 1. Company Discovery Engine (CommonCrawl Integration)

**Purpose**: Systematically identify companies using specific job aggregator platforms

**Implementation**: Python-based service that queries CommonCrawl's web crawl database
```python
# Query CommonCrawl for job aggregator patterns
patterns = [
    'greenhouse.io/*/jobs',
    'smartrecruiters.com/*/jobs',
    'jobs.*.com/greenhouse'
]
```

**Process**:
1. Execute SQL queries against CommonCrawl's petabyte-scale dataset
2. Extract company URLs using pattern matching
3. Deduplicate and normalize company identifiers
4. Generate CSV files organized by aggregator platform
5. Store in S3 for downstream processing

**Output**: 
- `smartrecruiters_clients.csv` (1,200+ companies)
- `greenhouse_clients.csv` (800+ companies)

### 2. Job Collection Pipeline (Airflow + Lambda)

**Architecture**: Dynamic Airflow DAG with Lambda-based parallel processing

**Key Innovation**: `.expand()` task mapping that creates tasks based on actual data volume
```python
# Dynamic task generation based on company count
batch_configs = generate_batch_configs(company_count, batch_size=50)
results = collect_jobs_batch.expand(batch_config=batch_configs)
```

**Lambda Function**: `runJobServiceLambda`
- Processes 50 companies per invocation
- Makes API calls to SmartRecruiters/Greenhouse
- Handles rate limiting and authentication
- Stores raw JSON responses in Supabase

**Performance Results**:
- SmartRecruiters: 99.6% API success rate
- Greenhouse: 51% API success rate (due to authentication restrictions)
- Parallel execution of 30+ Lambda functions simultaneously

### 3. Data Cleaning & Transformation Pipeline

**Challenge Solved**: Original monolithic approach caused Lambda timeouts with large datasets

**Solution**: Intelligent batching with S3-based staging
- Process companies in batches of 150 (optimized for memory usage)
- Use S3 as intermediate storage between processing stages
- Handle relational data (companies, industries, locations) efficiently

**Lambda Function**: `cleaningServiceLambda`

**Process Flow**:
1. Query raw API responses from Supabase (150 companies per batch)
2. Parse platform-specific JSON schemas into unified format
3. Extract and normalize:
   - Company information and create/update company records
   - Job locations (city, state, country)
   - Industry classifications
   - Job metadata (titles, descriptions, requirements)
4. Save cleaned data to S3 as JSON files with session tracking
5. Generate processing metadata and statistics

**Key Technical Achievement**: Solved memory management issues that were causing 15-minute Lambda timeouts by implementing chunked processing and explicit garbage collection.

### 4. Database Loading Pipeline

**Challenge Solved**: Parallel database uploads were overwhelming Supabase connection limits (9 simultaneous uploads causing 100% failure rate)

**Solution**: Sequential processing with intelligent delays
- Process S3 files one at a time instead of parallel uploads
- 5-second delays between upload batches
- Optimized batch size (500 records per upload)
- URL-based conflict resolution for duplicate job postings

**Lambda Function**: `loadJobsLambda`

**Results After Optimization**:
- Loading success rate: 0% → 100%
- Processing time: Consistent 5-8 minutes for full dataset
- Data quality: 89.9% of processed jobs successfully loaded

---

## Architecture Diagrams

### [DIAGRAM 1: Overall System Architecture]
![System Architecture](/public/images/projects/careerlauncher-v1.0/architecture.png)

### [DIAGRAM 2: ETL Data Flow]
![ETL Data Flow](/public/images/projects/careerlauncher-v1.0/data_flow.png)

### [DIAGRAM 3: Supabase Data Schema]
![Database Schema](/public/images/projects/careerlauncher-v1.0/data_schema.png)

---

## Engineering Problem-Solving Journey

*This section demonstrates the iterative problem-solving approach that led to the final production-ready architecture.*

### Challenge 1: Memory Management & Lambda Timeouts

**Initial Problem**: Processing all company data in a single Lambda function
- Lambda functions timing out after 15 minutes
- Memory overflow with large datasets
- Unable to process more than 200-300 companies reliably

**Iteration 1**: Reduced batch sizes
- Decreased from 250 to 150 companies per batch
- Helped but didn't eliminate timeout issues entirely

**Final Solution**: Architectural separation with S3 staging
- Separated collection, cleaning, and loading into distinct services
- Used S3 as intermediate storage between processing stages
- Implemented explicit garbage collection and memory management
- **Result**: Eliminated timeouts, now reliably processes 1,500+ companies

### Challenge 2: Database Connection Overwhelm

**Problem Discovery**: 
- Multiple parallel upload processes overwhelming Supabase
- 9 simultaneous Lambda functions trying to upload to database
- 100% failure rate on database uploads due to connection limits

**Debugging Process**:
```
Initial logs showed: "Read timeout on endpoint URL"
Investigation revealed: Database connection pool exhaustion
Root cause: Parallel processing exceeding connection limits
```

**Solution Evolution**:
1. **First Attempt**: Increase connection timeouts → Still failed
2. **Second Attempt**: Reduce batch sizes → Minimal improvement  
3. **Final Solution**: Sequential processing with controlled delays
   - Changed from parallel to sequential file processing
   - Added 5-second delays between upload batches
   - Optimized individual batch sizes to 500 records
   - **Result**: 0% → 100% upload success rate

### Challenge 3: Dynamic Scaling Based on Data Volume

**Problem**: Pipeline needed to handle varying company counts without manual configuration

**Solution**: Dynamic task generation using Airflow's `.expand()` functionality
```python
# Automatically scales from 5 to 500+ parallel tasks based on data
def generate_batch_configs(company_count, batch_size):
    total_batches = math.ceil(company_count / batch_size)
    return [create_batch_config(i) for i in range(total_batches)]

# Creates exactly the right number of tasks
batch_results = process_batch.expand(batch_config=batch_configs)
```

**Impact**: System automatically adapts to any data volume without code changes

### Challenge 4: API Rate Limiting & Error Handling

**SmartRecruiters Success**: 99.6% success rate
- Proper authentication handling
- Appropriate request delays (100ms between companies)
- Robust retry logic with exponential backoff

**Greenhouse Challenges**: 51% success rate
- Authentication restrictions on many company endpoints
- Inconsistent API access patterns
- Rate limiting variations by company

**Implemented Solutions**:
- Platform-specific error handling strategies
- Graceful degradation (continue processing other companies if one fails)
- Comprehensive error logging for debugging and optimization

---

## Technical Implementation Details

### Database Schema

**Raw Data Storage**:
```sql
source_job_listing_responses (
  id UUID PRIMARY KEY,
  aggregator_platform TEXT,
  company_id TEXT,
  response JSONB,        -- Complete API response
  created_at TIMESTAMP
)
```

**Clean Data Schema**:
```sql
job_listing (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  company_id UUID REFERENCES companies(id),
  aggregator_id UUID REFERENCES aggregators(id),
  location_id UUID REFERENCES locations(id),
  industry_id UUID REFERENCES industries(id),
  url TEXT UNIQUE,       -- Used for deduplication
  posted_date TIMESTAMP,
  last_updated TIMESTAMP DEFAULT NOW(),
  description TEXT,
  department TEXT,
  employment_type TEXT,
  experience_level TEXT
)
```

### Batch Processing Strategy

**Collection Phase**: 50 companies per Lambda
- Optimized for API rate limits
- Small enough to avoid timeouts
- Large enough for efficiency

**Cleaning Phase**: 150 companies per Lambda  
- Balances memory usage vs. processing time
- Handles variable job counts per company
- Manages relational data updates efficiently

**Loading Phase**: 500 records per upload batch
- Optimized for database performance
- Prevents connection pool exhaustion
- Provides good progress granularity

### Session Management

**Session ID Format**: `8-17-2025-14-30`
- Tracks complete pipeline runs
- Enables data lineage and debugging
- Allows partial reprocessing if needed

**S3 File Organization**:
```
s3://careerlauncher/staging/cleanedJobListings/
├── collect-8-17-2025-14-30/
│   ├── batch0_uuid123.json (metadata + 8,585 jobs)
│   ├── batch1_uuid456.json (metadata + 7,432 jobs)
│   └── batch2_uuid789.json (metadata + 6,891 jobs)
```

---

## Performance Metrics & Results

### Data Processing Volume
- **Companies Processed**: 1,500+ across 2 aggregators
- **Raw API Responses**: 45,000+ job listings collected
- **Clean Data Output**: 40,000+ validated job records in database
- **Processing Time**: 15 minutes end-to-end

### Success Rates by Component
- **CommonCrawl Discovery**: 100% (deterministic SQL queries)
- **SmartRecruiters Collection**: 99.6% API success rate
- **Greenhouse Collection**: 51% API success rate (authentication limitations)
- **Data Cleaning**: ~99% (estimated based on validation rules)
- **Database Loading**: 89.9% final loading success rate

### System Performance
- **Parallel Processing**: 30+ simultaneous Lambda functions
- **Memory Efficiency**: No timeouts after batching optimization
- **Database Performance**: 100% upload success after sequential optimization
- **Error Recovery**: Individual failures don't impact overall pipeline

### Resource Optimization
- **Lambda Memory**: 1024MB optimized for processing workload
- **S3 Storage**: ~2GB for staging data per pipeline run
- **Database Connections**: Managed to stay within Supabase Pro limits
- **API Rate Compliance**: Respected all platform rate limits

---

## Current Architecture Benefits

### 1. Scalability
- **Horizontal Scaling**: Add more aggregators without architectural changes
- **Volume Scaling**: Handles 10x data increases automatically
- **Resource Scaling**: Lambda functions scale to zero when not in use

### 2. Reliability  
- **Fault Tolerance**: Individual component failures are isolated
- **Data Quality**: Multi-stage validation ensures high data integrity
- **Error Recovery**: Comprehensive retry mechanisms and logging
- **Monitoring**: Real-time visibility into pipeline health

### 3. Maintainability
- **Modular Design**: Each component has single responsibility
- **Clear Data Flow**: Easy to trace data through pipeline stages
- **Session Tracking**: Complete audit trail for every pipeline run
- **Comprehensive Logging**: Detailed information for debugging

### 4. Cost Efficiency
- **Serverless Architecture**: Pay only for actual processing time
- **Optimized Batching**: Minimizes API calls and database operations
- **Intelligent Staging**: S3 costs minimal compared to compute savings

---

## Future Optimization Opportunities

### 1. Asynchronous Processing Enhancement
**Current Bottleneck**: All Lambda functions triggered simultaneously can overwhelm downstream services

**Planned Solution**: Implement controlled concurrency
- Batch Lambda invocations (e.g., 5 functions at a time)
- Wait for batch completion before triggering next batch
- Maintain throughput while preventing resource exhaustion

### 2. Advanced Error Handling
- Circuit breaker patterns for API failures
- Automatic retry with increasing delays
- Dead letter queues for failed items

### 3. Real-time Processing
- Stream processing for incremental updates
- Change data capture for real-time job posting alerts
- Event-driven architecture for immediate processing

### 4. Enhanced Monitoring
- Custom CloudWatch dashboards
- Automated alerting for pipeline failures
- Performance trend analysis and optimization recommendations

---

## Technical Skills Demonstrated

### Data Engineering
- **ETL Pipeline Design**: Complete data lifecycle management
- **Batch Processing**: Efficient handling of large datasets
- **Data Quality**: Validation, cleaning, and normalization processes
- **Schema Design**: Relational database modeling and optimization

### Cloud Architecture
- **Serverless Computing**: AWS Lambda design and optimization
- **Event-Driven Systems**: Airflow orchestration with dynamic scaling
- **Storage Optimization**: S3 staging patterns and lifecycle management
- **Database Performance**: Connection pooling and batch optimization

### Problem Solving
- **Performance Optimization**: Memory management and timeout resolution
- **Scalability Solutions**: Dynamic task generation and resource management
- **Error Handling**: Robust retry mechanisms and graceful degradation
- **System Integration**: API management and rate limiting compliance

### Tools & Technologies
- **Apache Airflow**: Advanced DAG patterns with dynamic task mapping
- **AWS Lambda**: TypeScript/Node.js serverless development
- **PostgreSQL**: Complex queries and database optimization
- **Python**: Data processing and CommonCrawl integration
- **API Integration**: RESTful services with authentication and rate limiting

---

## Conclusion

This project represents a comprehensive data engineering solution built from the ground up to handle real-world challenges of large-scale data processing. The evolution from initial concept to production-ready pipeline demonstrates practical problem-solving skills and deep understanding of distributed systems architecture.

Key achievements include:
- **Successful scaling** from proof-of-concept to processing 45,000+ records
- **Performance optimization** eliminating timeouts and achieving 100% upload reliability  
- **Sophisticated orchestration** using dynamic Airflow patterns rarely seen in production
- **Production-ready architecture** with proper error handling, monitoring, and resource management

The pipeline is currently ready for deployment and actively supports the development of CareerLauncher's job matching platform, demonstrating the direct business impact of technical engineering decisions.

---

*CareerLauncher Data Pipeline v1.0*  
*Architecture Documentation - August 2025*  
*Production-Ready ETL System for Job Market Intelligence*