import * as crypto from "crypto";
 
const ENC_DEC_KEY = process.env.ENC_DEC_KEY;
const ENCDEC_ALGORITHM = "aes-256-cbc";
 
const key = crypto
  .createHash("sha256")
  .update(String(ENC_DEC_KEY))
  .digest("base64")
  .slice(0, 32);
 
const iv = crypto
  .createHash("sha256")
  .update(String(ENC_DEC_KEY))
  .digest("base64")
  .slice(0, 16);
 
export function encrypt(text: string): string {
  try {
    const cipher = crypto.createCipheriv(ENCDEC_ALGORITHM, key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    throw new Error("Encryption failed");
  }
}
 
export function decrypt(text: string): string {
  try {
    const decipher = crypto.createDecipheriv(ENCDEC_ALGORITHM, key, iv);
    let decrypted = decipher.update(text, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  } catch (error) {
    throw new Error("Decryption failed");
  }
}