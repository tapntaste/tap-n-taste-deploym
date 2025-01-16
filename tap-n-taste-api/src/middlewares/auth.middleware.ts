import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload | { role?: string }; // Adjust to match the structure of your token
    }
  }
}

export type AugmentedRequest = Request;
// // Middleware to verify token
// export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
//   try {
//     // Extract token from header
//     const authHeader: string | undefined = req.headers.authorization || req.cookies['token'];
//     if (!authHeader) {
//       res.status(401).json({ error: 'Access denied. No token provided.' });
//       return;
//     }

//     const token: string = authHeader.split(' ')[1];
//     const decoded: JwtPayload | string = jwt.verify(token, JWT_SECRET);
//     req.user = decoded as JwtPayload; // Attach decoded token to request object
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid or expired token.' });
//   }
// };
// Middleware to verify token
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    let token: string | undefined;

    // Extract token from header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies['token']) {
      // Extract token from cookie
      token = req.cookies['token'];
    }

    if (!token) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as JwtPayload; // Attach decoded token to request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// Middleware to authorize roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || typeof req.user === 'string' || !roles.includes(req.user['role'])) {
        return res.status(403).json({ error: 'Access denied. You do not have the required permissions.' });
      }
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Authorization failed.' });
    }
  };
};
