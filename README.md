# Portfolio Project Structure

This React portfolio application has been refactored into a clean, modular structure for better maintainability and organization.

## Project Structure

```
portfolio/
├── portfolio.js           # Original file (now imports from src/App.js)
├── public/
│   ├── images/           # 📸 DROP YOUR IMAGES HERE!
│   │   ├── profile_pic.jpeg  # Your profile photo
│   │   └── banner.jpeg       # Homepage background
│   └── docs/
│       └── projects/     # Markdown documentation files
├── src/
│   ├── App.js            # Main application component with routing logic
│   ├── index.js          # Entry point for React app
│   ├── index.css         # Global styles (Tailwind CSS imports)
│   ├── components/       # Reusable UI components
│   │   ├── LockScreen.js
│   │   ├── Navigation.js
│   │   ├── CourseModal.js
│   │   ├── ProjectDetail.js
│   │   ├── EducationDetail.js
│   │   ├── MarkdownRenderer.js
│   │   ├── ProfileImage.js   # Smart profile image component
│   │   └── BannerBackground.js # Smart banner background
│   ├── pages/            # Main page components
│   │   ├── HomePage.js
│   │   ├── ProjectsPage.js
│   │   ├── JourneyPage.js
│   │   ├── EducationPage.js
│   │   └── AboutPage.js
│   └── data/             # Static data files
│       ├── projects.js
│       ├── education.js
│       └── journey.js
└── README.md            # This file
```

## Components Overview

### Main Components
- **App.js**: Main application container with state management and routing
- **index.js**: React application entry point

### Pages
- **HomePage**: Landing page with hero section and skill overview
- **ProjectsPage**: Project portfolio with detailed project cards
- **JourneyPage**: Career timeline and story
- **EducationPage**: Educational background and courses
- **AboutPage**: Personal information and interests

### UI Components
- **LockScreen**: Password-protected entry to portfolio
- **Navigation**: Top navigation bar
- **CourseModal**: Detailed course information popup
- **ProjectDetail**: Full project details with versioning
- **EducationDetail**: Detailed education information

### Data
- **projects.js**: Project data with versions and technical details
- **education.js**: Educational background and course information
- **journey.js**: Career timeline chapters

## Features

- Password-protected portfolio access
- Multi-version project documentation
- Interactive course details
- Responsive design with Tailwind CSS
- Session-based authentication
- Modal-based detail views

## Usage

The original `portfolio.js` file now serves as a simple wrapper that imports the main App component. You can use either:

1. Import from the original file: `import Portfolio from './portfolio.js'`
2. Import directly from the new structure: `import App from './src/App.js'`

## 📸 Easy Image Upload System

### Quick Start - Just Drop & Go!

To personalize your portfolio with your own images:

#### **Step 1: Add Your Images**
Navigate to `public/images/` and add these files:
- **`profile_pic.jpeg`** (or `profile_pic.jpg`) - Your profile photo
- **`banner.jpeg`** (or `banner.jpg`) - Homepage background image

#### **Step 2: That's It!**
The website automatically detects and uses your images. No code changes needed!

### **Image Specifications**

| Image | Recommended Size | Aspect Ratio | Usage |
|-------|------------------|--------------|-------|
| **Profile Picture** | 400x400px | Square (1:1) | Lock screen & homepage profile |
| **Banner** | 1920x600px | Landscape (3.2:1) | Homepage hero background |

### **Smart Fallbacks**
- **No profile picture?** → Shows a stylish placeholder with your initials
- **No banner?** → Uses a beautiful gradient background
- **Invalid image?** → Automatically falls back to defaults

### **Supported Formats**
- `.jpeg` or `.jpg` files
- Keep files under 2MB for optimal loading speed
- Images are automatically optimized for web display

## 📝 Adding Project Documentation

Create technical documentation for your projects:

#### **Step 1: Create Markdown File**
Add your documentation to `public/docs/projects/your-project-name.md`

#### **Step 2: Reference in Project Data**
Update your project in `src/data/projects.js`:
```javascript
{
  version: 'v1.0',
  title: 'My Amazing Project',
  documentationFile: 'your-project-name.md'  // ← Add this line
}
```

#### **Step 3: Rich Documentation**
Your markdown files support:
- ✅ **Syntax highlighting** for code blocks
- ✅ **GitHub Flavored Markdown** (tables, task lists, etc.)
- ✅ **Architecture diagrams** (ASCII art)
- ✅ **Professional styling** with beautiful formatting

## Development Notes

- All styling uses Tailwind CSS classes
- Icons from Lucide React library
- Session storage for authentication persistence
- Modular data structure for easy updates
- Component-based architecture for reusability
- Smart image loading with fallbacks
- Dynamic markdown documentation system