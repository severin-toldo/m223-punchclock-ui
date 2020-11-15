import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TimeEntry} from "../model/time-entry.model";
import {
  createTimeEntryUrl,
  deleteTimeEntryUrl,
  editTimeEntryUrl,
  getAllTimeEntriesUrl,
  getMyTimeEntriesUrl
} from "../shared/urls";

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(getAllTimeEntriesUrl());
  }

  public getMine(): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(getMyTimeEntriesUrl());
  }

  public create(timeEntry: TimeEntry): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(createTimeEntryUrl(), timeEntry)
  }

  public edit(timeEntry: TimeEntry): Observable<TimeEntry> {
    return this.http.patch<TimeEntry>(editTimeEntryUrl(timeEntry.id), timeEntry);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(deleteTimeEntryUrl(id));
  }
}
