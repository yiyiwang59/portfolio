
# HanziSmith

HanziSmith is a custom Chinese language learning platform designed for learners who want to turn any Chinese text into an interactive, personalized lesson. This application allows users to upload or enter Chinese text and transform it into a fully featured study experience: view text with pinyin toggles, reveal English translations on hover, select unknown vocabulary words to build a custom vocab list, and review them using an integrated flashcard system.

The goal of HanziSmith was not only to create a useful learning tool but also to demonstrate strong full-stack development skills. The project is intentionally end-to-end: backend logic, database design, frontend UI, and integration with natural language processing for Chinese text.

---

## Features

- **User Authentication**: Users can register, log in, and manage personalized lessons.
- **Dynamic Lesson Builder**: Paste any Chinese text and generate a lesson view with toggled pinyin and English translations on hover.
- **Interactive Vocabulary Selection**: Click words to add them to a personalized vocabulary list for the lesson.
- **Customizable Translations**: Users can edit pinyin or English translations if they prefer custom wording.
- **Flashcard Review System**: Built-in flashcard UI for vocabulary review, supporting multiple modes (Chinese-to-English, English-to-Chinese) and text-to-speech audio for pronunciation.
- **Responsive UI**: Built with Bootstrap for modern styling and optimized for multiple screen sizes.

---

## File Structure

- **`run.py`**: Application entry point, initializes the Flask app.
- **`app/__init__.py`**: Configures Flask, user authentication, and session handling.
- **`app/routes.py`**: Handles routing for all major views (home, lesson creation, lesson review, vocab review).
- **`app/lesson.py`**: Core lesson logic: parsing text, generating vocabulary list using NLP (HanLP), and interacting with the database.
- **`app/templates/`**: Jinja2 templates for all pages (registration, dashboard, lessons, flashcards).
- **`app/static/`**: Custom CSS, Bootstrap assets, and JavaScript for client-side interactivity.
- **Database**: SQLite database for lessons, words, users, and flashcard review history.

---

## Development Journey

This project began with a simple idea: replicate the experience of websites like Mandarin Bean but make it fully customizable for individual learners. The MVP was clear: paste Chinese text, parse it, and allow users to create vocab lists and flashcards.

The journey wasn’t straightforward. Some key challenges included:

- **Flask Routing and Server-Side Rendering**: Initially, routing caused frequent 404 errors. Understanding how Flask routes work, and when to use server-side rendering vs. client-side updates, was a learning curve. I chose server-side rendering for simplicity and because it aligned with CS50 fundamentals.
- **Database Schema Design**: Designing normalized tables for users, lessons, vocab words, and flashcard history took several iterations to balance flexibility with simplicity.
- **Vocabulary Parsing**: A major challenge was breaking down Chinese text into meaningful vocabulary units. The solution was integrating **HanLP**, a natural language processing toolkit for Chinese, to intelligently segment text and fetch POS tags.
- **Front-End Interaction**: Implementing hover-based translations and click-to-select vocab functionality with minimal JavaScript knowledge was challenging. I wrote custom vanilla JS for selecting multiple words, sending them via AJAX, and dynamically updating the UI.

---

## Design Choices & Tradeoffs

- **Raw SQL vs SQLAlchemy**: I initially chose raw SQL because it was easier to learn quickly and gave me transparency into the queries. However, in hindsight, SQLAlchemy would have provided security benefits and reduced boilerplate.
- **Bootstrap vs Custom CSS**: I used Bootstrap for speed and modern styling, later layering custom CSS for finer control. This tradeoff allowed rapid development but occasionally caused style overrides.
- **Server-Side Rendering vs React**: I stuck to server-side rendering for simplicity, though I now see the value of using React or Vue for a smoother, component-based UI. Doing it manually gave me a deeper understanding of DOM manipulation.

---

## Key Technical Skills Demonstrated

- **Full-Stack Development**: Built a complete Flask application with authentication, database integration, and custom user flows.
- **JavaScript Interactivity**: Wrote custom JS for hover effects, word selection, and AJAX-based updates.
- **Natural Language Processing Integration**: Integrated **HanLP** for intelligent Chinese text segmentation and **pypinyin** for phonetic generation.
- **Database Design**: Created relational schemas to manage users, lessons, vocabulary, and spaced-repetition flashcard data.
- **UI/UX Principles**: Designed responsive layouts, intuitive vocab selection, and interactive flashcards.

---

## Lessons Learned & Future Improvements

Looking back, I would:
- Use **SQLAlchemy** for ORM-based safety and scalability.
- Adopt **React** for modular UI and smoother client-side interactivity.
- Add caching for dictionary lookups and implement async features for performance.
- Improve scalability with a production-ready database and deploy on AWS or similar.

---

## Why This Matters for Engineering Roles

HanziSmith demonstrates my ability to plan, design, and deliver an end-to-end product independently. It highlights adaptability, problem-solving, and a willingness to learn new tools (Flask, HanLP, JavaScript) on the fly. While not production-ready, the app embodies core engineering principles and sets a foundation for building scalable, maintainable systems.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hanzismith.git
   cd hanzismith
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Initialize the database:
   ```bash
   flask init-db
   ```
4. Run the application:
   ```bash
   flask run
   ```

---

## Conclusion

HanziSmith started as a simple MVP and became a full-stack learning experience. It reflects not only technical skills but also an engineering mindset: breaking complex problems into manageable steps, iterating quickly, and learning from tradeoffs. This project marks an important milestone in my journey toward becoming a backend/data engineer while showcasing my capability to deliver impactful user-facing applications.
