# Hanzismith v0.1-beta Technical Documentation

## Architecture Overview

The initial proof-of-concept for Hanzismith was built as a Python script that integrated with external services to create a streamlined Chinese vocabulary learning workflow.

## System Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Python Script │────│  Airtable    │────│   Mochi Cards   │
│   (Core Logic)  │    │  (Database)  │    │   (Flashcards)  │
└─────────────────┘    └──────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│   NLP APIs      │
│   (Translation) │
└─────────────────┘
```

## Key Components

### 1. Text Processing Pipeline
```python
def process_chinese_text(text):
    """
    Extract vocabulary from Chinese text and prepare for learning
    """
    # Segment text into words
    words = segment_text(text)
    
    # Filter by difficulty/frequency
    filtered_words = filter_vocabulary(words)
    
    # Add translations and pinyin
    enriched_words = add_translations(filtered_words)
    
    return enriched_words
```

### 2. Airtable Integration
- **Base Structure**: Single table with fields for Chinese word, pinyin, translation, difficulty level
- **API Workflow**: Batch creation of records with duplicate prevention
- **Data Validation**: Ensures consistent formatting and prevents empty records

### 3. Mochi Flashcard Generation
- **Deck Management**: Automated deck creation based on text source
- **Card Templates**: Standardized front/back card format
- **Batch Processing**: Efficient API calls to minimize rate limiting

## Implementation Details

### Dependencies
```python
import requests
import jieba
import pinyin
from airtable import Airtable
```

### Configuration
```python
AIRTABLE_BASE_ID = "your_base_id"
AIRTABLE_API_KEY = "your_api_key"
MOCHI_API_ENDPOINT = "https://app.mochi.cards/api"
```

### Core Algorithm
The system processes text in the following steps:

1. **Text Segmentation**: Uses jieba for word boundary detection
2. **Vocabulary Filtering**: Removes common words based on frequency lists
3. **Translation Lookup**: Queries multiple translation APIs for accuracy
4. **Pinyin Generation**: Adds pronunciation guides for each character
5. **Data Storage**: Creates structured records in Airtable
6. **Flashcard Creation**: Generates Mochi cards with spaced repetition settings

## Performance Metrics

- **Processing Speed**: ~500 words per minute
- **API Reliability**: 95% success rate with retry logic
- **Accuracy**: 90% translation accuracy (manual verification of 100 sample words)

## Lessons Learned

### What Worked Well
- **API Integrations**: Both Airtable and Mochi APIs were reliable and well-documented
- **Modular Design**: Separating concerns made debugging easier
- **Batch Processing**: Significantly reduced API call overhead

### Challenges
- **Rate Limiting**: Had to implement exponential backoff for API calls
- **Text Encoding**: Chinese character encoding issues required UTF-8 handling
- **Duplicate Detection**: Manual process to prevent duplicate vocabulary entries

## Future Improvements
- Web interface for easier text input
- Real-time processing instead of batch jobs
- User authentication and personalized vocabulary lists
- Advanced NLP for context-aware translations

## Testing Strategy

### Unit Tests
```python
def test_text_segmentation():
    text = "我喜欢学习中文"
    result = segment_text(text)
    assert len(result) == 5
    
def test_translation_accuracy():
    word = "学习"
    translation = get_translation(word)
    assert "study" in translation.lower()
```

### Integration Tests
- End-to-end processing of sample texts
- API connection validation
- Data integrity checks in Airtable

## Deployment Notes

### Requirements
- Python 3.8+
- Valid Airtable and Mochi API credentials
- Internet connection for translation services

### Setup Instructions
1. Clone repository and install dependencies
2. Configure API credentials in config.py
3. Run initial test with sample text
4. Process full documents as needed

---

*This documentation covers the initial proof-of-concept implementation. See hanzismith-v1.0.md for the full web application documentation.*