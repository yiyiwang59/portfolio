import React from 'react';
import { ChevronRight } from 'lucide-react';
import { journeyChapters } from '../data/journey';

const JourneyPage = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Journey</h1>
        <p className="text-xl text-gray-600">
          From psychology major to data engineer - every pivot had a purpose.
        </p>
      </div>

      {/* Visual Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        
        {/* Timeline Items */}
        <div className="space-y-12">
          {journeyChapters.map((chapter, index) => (
            <div key={chapter.id} className="relative flex items-start gap-8">
              {/* Timeline Dot */}
              <div className="relative z-10">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center text-3xl shadow-lg">
                  {chapter.icon}
                </div>
              </div>
              
              {/* Content Card */}
              <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{chapter.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{chapter.date}</span>
                </div>
                <p className="text-gray-600">{chapter.description}</p>
                <button className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1">
                  Read full story <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default JourneyPage;