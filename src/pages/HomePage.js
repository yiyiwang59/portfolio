import React from 'react';
import { 
  Database, Cloud, Users, Heart, MapPin, Code, Brain, Target,
  Terminal, Layers, Zap, Briefcase, Sparkles, GraduationCap, ArrowRight
} from 'lucide-react';
import ProfileImage from '../components/ProfileImage';
import BannerBackground from '../components/BannerBackground';

const HomePage = ({ setActiveSection }) => (
  <div className="min-h-screen">
    {/* Hero Section with Banner Background */}
    <BannerBackground>
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-start gap-12">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Data Engineer with a consulting past and an ML future
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                I bring a people-centric approach to technology, combining 5 years of consulting 
                experience with a passion for building scalable data solutions that actually serve 
                the humans who use them.
              </p>
              <div className="flex gap-4">
                {/* <button className="bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition-all hover:shadow-lg">
                  View Resume
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-50 transition-all">
                  Get in Touch
                </button> */}
              </div>
            </div>
            {/* Profile picture */}
            <ProfileImage size="large" />
          </div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">5+</div>
              <div className="text-sm text-gray-600 mt-1">Years building scalable data solutions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">5x</div>
              <div className="text-sm text-gray-600 mt-1">Salesforce certified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600 mt-1">Clients across industries</div>
            </div>
          </div>
        </div>
      </section>
    </BannerBackground>

    {/* What I Bring & Quick Facts */}
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What I Bring to the Table</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <Database className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Data Architecture</h3>
              <p className="text-gray-600 text-sm">5 years designing schemas that scale from startup to enterprise</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <Cloud className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Cloud Engineering</h3>
              <p className="text-gray-600 text-sm">AWS Lambda, S3, Airflow orchestration for production pipelines</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <Users className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Business Context</h3>
              <p className="text-gray-600 text-sm">Consulting DNA means I speak fluent stakeholder</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <Heart className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">User Empathy</h3>
              <p className="text-gray-600 text-sm">Psychology degree + consulting = solutions designed for humans</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h2>
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Hudson, OH • Open to relocation</span>
            </div>
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Python, SQL, TypeScript</span>
            </div>
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Started Georgia Tech OMSA Aug 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Seeking Data Engineering roles</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Skills & Tools */}
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills & Tools</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-500" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">Python</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">SQL</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">JavaScript</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">C</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              Data & Cloud
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">AWS Lambda</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">S3</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">Airflow</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">Supabase</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">PostgreSQL</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">Flask</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">React</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">Node.js</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">Salesforce</span>
              <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">Bootstrap</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Section Previews */}
    <section className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Explore My Work</h2>
        
        <div className="space-y-8">
          {/* Projects Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Projects</h3>
                <p className="text-gray-600 mb-4">
                  Deep dive into my technical projects, each with multiple versions showing the evolution 
                  from proof-of-concept to production-ready solutions. See how I iterate, improve, and 
                  scale systems over time.
                </p>
                <button 
                  onClick={() => setActiveSection('projects')}
                  className="text-blue-600 font-medium flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Explore Projects <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Journey Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Journey</h3>
                <p className="text-gray-600 mb-4">
                  Follow my transformation from software consultant to data engineer. A visual timeline 
                  of pivotal moments, lessons learned, and the experiences that shaped my approach to 
                  building data systems.
                </p>
                <button 
                  onClick={() => setActiveSection('journey')}
                  className="text-purple-600 font-medium flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View Journey <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Education Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Education</h3>
                <p className="text-gray-600 mb-4">
                  Detailed breakdown of my formal education and self-study journey. Each course includes 
                  comprehensive documentation of concepts learned and their direct application to 
                  real-world data engineering challenges.
                </p>
                <button 
                  onClick={() => setActiveSection('education')}
                  className="text-green-600 font-medium flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View Education <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;