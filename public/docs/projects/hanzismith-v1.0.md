# Hanzismith v1.0 Technical Documentation

## Overview

Hanzismith v1.0 represents a complete evolution from the initial proof-of-concept to a full-stack web application. Built as my CS50 final project, it demonstrates end-to-end web development skills with a focus on user experience and scalable architecture.

## Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Frontend      │────│   Flask API  │────│   SQLite DB     │
│   (Bootstrap)   │    │   (Python)   │    │   (Local)       │
└─────────────────┘    └──────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   JavaScript    │    │   HanLP NLP     │
│   (Interactivity)│    │   (Processing)  │
└─────────────────┘    └─────────────────┘
```

## Technology Stack

### Backend
- **Flask**: Web framework for API endpoints and server logic
- **SQLite**: Local database for development simplicity
- **SQLAlchemy**: ORM for database operations
- **HanLP**: Advanced Chinese NLP processing
- **Werkzeug**: Password hashing and security

### Frontend
- **Bootstrap 5**: Responsive UI framework
- **JavaScript**: Interactive features and AJAX calls
- **Jinja2**: Template engine for dynamic content
- **CSS3**: Custom styling and animations

## Database Schema

```sql
-- Users table for authentication
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Texts table for uploaded content
CREATE TABLE texts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vocabulary table for extracted words
CREATE TABLE vocabulary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text_id INTEGER REFERENCES texts(id),
    user_id INTEGER REFERENCES users(id),
    chinese_word VARCHAR(50) NOT NULL,
    pinyin VARCHAR(100),
    translation VARCHAR(200),
    difficulty_level INTEGER,
    review_count INTEGER DEFAULT 0,
    last_reviewed TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User progress tracking
CREATE TABLE user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id),
    vocabulary_id INTEGER REFERENCES vocabulary(id),
    proficiency_level INTEGER DEFAULT 1,
    next_review TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Key Features Implementation

### 1. Text Processing Engine

```python
import hanlp

class TextProcessor:
    def __init__(self):
        self.tokenizer = hanlp.load('FINE_ELECTRA_SMALL_ZH')
        
    def extract_vocabulary(self, text, difficulty_threshold=2):
        """
        Extract vocabulary from Chinese text using HanLP
        """
        # Tokenize text
        tokens = self.tokenizer(text)
        
        # Filter by criteria
        vocabulary = []
        for token in tokens:
            if self.is_suitable_for_learning(token, difficulty_threshold):
                word_data = {
                    'word': token['form'],
                    'pinyin': self.get_pinyin(token['form']),
                    'pos': token['pos'],
                    'translation': self.get_translation(token['form'])
                }
                vocabulary.append(word_data)
                
        return vocabulary
```

### 2. Interactive Reading Interface

```javascript
// Hover translation system
document.addEventListener('DOMContentLoaded', function() {
    const chineseWords = document.querySelectorAll('.chinese-word');
    
    chineseWords.forEach(word => {
        word.addEventListener('mouseenter', function() {
            showTranslation(this);
        });
        
        word.addEventListener('mouseleave', function() {
            hideTranslation();
        });
    });
});

function showTranslation(element) {
    const translation = element.dataset.translation;
    const pinyin = element.dataset.pinyin;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'translation-tooltip';
    tooltip.innerHTML = `
        <div class="pinyin">${pinyin}</div>
        <div class="translation">${translation}</div>
    `;
    
    document.body.appendChild(tooltip);
    positionTooltip(tooltip, element);
}
```

### 3. Spaced Repetition System

```python
from datetime import datetime, timedelta
import math

class SpacedRepetition:
    def calculate_next_review(self, proficiency, review_count):
        """
        Calculate next review date based on spaced repetition algorithm
        """
        base_interval = 1  # days
        multiplier = 2.5
        
        if proficiency >= 3:  # Easy
            interval = base_interval * (multiplier ** review_count)
        elif proficiency == 2:  # Medium
            interval = base_interval * (2.0 ** review_count)
        else:  # Hard
            interval = base_interval
            
        return datetime.now() + timedelta(days=int(interval))
```

### 4. User Authentication

```python
from werkzeug.security import generate_password_hash, check_password_hash
from flask_session import Session

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Validate input
        if not username or not password:
            return render_template('register.html', error='All fields required')
            
        # Hash password
        password_hash = generate_password_hash(password)
        
        # Insert user
        try:
            db.execute(
                "INSERT INTO users (username, password_hash) VALUES (?, ?)",
                username, password_hash
            )
            return redirect('/login')
        except IntegrityError:
            return render_template('register.html', error='Username already exists')
```

## API Endpoints

### Text Management
- `POST /api/texts` - Upload new text
- `GET /api/texts` - List user's texts
- `GET /api/texts/<id>` - Get specific text with vocabulary
- `DELETE /api/texts/<id>` - Remove text

### Vocabulary Operations
- `GET /api/vocabulary` - Get user's vocabulary list
- `POST /api/vocabulary/<id>/review` - Submit review result
- `PUT /api/vocabulary/<id>` - Update word progress
- `GET /api/vocabulary/due` - Get words due for review

### User Management
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - Account creation
- `POST /api/auth/logout` - Session termination

## Performance Optimizations

### Database Indexing
```sql
CREATE INDEX idx_vocabulary_user_id ON vocabulary(user_id);
CREATE INDEX idx_vocabulary_text_id ON vocabulary(text_id);
CREATE INDEX idx_user_progress_next_review ON user_progress(next_review);
```

### Frontend Caching
```javascript
// Cache translations for repeated words
const translationCache = new Map();

function getCachedTranslation(word) {
    if (translationCache.has(word)) {
        return translationCache.get(word);
    }
    
    return fetch(`/api/translate/${word}`)
        .then(response => response.json())
        .then(data => {
            translationCache.set(word, data);
            return data;
        });
}
```

## Testing Suite

### Unit Tests
```python
def test_text_processing():
    processor = TextProcessor()
    result = processor.extract_vocabulary("我喜欢学习中文")
    assert len(result) > 0
    assert all('translation' in word for word in result)

def test_spaced_repetition():
    sr = SpacedRepetition()
    next_review = sr.calculate_next_review(proficiency=3, review_count=2)
    assert next_review > datetime.now()
```

### Integration Tests
- User registration and login flow
- Text upload and vocabulary extraction
- Review system functionality
- Database consistency checks

## Deployment Configuration

### Development Setup
```bash
# Virtual environment
python -m venv venv
source venv/bin/activate

# Dependencies
pip install -r requirements.txt

# Database initialization
flask db init
flask db migrate
flask db upgrade

# Run development server
flask run
```

### Production Considerations
- PostgreSQL migration for scalability
- Redis for session storage
- Nginx reverse proxy configuration
- SSL certificate setup
- Environment variable management

## Security Measures

1. **Password Security**: Werkzeug password hashing
2. **Session Management**: Flask-Session with secure cookies
3. **Input Validation**: All user inputs sanitized
4. **SQL Injection Prevention**: Parameterized queries only
5. **XSS Protection**: Jinja2 auto-escaping enabled

## Monitoring and Analytics

### User Metrics
- Daily active users
- Text processing volume
- Vocabulary retention rates
- Review completion rates

### System Metrics
- Response time monitoring
- Database query performance
- Error rate tracking
- Resource utilization

---

*This documentation represents the v1.0 production implementation. For historical context, see hanzismith-v0.1-beta.md.*