import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(500).json({
        success: false,
        message: 'You Are Not Allowed',
      });
    }

    const decoded = jwt.verify(token, config.jwtSecrete as string);
    console.log(decoded);

    req.user = decoded as JwtPayload;
    next();
  };
};

export default auth;
