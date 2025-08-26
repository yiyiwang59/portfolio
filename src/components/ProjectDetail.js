import React from 'react';
import { ChevronRight, Github, ExternalLink } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

const ProjectDetail = ({ 
  project, 
  selectedVersion, 
  setSelectedVersion, 
  onBack 
}) => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
      >
        ← Back to Projects
      </button>
      
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 ${project.color} rounded-xl flex items-center justify-center text-2xl`}>
            {project.icon}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
            <p className="text-gray-600">{project.versions.length} version{project.versions.length > 1 ? 's' : ''}</p>
          </div>
        </div>
        <p className="text-xl text-gray-600">{project.description}</p>
      </div>

      {/* Version Tabs */}
      {project.versions.length > 1 && (
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {project.versions.map((version, index) => (
              <button
                key={index}
                onClick={() => setSelectedVersion(index)}
                className={`pb-4 px-1 border-b-2 transition-colors font-medium ${
                  selectedVersion === index
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {version.version} - {version.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Version Content */}
      <div className="space-y-6">
        {/* Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Overview</h3>
          <p className="text-gray-700">{project.versions[selectedVersion].description}</p>
          <p className="text-gray-500 mt-3">Released: {project.versions[selectedVersion].date}</p>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {project.versions[selectedVersion].stack.map((tech, i) => (
              <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
          <div className="space-y-3">
            {project.versions[selectedVersion].highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
          <p className="text-gray-700 text-lg">{project.impact}</p>
        </div>

        {/* Technical Documentation */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Technical Documentation</h3>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <Github className="w-5 h-5" />
                Repository
              </button>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </button>
            </div>
          </div>
          
          <MarkdownRenderer 
            documentationFile={project.versions[selectedVersion].documentationFile}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ProjectDetail;