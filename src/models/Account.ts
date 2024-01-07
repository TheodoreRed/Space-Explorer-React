import SpaceArticle from "./SpaceArticle";
import NASAImage from "./NASAImage";

export interface UserComment {
  uid: string;
  eventId: string;
  eventDate: string;
  content: string;
  uniqueName: string;
  photoURL: string;
  createdAt: Date;
  likes: string[];
  replies: UserComment[];
  uuid: string;
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
