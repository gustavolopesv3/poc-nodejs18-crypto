import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = 'REtgV24bDB7xQYoMuypiBASMEaJbc59n';
// Gere um IV aleatório e único para cada operação
const iv = crypto.randomBytes(16); // 16 bytes para aes-256-cbc

const encrypt = (data) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  // Retorna o IV concatenado com os dados criptografados para uso posterior
  return iv.toString('hex') + ':' + crypted;
};

const decrypt = (data) => {
  // Separa o IV dos dados criptografados
  const parts = data.split(':');
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(parts[0], 'hex'));
  let decrypted = decipher.update(parts[1], 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const pass = encrypt('1234567890');
console.log('Dados criptografados:', pass);

const decryptedPass = decrypt(pass);
console.log('Dados descriptografados:', decryptedPass);
