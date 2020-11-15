import {Category} from "./category.model";
import {User} from "./user.model";

export class TimeEntry {
  public id: number;
  public checkIn: Date;
  public checkOut: Date;
  public category: Category;
  public user: User;
}
