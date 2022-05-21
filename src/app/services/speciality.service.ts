import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Speciality } from 'src/app/models/adminsModel/speciality';
import { AuthService } from '../components/admin/services/auth.service';

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
    console.log(data);
    return this.httpClient.post<Speciality>(`${this.apiUrl}/speciality`, data,{headers:this.headers});
  }

  
  updateCategorie(data:any){
    console.log(data);
    return this.httpClient.put<Speciality>(`${this.apiUrl}/speciality/`+data.id, data,{headers:this.headers});
  }

  deleteCategorie(id:any){
    console.log(id);

   
    return this.httpClient.delete<Speciality>(`${this.apiUrl}/speciality/`+id,{headers:this.headers});
  }


}
