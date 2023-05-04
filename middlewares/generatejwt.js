
import jwt from 'jsonwebtoken';
import Users from '../models/users.js';

export const generatejwt = () => {
  return jwt.sign({ id: Users._id, role: Users.role }, 'generate', {
    expiresIn: 36544444,
  });
};
