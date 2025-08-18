import React from 'react';
import { ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectsPage = ({ 
  setSelectedProject, 
  setSelectedVersion 
}) => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
        <p className="text-xl text-gray-600">
          Each project evolves through multiple versions, from initial concept to production-ready solution.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              setSelectedProject(project);
              setSelectedVersion(0);
            }}
            className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
          >
            {/* Project Icon Header */}
            <div className={`${project.color} p-6 border-b border-gray-100`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.versions.length} version{project.versions.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            {/* Project Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">{project.summary}</p>
              <div className="text-blue-600 font-medium mb-6">{project.impact}</div>
              <div className="flex flex-wrap gap-2">
                {project.skills.slice(0, 4).map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
                {project.skills.length > 4 && (
                  <span className="px-3 py-1 text-gray-500 text-sm">
                    +{project.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectsPage;