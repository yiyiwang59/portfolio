import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import ProfileImage from './ProfileImage';

const LockScreen = ({ 
  password, 
  setPassword, 
  handlePasswordSubmit, 
  showPasswordError 
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <ProfileImage size="medium" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Yiyi Wang</h1>
          <p className="text-lg text-slate-600">Data Engineer with a consulting past and an ML future</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter password to view portfolio"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit(e)}
            className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            autoFocus
          />
          {showPasswordError && (
            <p className="text-red-500 text-sm">Incorrect password</p>
          )}
          <button
            onClick={handlePasswordSubmit}
            className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition-all hover:shadow-lg"
          >
            Enter Portfolio
          </button>
        </div>
        
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default LockScreen;