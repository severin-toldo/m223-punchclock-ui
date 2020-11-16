import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Category} from "../../../model/category.model";
import {MatTableDataSource} from "@angular/material/table";
import {CategoryService} from "../../../service/category.service";
import {ToasterService} from "../../../service/toaster.service";
import {Router} from "@angular/router";
import {superviseEditUserRoute, superviseInviteUserRoute} from "../../../shared/routes";
import {User} from "../../../model/user.model";
import { faPlus, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public readonly faPlus = faPlus;
  public readonly faEdit = faEdit;
  public readonly faTimes = faTimes;
  public readonly superviseInviteUserRoute = superviseInviteUserRoute;

  public users: User[];
  public displayedColumns = ['firstName', 'lastName', 'status'];
  public dataSource: MatTableDataSource<User>;
  public hasEntries = false;

  constructor(private userService: UserService,
              private toaster: ToasterService,
              private router: Router) {
  }

  public ngOnInit(): void {
    // TODO do nicer
    this.userService.getAll()
      .subscribe(users => {
        this.users = users;
        this.hasEntries = this.users && this.users.length > 0;

        if (this.hasEntries) {
          this.dataSource = new MatTableDataSource<User>(this.users);
        }
      }, error => {
        this.toaster.error(error.errorMessage);
      });
  }

  public ngAfterViewInit(): void {
    if (this.hasEntries) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  public onDelete(id: number) {
    this.userService.delete(id)
      .subscribe(() => {
        this.toaster.success();
        this.users = this.users.filter(e => e.id !== id);
        this.dataSource.data = this.users;
        this.hasEntries = this.users && this.users.length > 0;
      }, error => {
        this.toaster.error(error.errorMessage);
      });
  }

  public onEdit(id: number) {
    this.router.navigate(superviseEditUserRoute(id));
  }

}
