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
                With my background in psychology and consulting, to now switching gears to a more technical path, 
                I bring a unique perspective to problem-solving and a deep understanding of user needs. So much of my work thus far
                has been about understanding the 'why' behind user requirements and translating that into technical solutions. That being said, 
                my greatest strengths and competencies have continuously circled back to my technical and analytical prowess. I make sense of 
                the world around me by creating structures and categories and relating them together, in other words, 
                through data schemas. Then designing systems and processes to efficiently manage and operationalize that data into useful tools and insights. For example, 
                I use Notion as a relational database to organize my life and turn my tasks and projects into a structured system that I can easily navigate and manage, including 
                creating learning plans, tracking kitchen inventory for automated recipe management, and managing chore cadences. It borders on excessive, but it's what flows naturally for me.
              </p>
              <p>
                At this point in my career, I am focused on honing my skills as a data engineer and learning the best practices and industry standards 
                when it comes to building robust and efficient data infrastructures while also learning the nuances of different approaches to building data pipelines through 
                witnessing new technologies and methodologies in action. I'm looking to surround myself with experienced mentors and learning to work collaboratively in a fast-paced environment. Eventually, I am looking to 
                build a strong foundation in data engineering and transition into a more specialized role in data architecture or machine learning engineering through hands-on, applied
                experience professionally, but also through academic projects and coursework in my master's program. 
              </p>
              <p>
                Something you should know about me is that I am a constant revolving cycle of hyperfixations. 
                When I discover a new hobby or interest whether it's broadway shows, new artists, book genres, movies, 
                TV shows/anime, extracurricular clubs, sports, skills, or even an app like Notion, I dive as deep as I can possibly go. At the core, 
                I love building my proficiency in new skills through dedication and practice which in turn opens my mind to appreciating
                the intricacies of mastering a craft. This focus and mindset is what I take with me in all aspects of my life including 
                my career as an engineer.
              </p>
            </div>
          </div>

          {/* Personal Interests */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Beyond the Code</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🎾 Tennis-Obsessed</h3>
                <p className="text-gray-600 text-sm">
                  3.0 USTA player, baseline counterpuncher, playing 5x/week. 
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🎭 Hamilton Enthusiast</h3>
                <p className="text-gray-600 text-sm">
                  First half memorized, shower performances daily. 
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">📚 Fantasy Reader</h3>
                <p className="text-gray-600 text-sm">
                  52 books in one year. Current favorites: Mistborn, The Poppy War, ACOTAR.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🏃‍♀️ Former Marathoner</h3>
                <p className="text-gray-600 text-sm">
                  2019 marathon finisher, 3x Les Mills instructor certified. 
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🪩 Proud Swiftie</h3>
                <p className="text-gray-600 text-sm">
                  I can write essays of lyrical analysis on Taylor Swift's songs. Went to Eras tour 2x, Chicago N3 2023 and Indianapolis N1 2024. Favorite albums are Folklore and TTPD.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">🐱🐶 Mom of 2</h3>
                <p className="text-gray-600 text-sm">
                  I have a 9 year old orange tabby named Momo, and a 5 year old black/white Shih Tzu named Deku. 😉  
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
                <span>Starting Georgia Tech OMSA program (Online, Part-Time)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Reading The Righteous Mind by Jonathan Haidt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Learning Chinese (again)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Working on building a consistent first serve 🎾</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Let's Connect</h3>
            <p className="text-gray-600 mb-6">
              Always happy to chat about data engineering, tennis strategy, 
              or Taylor Swift.
            </p>
            <div className="space-y-3">
              <a href="mailto:yiyiwang5959@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
                <span>yiyiwang5959@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/yiyiwang59" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn Profile</span>
              </a>
              <a href="https://github.com/yiyiwang59" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
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