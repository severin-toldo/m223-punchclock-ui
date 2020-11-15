import { Injectable } from '@angular/core';
import {NavLink} from '../model/components/nav-link.model';
import {dashboardRoute} from '../shared/routes';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }

  // TOOD add if admin
  public getTopNav(): NavLink[] {
    return [
      new NavLink('NAV.NAV_LINKS.DASHBOARD', dashboardRoute()),
    ];
  }
}
