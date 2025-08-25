const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');

const SALT = 'portfolio-salt-2025';
const ENCRYPT_PASSWORD = process.env.REACT_APP_ENCRYPT_KEY || 'momodeku';

const deriveKey = (password) => {
  return CryptoJS.PBKDF2(password, SALT, {
    keySize: 256 / 32,
    iterations: 10000
  }).toString();
};

const encryptData = (data, password) => {
  const key = deriveKey(password);
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return encrypted;
};

const encryptFile = (inputPath, outputPath, password) => {
  try {
    // Read file as text and remove ES6 export syntax
    let content = fs.readFileSync(inputPath, 'utf8');
    
    // Remove export statements and evaluate the module
    content = content.replace(/export\s+(default\s+)?/g, '');
    
    // Create a temporary file to require
    const tempPath = inputPath + '.temp.js';
    fs.writeFileSync(tempPath, content);
    
    // Clear require cache and load the data
    delete require.cache[require.resolve(tempPath)];
    const data = require(tempPath);
    
    // Clean up temp file
    fs.unlinkSync(tempPath);
    
    const encrypted = encryptData(data, password);
    
    const outputContent = `export const encryptedData = ${JSON.stringify(encrypted)};`;
    
    fs.writeFileSync(outputPath, outputContent);
    console.log(`✓ Encrypted: ${inputPath} → ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to encrypt ${inputPath}:`, error.message);
  }
};

const srcPath = path.join(__dirname, '../src');
const encryptedPath = path.join(srcPath, 'data/encrypted');

if (!fs.existsSync(encryptedPath)) {
  fs.mkdirSync(encryptedPath, { recursive: true });
}

console.log('🔐 Encrypting content...');
console.log(`Using password: ${ENCRYPT_PASSWORD.substring(0, 3)}***`);

const filesToEncrypt = [
  {
    input: path.join(srcPath, 'data/journey.js'),
    output: path.join(encryptedPath, 'journey.encrypted.js')
  },
  {
    input: path.join(srcPath, 'data/projects.js'),
    output: path.join(encryptedPath, 'projects.encrypted.js')
  },
  {
    input: path.join(srcPath, 'data/education.js'),
    output: path.join(encryptedPath, 'education.encrypted.js')
  },
  {
    input: path.join(srcPath, 'data/about.js'),
    output: path.join(encryptedPath, 'about.encrypted.js')
  }
];

filesToEncrypt.forEach(({ input, output }) => {
  if (fs.existsSync(input)) {
    encryptFile(input, output, ENCRYPT_PASSWORD);
  } else {
    console.warn(`⚠ File not found: ${input}`);
  }
});

console.log('🔐 Content encryption complete!');
