import SpaceArticle from "./SpaceArticle";
import NASAImage from "./NASAImage";

interface UserCommentReply {
  uid: string;
  eventId: string;
  content: string;
  createdAt: Date;
  likes: number;
}

interface UserComment {
  uid: string;
  eventId: string;
  content: string;
  createdAt: Date;
  likes: number;
  replies: UserCommentReply[]; // Array of replies to the comment
}

export default interface Account {
  _id?: string;
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  uniqueName: string;
  darkMode: boolean;
  savedEvents: string[];
  savedArticles: SpaceArticle[];
  savedImages: NASAImage[];
  comments: UserComment[];
}
