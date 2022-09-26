import { Document } from 'mongoose';

export interface UserInterface extends Document {
  readonly login: string;
  readonly id: number;
  readonly avatar_url: string;
  readonly url: string;
}
