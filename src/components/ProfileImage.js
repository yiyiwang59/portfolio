import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

const ProfileImage = ({ 
  className = '', 
  size = 'large',
  showFallback = true 
}) => {
  const [imageExists, setImageExists] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24', 
    large: 'w-48 h-48',
    xlarge: 'w-64 h-64'
  };

  const iconSizes = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-24 h-24', 
    xlarge: 'w-32 h-32'
  };

  useEffect(() => {
    const checkImage = async () => {
      try {
        const imageUrls = ['/images/profile_pic.jpeg', '/images/profile_pic.jpg'];
        
        for (const url of imageUrls) {
          try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
              setImageExists(true);
              setImageLoading(false);
              return;
            }
          } catch (error) {
            // Continue to next URL
          }
        }
        
        // No image found
        setImageExists(false);
        setImageLoading(false);
      } catch (error) {
        setImageExists(false);
        setImageLoading(false);
      }
    };

    checkImage();
  }, []);

  if (imageLoading) {
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse ${className}`}>
        <div className={`${iconSizes[size]} bg-gray-300 rounded-full`}></div>
      </div>
    );
  }

  if (imageExists) {
    return (
      <img
        src="/images/profile_pic.jpeg"
        alt="Yiyi Wang - Profile"
        className={`${sizeClasses[size]} rounded-full object-cover shadow-xl ${className}`}
        onError={() => setImageExists(false)}
      />
    );
  }

  if (!showFallback) {
    return null;
  }

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-xl ${className}`}>
      <User className={`${iconSizes[size]} text-slate-600`} />
    </div>
  );
};

export default ProfileImage;