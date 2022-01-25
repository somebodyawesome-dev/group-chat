import { IGroup } from "./Group";
import { IUser } from "./User";

export interface IMessage {
  message: string;
  sentBy: string;
}
export interface InboxData {
  lastMessage: IMessage;
  user: IUser;
}

export type { IGroup, IUser };
