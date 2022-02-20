import { UserInterface } from "./User";

export interface ReplieInterface {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: UserInterface;
}

export interface CommentListInterface {
  id?: number | null;
  content?: string;
  createdAt?: string;
  score?: number;
  user?: UserInterface;
  replies?: Array<ReplieInterface>;
}

export interface StateReqBodyCommentInterface {
  content: string | null;
  imagePng: string | null;
  imageWebp: string | null;
  username: string | null;
}
