import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export const checkPhoneNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { phoneNumber }: { phoneNumber: string } = req.body;
  const userFound = await User.findOne({ phoneNumber });

  if (userFound) {
    return res.status(403).json({
      statusCode: 403,
      message: `phone number: ${phoneNumber} is already used`,
    });
  }

  next();
};
