import React from 'react';
import { ChevronRight } from 'lucide-react';

const EducationDetail = ({ 
  education, 
  setSelectedCourse, 
  onBack 
}) => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
      >
        ← Back to Education
      </button>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className={`w-16 h-16 ${education.color} rounded-xl flex items-center justify-center text-2xl`}>
            {education.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{education.title}</h1>
            <p className="text-xl text-gray-600 mb-1">{education.degree}</p>
            <p className="text-gray-500">{education.date}</p>
            <p className="text-gray-600 mt-4">{education.description}</p>
          </div>
        </div>
      </div>

      {education.courses.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Coursework</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {education.courses.map((course) => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{course.code}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    course.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {course.status}
                  </span>
                </div>
                <p className="text-gray-800 font-medium mb-2">{course.name}</p>
                <p className="text-gray-600 text-sm">{course.description}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-500">Course details coming soon</p>
        </div>
      )}
    </div>
  </div>
);

export default EducationDetail;