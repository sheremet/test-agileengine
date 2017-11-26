import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';


const apiBaseUrl = 'https://jsonplaceholder.typicode.com';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  private users = 'users';


  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUrl(this.users))
      .pipe(
        tap(users => console.log(`fetched users`, users)),
        catchError(this.handleError('getUseres', []))
      );
  }

  getUserDetails(id: number): Observable<User> {
    const url = `${this.users}/${id}`;
    return this.http.get<any>(this.getUrl(url))
      .pipe(
        tap(user => console.log(`fetched user`, user)),
        catchError(this.handleError('getUserDetails', {}))
      );
  }

  /** PUT: update the User on the server */
  updateUser (user: User): Observable<any> {
    const url = `${this.users}/${user.id}`;
    return this.http.put(this.getUrl(url), user, httpOptions).pipe(
      tap(_ => console.log(`updated User id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  private getUrl(path: string) {
    return `${apiBaseUrl}/${path}`;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
