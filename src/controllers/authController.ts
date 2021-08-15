import { Request, Response } from 'express';
import { TwilioService } from '../plugins/twilio';
import { generateToken } from '../utils/generateToken';
import { User } from '../models/User';

export class AuthController {
  constructor(private twilioService: TwilioService) {}

  signup = async (req: Request, res: Response): Promise<Response> => {
    const {
      phoneNumber,
      firstName,
      lastName,
    }: { phoneNumber: string; firstName: string; lastName: string } = req.body;

    const user = await User.create({
      phoneNumber,
      firstName,
      lastName,
    });

    await this.twilioService.sendVericationCode(phoneNumber);

    return res.status(201).json({
      status: 201,
      message: `user successfully created`,
      data: {
        phoneNumber: user.phoneNumber,
        fullName: `${user.firstName} ${user.lastName}`,
      },
    });
  };

  verifyUser = async (req: Request, res: Response): Promise<Response> => {
    const {
      phoneNumber,
      code,
    }: { phoneNumber: string; code: string } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: `Please sign up before account verification`,
      });
    }

    if (user.verified) {
      return res.status(400).json({
        status: 400,
        message: `Your account has already been verified`,
      });
    }

    const verifyCode = await this.twilioService.verifyCode(phoneNumber, code);

    if (!verifyCode.valid && verifyCode.status !== 'approved') {
      return res.status(400).json({
        status: 400,
        message: `wrong verification code`,
      });
    }

    await user.updateOne({ verified: true });
    const token = generateToken(user._id);

    return res.status(201).json({
      status: 201,
      message: `user successfully verified`,
      data: {
        phoneNumber,
        token,
      },
    });
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { phoneNumber }: { phoneNumber: string } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: `Please sign up before login`,
      });
    }

    if (!user.verified) {
      await this.twilioService.sendVericationCode(phoneNumber);
      return res.status(403).json({
        status: 403,
        message: `Check your sms for account verification`,
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      status: 200,
      message: `user successfully Login`,
      data: {
        phoneNumber,
        token,
      },
    });
  };
}
