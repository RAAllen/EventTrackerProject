import { Injectable } from '@angular/core';

import { NgForm } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Activity } from './models/activity';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  private url = 'http://localhost:8080/api/activities/';

  // END OF FIELDS

  index() {
    return this.http.get<Activity[]>(this.url)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }

  create(activity: Activity) {
    return this.http.post<Activity>(this.url, activity)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('ERROR!!!');
      })
    );
  }

  update(activity: Activity) {
    return this.http.put<Activity>(this.url + '/' + activity.id, activity)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('ERROR!!!');
      })
    );
  }

  destroy(id: number) {
    return this.http.delete<Activity>(this.url + '/' + id);
  }

  // END OF METHODS

  constructor(
    private http: HttpClient
  ) { }
}
