import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Speciality } from 'src/app/models/adminsModel/speciality';
import { AuthService } from '../components/admin/services/auth.service';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  apiUrl = 'http://localhost:8000/api/v1';

  constructor(private httpClient: HttpClient,private auth : AuthService) { }

/** 
  
  token:string = this.auth.getToken();
  headers = new HttpHeaders({
   Authorization: `Bearer ${this.token}`,
   });

    */

   

    headers = new HttpHeaders({'Content-Type': 'application/json'});

  getAll(): Observable<Speciality[] | null > {
    return this.httpClient.get<Speciality[]>(`${this.apiUrl}/specialities`);
  }




  addCategorie(data:any){
    const token:string = this.auth.getToken();
   const headerss = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    });
    console.log(data);
    return this.httpClient.post<Speciality>(`${this.apiUrl}/speciality`, data,{headers:headerss});
  }

  
  updateCategorie(data:any){
    const token:string = this.auth.getToken();
    const headerss = new HttpHeaders({
     Authorization: `Bearer ${token}`,
     });
    console.log(data);
    return this.httpClient.put<Speciality>(`${this.apiUrl}/speciality/`+data.id, data,{headers:headerss});
  }

  deleteCategorie(id:any){
    const token:string = this.auth.getToken();
    const headerss = new HttpHeaders({
     Authorization: `Bearer ${token}`,
     });
    console.log(id);
    return this.httpClient.delete<Speciality>(`${this.apiUrl}/speciality/`+id,{headers:headerss});
  }

  /**  

  getSpeOfTrainer(id:any){
 
    return this.httpClient.get(`${this.apiUrl}/trainers/`+id+`/specialities`, {headers:this.headerss});
  }

  */

}
