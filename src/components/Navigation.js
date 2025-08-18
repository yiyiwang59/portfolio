import React from 'react';
import { Lock } from 'lucide-react';

const Navigation = ({ 
  activeSection, 
  setActiveSection, 
  setIsAuthenticated 
}) => (
  <nav className="bg-white border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Yiyi Wang</h1>
        <div className="flex gap-8">
          <button
            onClick={() => setActiveSection('home')}
            className={`text-sm font-medium ${activeSection === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveSection('projects')}
            className={`text-sm font-medium ${activeSection === 'projects' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveSection('journey')}
            className={`text-sm font-medium ${activeSection === 'journey' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Journey
          </button>
          <button
            onClick={() => setActiveSection('education')}
            className={`text-sm font-medium ${activeSection === 'education' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveSection('about')}
            className={`text-sm font-medium ${activeSection === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            About
          </button>
        </div>
        <button
          onClick={() => {
            setIsAuthenticated(false);
            sessionStorage.removeItem('portfolio-auth');
          }}
          className="text-gray-400 hover:text-gray-600"
          title="Lock portfolio"
        >
          <Lock className="w-4 h-4" />
        </button>
      </div>
    </div>
  </nav>
);

export default Navigation;