import React from 'react';
import { X } from 'lucide-react';

const JourneyModal = ({ chapter, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full border-2 border-gray-200 flex items-center justify-center text-2xl">
            {chapter.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{chapter.title}</h3>
            <p className="text-gray-600 mt-1">{chapter.date}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6">
        <div className="prose prose-gray max-w-none">
          {chapter.fullStory.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default JourneyModal;