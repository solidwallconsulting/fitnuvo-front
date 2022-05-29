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

  getOneappByIdFromClient(id:any){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/client/appointment/`+id,{headers:this.headers} );
  }
  

  getClApp(){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/client/myappointments`,{headers:this.headers});
  }


  addappfromclient(date:any,activity:any,start:any,end:any,id:any){
    return this.httpClient.post(`${this.BASE_URL}/api/v1/client/appointment`, {date_app:date,activity:activity,time_start:start,time_end:end,trainer_id:id},{headers:this.headers});

  }

  upcomingappOfClient(){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/client/upcomingapp`,{headers:this.headers});

  }
  editAppFromClient(id1:any,id2:any){
    return this.httpClient.post(`${this.BASE_URL}/api/v1/client/editappointment`,{appointment_id:id1,oldappointment_id:id2} ,{headers:this.headers});

    
  }
  cancelappFromClient(id:any){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/client/cancelapp/`+id,{headers:this.headers});

  }

  completedappOfClient(){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/client/completedapp`,{headers:this.headers});

  }






  getOneappByIdFromTrainer(id:any){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainer/myappointment/`+id,{headers:this.headers} );
  }
  
  
  addappfromtrainer(data:any){
    return this.httpClient.post(`${this.BASE_URL}/api/v1/trainer/appointment`, data,{headers:this.headers});

  }

  upcomingappOfTrainer(){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainer/upcomingapp`,{headers:this.headers});

  }

  
  completedappOfTrainer(){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainer/completedapp`,{headers:this.headers});

  }
  getTrainerApp(){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainer/appointments`,{headers:this.headers});
  }


  getAvailableAppForTrainer(id:any){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainer/`+id+`/availableapp`,{headers:this.headers} );
  }


  editAppFromTrainer(id1:any,id2:any){
    return this.httpClient.post(`${this.BASE_URL}/api/v1/trainer/editappointment`,{appointment_id:id1,oldappointment_id:id2} ,{headers:this.headers});

    
  }
}
