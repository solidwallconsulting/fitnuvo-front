import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../site/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = 'http://localhost:8000/api/v1';

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }
  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }
 
  create(User:any): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/admin`, JSON.stringify(User), this.httpOptions);
  }


}
