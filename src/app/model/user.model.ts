import { UserStatus } from './user-status.enum';
import {Role} from "./role.enum";
import {TimeEntry} from "./time-entry.model";

export class User {
  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public status: UserStatus
  public roles: Role[]
  public entries?: TimeEntry[]
}
