import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private BASE_URL: string = environment.Base_Url;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Trainer[] | null > {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Trainer[]>(`${this.BASE_URL}/api/v1/trainers`,{headers: headers}
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

}
