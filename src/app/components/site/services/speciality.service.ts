import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Speciality } from '../models/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  private BASE_URL: string = environment.Base_Url;


  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Speciality[] | null > {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Speciality[]>(`${this.BASE_URL}/api/v1/specialities`,{headers: headers}
    );
  }
}
