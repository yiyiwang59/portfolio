import React from 'react';
import { education } from '../data/education';

const EducationPage = ({ setSelectedEducation }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Education</h1>
        <p className="text-xl text-gray-600">
          Formal degrees, self-study, and continuous learning - building expertise one course at a time.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {education.map((edu) => (
          <div
            key={edu.id}
            onClick={() => setSelectedEducation(edu)}
            className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
          >
            <div className={`${edu.color} p-6`}>
              <div className="text-4xl mb-3">{edu.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{edu.title}</h3>
            </div>
            <div className="p-6">
              <p className="font-medium text-gray-900 mb-2">{edu.degree}</p>
              <p className="text-sm text-gray-600 mb-4">{edu.date}</p>
              <div className={`inline-flex items-center text-sm font-medium ${
                edu.status === 'Completed' ? 'text-green-600' :
                edu.status === 'In Progress' ? 'text-yellow-600' : 'text-blue-600'
              }`}>
                {edu.status}
              </div>
              {edu.courses.length > 0 && (
                <p className="text-gray-500 text-sm mt-4">
                  {edu.courses.length} course{edu.courses.length !== 1 ? 's' : ''} documented
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EducationPage;