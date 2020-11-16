import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { faCalendarPlus, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {createCategoryUrl, editCategoryUrl} from "../../../shared/urls";
import {Category} from "../../../model/category.model";
import {editTimeEntryRoute, superviseCreateCategoryRoute, superviseEditCategoryRoute} from "../../../shared/routes";
import {ToasterService} from "../../../service/toaster.service";
import {CategoryService} from "../../../service/category.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {TimeEntry} from "../../../model/time-entry.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public readonly faCalendarPlus = faCalendarPlus;
  public readonly faEdit = faEdit;
  public readonly faTimes = faTimes;
  public readonly superviseCreateCategoryRoute = superviseCreateCategoryRoute;

  public categories: Category[];
  public displayedColumns = ['id', 'name'];
  public dataSource: MatTableDataSource<Category>;
  public hasEntries = false;

  constructor(private categoryService: CategoryService,
              private toaster: ToasterService,
              private router: Router) {
  }

  public ngOnInit(): void {
    // TODO do nicer
    this.categoryService.getAll()
      .subscribe(categories => {
        this.categories = categories;
        this.hasEntries = this.categories && this.categories.length > 0;

        if (this.hasEntries) {
          this.dataSource = new MatTableDataSource<Category>(this.categories);
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
    this.categoryService.delete(id)
      .subscribe(() => {
        this.toaster.success();
        this.categories = this.categories.filter(e => e.id !== id);
        this.dataSource.data = this.categories;
        this.hasEntries = this.categories && this.categories.length > 0;
      }, error => {
        this.toaster.error(error.errorMessage);
      });
  }

  public onEdit(id: number) {
    this.router.navigate(superviseEditCategoryRoute(id));
  }
}
