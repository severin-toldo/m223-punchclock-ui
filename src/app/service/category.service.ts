import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category.model";
import {createCategoryUrl, deleteCategoryUrl, editCategoryUrl, getAllCategoriesUrl} from "../shared/urls";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(getAllCategoriesUrl());
  }

  public create(category: Category): Observable<Category> {
    return this.http.post<Category>(createCategoryUrl(), category);
  }

  public edit(category: Category): Observable<Category> {
    return this.http.patch<Category>(editCategoryUrl(category.id), category);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(deleteCategoryUrl(id));
  }
}
