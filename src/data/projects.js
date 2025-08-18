export const projects = [
  {
    id: 'hanzismith',
    title: 'Hanzismith',
    icon: '汉',
    color: 'bg-red-50',
    iconColor: 'text-red-600',
    summary: 'Adaptive Chinese learning platform with NLP-powered vocabulary extraction',
    description: 'Web application that transforms any Chinese text into personalized learning material with hover translations and spaced repetition flashcards',
    impact: 'Automated a manual 2-hour study process into a 5-minute workflow',
    skills: ['Python', 'Flask', 'SQLite', 'NLP APIs', 'JavaScript', 'HTML/CSS'],
    versions: [
      {
        version: 'v0.1-beta',
        title: 'Airtable + Mochi Integration',
        date: 'March 2024',
        stack: ['Python', 'Airtable API', 'Mochi API'],
        description: 'Initial proof of concept using Airtable as database and Mochi for flashcards',
        highlights: [
          'Automated vocabulary extraction with pinyin lookup',
          'Unit tested API integrations',
          'Batch processing for flashcard deck creation'
        ],
        documentationFile: 'hanzismith-v0.1-beta.md'
      },
      {
        version: 'v1.0',
        title: 'Full Stack Web Application',
        date: 'July 2024',
        stack: ['Python', 'Flask', 'SQLite', 'Bootstrap', 'JavaScript'],
        description: 'CS50 final project - complete web application with user authentication',
        highlights: [
          'HanLP NLP integration for text parsing',
          'Real-time hover translations',
          'Custom flashcard review system',
          'Multi-user support with auth'
        ],
        documentationFile: 'hanzismith-v1.0.md'
      }
    ]
  },
  {
    id: 'careerlauncher',
    title: 'CareerLauncher Pipeline',
    icon: '🚀',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    summary: 'Scalable ETL pipeline processing 45k+ job listings from multiple aggregators',
    description: 'End-to-end data pipeline orchestrated with Airflow, handling CommonCrawl extraction through to cleaned Supabase storage',
    impact: 'Achieved 89% success rate processing 45k job listings across multiple APIs',
    skills: ['Python', 'TypeScript', 'Airflow', 'AWS Lambda', 'S3', 'Supabase', 'CommonCrawl'],
    versions: [
      {
        version: 'v1.0',
        title: 'Production Pipeline',
        date: 'December 2024',
        stack: ['Python', 'TypeScript', 'Airflow', 'AWS', 'Supabase'],
        description: 'Full production pipeline with async processing and batch optimization',
        highlights: [
          'CommonCrawl URL extraction for client discovery',
          'Async Lambda processing with S3 staging',
          'Batch processing with memory optimization',
          'Relational data model with company/location/industry entities'
        ],
        documentationFile: 'careerlauncher-v1.0.md'
      }
    ]
  }
];