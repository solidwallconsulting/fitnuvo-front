import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/adminsModel/review.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  apiUrl = 'http://localhost:8000/api/v1';

  constructor(private httpClient: HttpClient,private auth : AuthService) { }

  token:string = this.auth.getToken();
  headers = new HttpHeaders({
   Authorization: `Bearer ${this.token}`,
   });

  getAll(): Observable<Review[] | null > {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Review[]>(`${this.apiUrl}/reportedreviews`,{headers: this.headers}
    );
  }

  deleteReview(id:any){
    console.log(id);
    return this.httpClient.delete<Review>(`${this.apiUrl}/reviews/`+id,{headers:this.headers});
  }
}
