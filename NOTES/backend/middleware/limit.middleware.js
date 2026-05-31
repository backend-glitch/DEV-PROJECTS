import limiter from "express-rate-limit";

export const authLimiter = limiter({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: "Too many login attempts, try again later.",
});

export const notesLimiter = limiter({
  windowMs: 1 * 60 * 1000, 
  max: 50, 
  message: "Too many note operations, slow down.",
});

export const aiLimiter = limiter({
  windowMs: 12 * 60 * 60 * 1000, 
  max: 5, 
  message: "AI limit reached, wait a moment.",
});

export const globalLimiter = limiter({
  windowMs: 1 * 60 * 1000,
  max: 200,
});