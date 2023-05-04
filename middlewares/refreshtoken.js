import jwt from 'jsonwebtoken';

export const refreshtoken = (data, duration) => {
  return jwt.sign(data, 'refresh', {
    expiresIn: duration,
  });
};
