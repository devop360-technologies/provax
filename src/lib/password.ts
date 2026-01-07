import bcrypt from "bcryptjs";

// OWASP recommends minimum 10 rounds, using 12 for better security
const BCRYPT_ROUNDS = 12;

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
