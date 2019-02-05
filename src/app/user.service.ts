import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { SearchResult } from './search-result';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
      const url = `${this.usersUrl}/users/${username}`;
      return this.http.get<User>(url).pipe(
        tap(_ => console.log(`fetched ${ username }`)),
        catchError(this.handleError<User>(`getUser ${ username }`))
      );
  }

  searchUsers(term: string): Observable<SearchResult[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<SearchResult[]>(`${ this.usersUrl }/search/users?q=${ term }+in:login&type=Users&s=stars&o=desc`).pipe(
                          tap(_ => console.log(`found users matching "${ term }"`)),
                          // map(result => (users = result.items)),
                          // tap(result => (users = result.items)),
                          catchError(this.handleError<SearchResult[]>('searchUsers', []))
                          );
  }

private handleError<T> (task = 'task', result?: T) {
  return (err: any): Observable<T> => {
      console.error(err);
      return of(result as T);
    };
  }
}