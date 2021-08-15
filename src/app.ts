import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { IRoute } from './interfaces/route.interface';

dotenv.config();

const { DATABASE_URL } = process.env;

export class App {
  public app: express.Application;

  constructor(routes: IRoute[]) {
    this.app = express();

    this.connectDB();
    this.initializeMiddlewares();
    this.initializeroutes(routes);
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  private initializeroutes(routes: IRoute[]): void {
    routes.forEach((route) => {
      this.app.use('/api/v1/', route.router);
    });
  }

  private connectDB(): void {
    try {
      mongoose.connect(`${DATABASE_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  listen(): void {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }
}
