import React, { useState, useEffect } from 'react';

const BannerBackground = ({ 
  children, 
  className = '',
  fallbackGradient = 'bg-gradient-to-b from-white to-gray-50'
}) => {
  const [bannerExists, setBannerExists] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    const checkBanner = async () => {
      try {
        const bannerUrls = ['/images/banner.jpeg', '/images/banner.jpg'];
        
        for (const url of bannerUrls) {
          try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
              setBannerExists(true);
              setBannerLoading(false);
              return;
            }
          } catch (error) {
            // Continue to next URL
          }
        }
        
        // No banner found
        setBannerExists(false);
        setBannerLoading(false);
      } catch (error) {
        setBannerExists(false);
        setBannerLoading(false);
      }
    };

    checkBanner();
  }, []);

  if (bannerLoading) {
    return (
      <div className={`${fallbackGradient} ${className}`}>
        {children}
      </div>
    );
  }

  if (bannerExists) {
    return (
      <div 
        className={`relative ${className}`}
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(249, 250, 251, 0.95)), url(/images/banner.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={`${fallbackGradient} ${className}`}>
      {children}
    </div>
  );
};

export default BannerBackground;