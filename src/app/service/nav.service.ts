import { Injectable } from '@angular/core';
import {NavLink} from '../model/components/nav-link.model';
import {createTimeEntryRoute, dashboardRoute, superviseRoute} from '../shared/routes';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private authService: AuthService) {
  }

  public getTopNav(): NavLink[] {
    const navLinks = [
      new NavLink('NAV.NAV_LINKS.DASHBOARD', dashboardRoute()),
      new NavLink('NAV.NAV_LINKS.RECORD', createTimeEntryRoute()),
    ];

    if (this.authService.isAdmin()) {
      navLinks.push(new NavLink('NAV.NAV_LINKS.SUPERVISE', superviseRoute()));
    }

    return navLinks;
  }
}
