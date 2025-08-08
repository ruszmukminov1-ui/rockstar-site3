// src/utils/keyGenerator.ts
export const generateAccessKey = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `ROCK-${part1}-${part2}`;
};

export const validateKeyFormat = (key: string): boolean => {
  const keyRegex = /^ROCK-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return keyRegex.test(key);
};