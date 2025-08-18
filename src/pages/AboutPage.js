import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const AboutPage = () => (
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
              <p>
                [Your personal story - what drives you, your approach to problem-solving, 
                why you love data engineering]
              </p>
              <p>
                [Your unique perspective coming from psychology and consulting, 
                how it shapes your technical work]
              </p>
              <p>
                [Your vision for the future, what kinds of problems you want to solve]
              </p>
            </div>
          </div>

          {/* Personal Interests */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Beyond the Code</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🎾 Tennis Obsessive</h3>
                <p className="text-gray-600 text-sm">
                  3.0 USTA player, baseline counterpuncher, playing 5x/week. 
                  Tennis teaches me patience and strategy - useful in debugging too.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🎭 Hamilton Enthusiast</h3>
                <p className="text-gray-600 text-sm">
                  First half memorized, shower performances daily. 
                  "I am not throwing away my shot" is basically my career motto.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">📚 Fantasy Reader</h3>
                <p className="text-gray-600 text-sm">
                  52 books in one year. Current favorites: Mistborn, Jade City. 
                  Complex magic systems = complex data systems?
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🏃‍♀️ Former Marathoner</h3>
                <p className="text-gray-600 text-sm">
                  2019 marathon finisher, Les Mills instructor certified. 
                  Endurance athlete mentality applies to debugging production issues.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Currently */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Currently</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Starting Georgia Tech OMSA program</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Building CareerLauncher pipeline</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Learning Chinese (again)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Hunting for that perfect backhand</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Let's Connect</h3>
            <p className="text-gray-600 mb-6">
              Always happy to chat about data engineering, tennis strategy, 
              or Taylor Swift's latest album.
            </p>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
                <span>yiyiwang5959@gmail.com</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn Profile</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;