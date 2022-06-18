import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';
import { User } from '../models/user.model';
import { AuthentificationService } from './authentification.service';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private BASE_URL: string = environment.Base_Url;

  constructor(private httpClient: HttpClient,private auth:AuthentificationService) { }

  getAll(): Observable<Trainer[] | null > {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Trainer[]>(`${this.BASE_URL}/api/v1/trainers`,{headers: headers}
    );
  }

  getAllByAuth(): Observable<Trainer[] | null > {
    return this.httpClient.get<Trainer[]>(`${this.BASE_URL}/api/v1/trainersauth`,this.httpOptions
    );
  }
  getTop10(): Observable<Trainer[] | null > {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Trainer[]>(`${this.BASE_URL}/api/v1/top-trainers`,{headers: headers}
    );
  }
  getnews(): Observable<Trainer[] | null > {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Trainer[]>(`${this.BASE_URL}/api/v1/newtrainers`,{headers: headers}
    );
  }

  getTrainersBySpeciality(brand:any): Observable<Trainer[] | null > {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Trainer[]>(`${this.BASE_URL}/api/v1/trainers/speciality/${brand}`,{headers: headers}
    );
  }

  getTrainer(id:any): Observable<Trainer[]> {
    return this.httpClient.get<Trainer[]>(`${this.BASE_URL}/api/v1/trainers/`+id);
  }

  getFilteredTrainers(data:any){
    return this.httpClient.post<Trainer[]>(`${this.BASE_URL}/api/v1/trainers/search`,data
    );
  }

  getSearchLive(name:string){
    const response=  new Promise ( resolve => {
      this.httpClient.get(`${this.BASE_URL}/api/v1/trainerslive/search_live?search_live=${name}`).subscribe(data => {

        resolve(data);
      },err => {
        console.log(err);
      });
    });
    return response;

  }


  token:string = this.auth.getToken();


   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
  
    })
    }

    headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      });

  updateInfo(User:any) {
    return this.httpClient.post<User>(`${this.BASE_URL}/api/v1/user/update/me`, JSON.stringify(User), this.httpOptions );
  }

  changePwd(User:any) {
    return this.httpClient.post(`${this.BASE_URL}/api/v1/user/updatepassword`, JSON.stringify(User), this.httpOptions );

  }

  EditProfileDesc(data:any){

    return this.httpClient.post(`${this.BASE_URL}/api/v1/updateProfileDesc`,data, {headers:this.headers});
  }


  
  mycertifications(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainerme/certifs`,{headers:this.headers});
  }

  myachivements(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainerme/achivements`,{headers:this.headers});
  }

  myspecialities(){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainerme/specialities`,{headers:this.headers});
  }


  deleteCertif(id:any){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainerme/certifcation/`+id, {headers:this.headers});
  }

  deleteAchv(id:any){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/trainerme/achivement/`+id, {headers:this.headers});
  }



  getTransactions(){
    return this.httpClient.get(`${this.BASE_URL}/api/v1/mytr/transactions`,{headers:this.headers});
  }

}
