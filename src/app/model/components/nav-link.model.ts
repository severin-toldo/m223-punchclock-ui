export class NavLink {
  public route: string[];
  public text: string;

  constructor(text: string, route: string[]) {
    this.text = text;
    this.route = route;
  }
}
