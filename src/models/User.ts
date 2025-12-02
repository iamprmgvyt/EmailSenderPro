import mongoose, { Schema, Document, Model } from 'mongoose';
import { randomBytes } from 'crypto';

export interface IDailySent {
  count: number;
  date: string;
}

export interface IEmailConfig {
    fromName: string;
    defaultSubject: string;
}

export interface IUser extends Document {
  email: string;
  password?: string;
  apiKey: string;
  dailySent: IDailySent;
  emailConfig: IEmailConfig;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email.'],
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      select: false, // Do not return password by default
    },
    apiKey: {
      type: String,
      unique: true,
      default: () => randomBytes(20).toString('hex'),
    },
    dailySent: {
      count: {
        type: Number,
        default: 0,
      },
      date: {
        type: String,
        default: () => new Date().toISOString().split('T')[0],
      },
    },
    emailConfig: {
        fromName: {
            type: String,
            default: '',
        },
        defaultSubject: {
            type: String,
            default: '',
        }
    }
  },
  { timestamps: true }
);

// To prevent model overwrite errors in Next.js HMR
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
