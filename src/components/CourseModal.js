import React from 'react';
import { X } from 'lucide-react';

const CourseModal = ({ course, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200 flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{course.code}: {course.name}</h3>
          <p className="text-gray-600 mt-1">{course.semester} • {course.status}</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Overview</h4>
          <p className="text-gray-600">{course.description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Topics Covered</h4>
          <div className="flex flex-wrap gap-2">
            {course.topics.map((topic, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {topic}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Professional Takeaways</h4>
          <p className="text-gray-600">{course.takeaways}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Coursework</h4>
          <p className="text-gray-500 text-sm">[Homework assignments, projects, and notes will be added here]</p>
        </div>
      </div>
    </div>
  </div>
);

export default CourseModal;