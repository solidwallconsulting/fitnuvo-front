import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trainer } from 'src/app/models/adminsModel/trainer.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = 'http://localhost:8000/api/v1';


  constructor(private httpClient: HttpClient ,private auth : AuthService) { }
  token:string = this.auth.getToken();
    headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,

  })
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }
 
  create(User:any): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/admin`, JSON.stringify(User), this.httpOptions );
  }
  updateInfo(User:any): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/user/update/me`, JSON.stringify(User), this.httpOptions );
  }
  changePwd(User:any) {
    return this.httpClient.post<User>(`${this.apiUrl}/user/updatepassword`, JSON.stringify(User), this.httpOptions );

  }
  getAllClients(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/clients`,{headers:this.headers});
  }

  getAllTrainers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/trainers`);
  }
  getAdmins(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/admins`,{headers:this.headers});
  }
  
  getTrainer(id:any): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/trainers/`+id);
  }


  activeAccount(id:any) {
    return this.httpClient.post<User>(`${this.apiUrl}/activeaccount`, {id:id},{headers:this.headers});
  }

  DesacitveAccount(id:any){
    return this.httpClient.post<User>(`${this.apiUrl}/desactiveaccount`, {id:id},{headers:this.headers});
  }


   getTrainerByid(id: number): Observable<Trainer> {
    return this.httpClient.get<Trainer>(`${this.apiUrl}/trainers/`+id);
  }


  getTop5() {
    return this.httpClient.get(`${this.apiUrl}/top-trainers-5`);
  }
  
}
