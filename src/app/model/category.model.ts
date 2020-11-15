import {TimeEntry} from "./time-entry.model";

export class Category {
  public id: number;
  public name: string;
  public entries?: TimeEntry[];
}
