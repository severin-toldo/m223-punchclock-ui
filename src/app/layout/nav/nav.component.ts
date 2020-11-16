import { Component, OnInit } from '@angular/core';
import {NavLink} from '../../model/components/nav-link.model';
import {NavService} from '../../service/nav.service';
import {Router} from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../service/auth.service';
import {getCurrentRoute} from '../../shared/util/other.util';
import {dashboardRoute, loginRoute} from '../../shared/routes';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public isLoggedIn = false;
  public navLinks: NavLink[] = [];

  public readonly faSignOutAlt = faSignOutAlt;
  public readonly faDatabase = faDatabase;
  public readonly dashboardRoute = dashboardRoute;

  constructor(private authService: AuthService,
              private navService: NavService) {
  }

  public ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.navLinks = this.navService.getTopNav();
  }

  public isNavLinkActive(navLink: NavLink): boolean {
    return navLink.route[0] === getCurrentRoute();
  }

  public logout(): void {
    this.authService.logout();
  }
}
