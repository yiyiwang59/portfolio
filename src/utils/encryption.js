import CryptoJS from 'crypto-js';

const SALT = 'portfolio-salt-2025';

export const deriveKey = (password) => {
  return CryptoJS.PBKDF2(password, SALT, {
    keySize: 256 / 32,
    iterations: 10000
  }).toString();
};

export const encryptData = (data, password) => {
  const key = deriveKey(password);
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return encrypted;
};

export const decryptData = (encryptedData, password) => {
  try {
    const key = deriveKey(password);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) {
      throw new Error('Invalid password');
    }
    
    return JSON.parse(decryptedString);
  } catch (error) {
    throw new Error('Failed to decrypt data - invalid password');
  }
};

export const createEncryptedChunk = async (dataGetter, password) => {
  const data = await dataGetter();
  return encryptData(data, password);
};