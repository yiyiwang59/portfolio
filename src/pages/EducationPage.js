import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useSecureContent } from '../contexts/SecureContentContext';

const EducationPage = ({ setSelectedEducation }) => {
  const [education, setEducation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loadEncryptedContent } = useSecureContent();

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const content = await loadEncryptedContent('education');
        setEducation(content);
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
          <p className="text-gray-600">Loading education...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load education</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Education</h1>
        <p className="text-xl text-gray-600">
          Formal degrees, self-study, and continuous learning - building expertise one course at a time.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {education?.map((edu) => (
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
};

export default EducationPage;