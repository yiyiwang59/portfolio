import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Loader2 } from 'lucide-react';
import { useSecureContent } from '../contexts/SecureContentContext';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loadEncryptedContent } = useSecureContent();

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const content = await loadEncryptedContent('about');
        setAboutData(content);
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
          <p className="text-gray-600">Loading about me...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load about content</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const getContactIcon = (type) => {
    switch (type) {
      case 'email': return Mail;
      case 'linkedin': return Linkedin;
      case 'github': return Github;
      default: return Mail;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <p className="text-xl text-gray-600">
            The person behind the code - interests, ambitions, and what drives me.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* About Me */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Story</h2>
              <div className="prose text-gray-600 space-y-4">
                {aboutData?.story?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Personal Interests */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Beyond the Code</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {aboutData?.interests?.map((interest) => (
                  <div key={interest.id}>
                    <h3 className="font-bold text-gray-900 mb-2">{interest.icon} {interest.title}</h3>
                    <p className="text-gray-600 text-sm">{interest.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Currently */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Currently</h3>
              <ul className="space-y-3 text-gray-600">
                {aboutData?.currently?.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Let's Connect</h3>
              <p className="text-gray-600 mb-6">{aboutData?.contact?.description}</p>
              <div className="space-y-3">
                {aboutData?.contact?.links?.map((link, index) => {
                  const IconComponent = getContactIcon(link.type);
                  return (
                    <a 
                      key={index}
                      href={link.url} 
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;