import {Role} from "../role.enum";

export class UserInvitationRequest {
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public roles: Role[];
}
