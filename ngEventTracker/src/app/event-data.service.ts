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

  private url = 'http://localhost:8080/api/activites/';

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

  create(data) {
    return this.http.post<Activity>(this.url, data)
    .pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, data: Activity) {
    return this.http.put<Activity>(this.url + '/' + id, data)
    .pipe(
      catchError(this.handleError)
    );
  }

  destroy(id: number) {
    return this.http.delete<Activity>(this.url + '/' + id);
  }

  handleError(error: any) {
    console.error('KABLAM!!!');
    return throwError(error.json().error || 'Server Error');
  }

  // END OF METHODS

  constructor(
    private http: HttpClient
  ) { }
}
