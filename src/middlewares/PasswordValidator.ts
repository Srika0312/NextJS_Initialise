import { body } from "express-validator";

export const passwordSchema = [
  body('password')
    .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
];
