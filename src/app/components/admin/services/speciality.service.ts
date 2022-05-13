import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Speciality } from '../../../models/adminsModel/speciality';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  apiUrl = 'http://localhost:8000/api/v1';

  constructor(private httpClient: HttpClient,private auth : AuthService) { }

  getAll(): Observable<Speciality[] | null > {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Speciality[]>(`${this.apiUrl}/specialities`,{headers: headers}
    );
  }


  /* token:string = this.auth.getToken();
   headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    });*/
  addCategorie(data:any){
    var token = this.auth.getToken();
    var headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    });
    console.log(data);
    return this.httpClient.post<Speciality>(`${this.apiUrl}/speciality`, data,{headers:headers});
  }

  
  updateCategorie(data:any){
    var token = this.auth.getToken();
    var headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    });
    console.log(data);
    return this.httpClient.put<Speciality>(`${this.apiUrl}/speciality/`+data.id, data,{headers:headers});
  }

  deleteCategorie(id:any){
    var token = this.auth.getToken();
    var headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    });
    console.log(id);

   
    return this.httpClient.delete<Speciality>(`${this.apiUrl}/speciality/`+id,{headers:headers});
  }


}
