import React, { createContext, useContext, useState, useCallback } from 'react';
import { decryptData } from '../utils/encryption';

const SecureContentContext = createContext();

export const useSecureContent = () => {
  const context = useContext(SecureContentContext);
  if (!context) {
    throw new Error('useSecureContent must be used within a SecureContentProvider');
  }
  return context;
};

export const SecureContentProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [decryptionKey, setDecryptionKey] = useState(null);
  const [decryptedContent, setDecryptedContent] = useState({});
  const [loading, setLoading] = useState({});

  // Initialize from session storage
  React.useEffect(() => {
    const auth = sessionStorage.getItem('portfolio-auth');
    const key = sessionStorage.getItem('portfolio-key');
    if (auth === 'true' && key) {
      setIsAuthenticated(true);
      setDecryptionKey(key);
    }
  }, []);

  const authenticate = useCallback((password) => {
    setDecryptionKey(password);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setDecryptionKey(null);
    setDecryptedContent({});
    setLoading({});
    sessionStorage.removeItem('portfolio-auth');
    sessionStorage.removeItem('portfolio-key');
  }, []);

  const loadEncryptedContent = useCallback(async (contentType) => {
    // Try to get key from session storage if not in state
    const key = decryptionKey || sessionStorage.getItem('portfolio-key');
    
    if (!key) {
      throw new Error('Not authenticated');
    }

    if (decryptedContent[contentType]) {
      return decryptedContent[contentType];
    }

    if (loading[contentType]) {
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (decryptedContent[contentType]) {
            resolve(decryptedContent[contentType]);
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
      });
    }

    setLoading(prev => ({ ...prev, [contentType]: true }));

    try {
      let encryptedModule;
      
      switch (contentType) {
        case 'journey':
          encryptedModule = await import('../data/encrypted/journey.encrypted.js');
          break;
        case 'projects':
          encryptedModule = await import('../data/encrypted/projects.encrypted.js');
          break;
        case 'education':
          encryptedModule = await import('../data/encrypted/education.encrypted.js');
          break;
        case 'about':
          encryptedModule = await import('../data/encrypted/about.encrypted.js');
          break;
        default:
          throw new Error(`Unknown content type: ${contentType}`);
      }

      const decrypted = decryptData(encryptedModule.encryptedData, key);
      
      setDecryptedContent(prev => ({ ...prev, [contentType]: decrypted }));
      setLoading(prev => ({ ...prev, [contentType]: false }));
      
      return decrypted;
    } catch (error) {
      setLoading(prev => ({ ...prev, [contentType]: false }));
      throw error;
    }
  }, [decryptedContent, loading, decryptionKey]);

  const getContent = useCallback((contentType, key) => {
    const content = decryptedContent[contentType];
    if (!content) return null;
    return key ? content[key] : content;
  }, [decryptedContent]);

  const value = {
    isAuthenticated,
    authenticate,
    logout,
    loadEncryptedContent,
    getContent,
    isLoading: (contentType) => loading[contentType] || false
  };

  return (
    <SecureContentContext.Provider value={value}>
      {children}
    </SecureContentContext.Provider>
  );
};