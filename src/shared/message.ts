import { ObjectId } from 'mongodb';

export interface IMessage {
  _id?: ObjectId;
  senderId: string;
  timeStamp?: string;
  message: string;
  image?: string;
}
