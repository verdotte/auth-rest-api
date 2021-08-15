import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (cb: any) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await cb(req, res, next);
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
  return true;
};
