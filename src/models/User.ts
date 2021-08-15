import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  active: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export const User: Model<IUser> = model('User', UserSchema);
