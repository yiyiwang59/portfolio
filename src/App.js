import React, { useState, useEffect } from 'react';

// Components
import LockScreen from './components/LockScreen';
import Navigation from './components/Navigation';
import CourseModal from './components/CourseModal';
import ProjectDetail from './components/ProjectDetail';
import EducationDetail from './components/EducationDetail';

// Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import JourneyPage from './pages/JourneyPage';
import EducationPage from './pages/EducationPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Check if already authenticated from session
  useEffect(() => {
    const auth = sessionStorage.getItem('portfolio-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Simple password check
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'momodeku') {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio-auth', 'true');
      setShowPasswordError(false);
    } else {
      setShowPasswordError(true);
      setTimeout(() => setShowPasswordError(false), 3000);
    }
  };

  // Main render logic
  return (
    <>
      {!isAuthenticated ? (
        <LockScreen 
          password={password}
          setPassword={setPassword}
          handlePasswordSubmit={handlePasswordSubmit}
          showPasswordError={showPasswordError}
        />
      ) : (
        <>
          {selectedProject ? (
            <ProjectDetail 
              project={selectedProject} 
              selectedVersion={selectedVersion}
              setSelectedVersion={setSelectedVersion}
              onBack={() => setSelectedProject(null)} 
            />
          ) : selectedEducation ? (
            <EducationDetail 
              education={selectedEducation} 
              setSelectedCourse={setSelectedCourse}
              onBack={() => setSelectedEducation(null)} 
            />
          ) : (
            <>
              {activeSection === 'home' && (
                <>
                  <Navigation 
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                  <HomePage setActiveSection={setActiveSection} />
                </>
              )}
              {activeSection === 'projects' && (
                <>
                  <Navigation 
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                  <ProjectsPage 
                    setSelectedProject={setSelectedProject}
                    setSelectedVersion={setSelectedVersion}
                  />
                </>
              )}
              {activeSection === 'journey' && (
                <>
                  <Navigation 
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                  <JourneyPage />
                </>
              )}
              {activeSection === 'education' && (
                <>
                  <Navigation 
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                  <EducationPage setSelectedEducation={setSelectedEducation} />
                </>
              )}
              {activeSection === 'about' && (
                <>
                  <Navigation 
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                  <AboutPage />
                </>
              )}
            </>
          )}
          
          {/* CourseModal should always be available regardless of current view */}
          {selectedCourse && (
            <CourseModal 
              course={selectedCourse} 
              onClose={() => setSelectedCourse(null)} 
            />
          )}
        </>
      )}
    </>
  );
};

export default App;