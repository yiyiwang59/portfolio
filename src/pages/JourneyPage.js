import React, { useState, useEffect } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import JourneyModal from '../components/JourneyModal';
import { useSecureContent } from '../contexts/SecureContentContext';

const JourneyPage = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [journeyChapters, setJourneyChapters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loadEncryptedContent } = useSecureContent();

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const content = await loadEncryptedContent('journey');
        setJourneyChapters(content.journeyChapters);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [loadEncryptedContent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading your journey...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load journey content</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
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
            {journeyChapters?.map((chapter, index) => (
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
                  <button 
                    onClick={() => setSelectedChapter(chapter)}
                    className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700 transition-colors"
                  >
                    Read full story <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedChapter && (
        <JourneyModal 
          chapter={selectedChapter}
          onClose={() => setSelectedChapter(null)}
        />
      )}
    </div>
  );
};

export default JourneyPage;