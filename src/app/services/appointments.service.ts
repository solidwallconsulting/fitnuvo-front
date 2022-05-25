import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private BASE_URL: string = environment.Base_Url;

  constructor(private httpClient: HttpClient,private auth : AuthentificationService) { }
  token:string = this.auth.getToken();
  headers = new HttpHeaders({
   Authorization: `Bearer ${this.token}`,
   });
  getAll(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/appointments`);
  }
  

  getClApp(){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/client/myappointments`,{headers:this.headers});
  }


  addappfromtrainer(data:any){
    return this.httpClient.post(`${this.BASE_URL}/api/v1/trainer/appointment`, data,{headers:this.headers});

  }

  getTrainerApp(){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainer/appointments`,{headers:this.headers});
  }


  getAvailableAppForTrainer(id:any){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainer/`+id+`/availableapp`,{headers:this.headers} );
  }
}
