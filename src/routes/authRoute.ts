import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { AuthController } from '../controllers/authController';
import { asyncHandler } from '../middlewares/asyncHandler';
import { checkPhoneNumber } from '../middlewares/checkPhoneNumber';

export class AuthRoute implements IRoute {
  public path = '/auth';
  public router = Router();

  constructor(private readonly authController: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/signup`,
      asyncHandler(checkPhoneNumber),
      asyncHandler(this.authController.signup),
    );
    this.router.post(
      `${this.path}/verify`,
      asyncHandler(this.authController.verifyUser),
    );
    this.router.post(
      `${this.path}/login`,
      asyncHandler(this.authController.login),
    );
  }
}
