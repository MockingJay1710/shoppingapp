import {User} from "./User";

export class myComment {
  user: User;
  rating: number;
  comment: string;
  date: Date;

  constructor(user: User, rating: number, comment: string, date: Date) {
    this.user = user;
    this.rating = rating;
    this.comment = comment;
    this.date = date;
  }
}
