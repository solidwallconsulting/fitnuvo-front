import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private BASE_URL: string = environment.Base_Url;

  constructor(private httpClient: HttpClient,private auth : AuthentificationService) { }
  token:string = this.auth.getToken();
  headers = new HttpHeaders({
   Authorization: `Bearer ${this.token}`,
   });
  getClReviews(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/myclreviews`, {headers:this.headers});
  }

  getTrReviews(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/mytr/reviews`, {headers:this.headers});
  }


  reportReview(id:any){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/mytr/reportreview/`+id, {headers:this.headers});
  }

  unreportReview(id:any){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/mytr/unreportreview/`+id, {headers:this.headers});
  }


  makeReview(id:any,review:any,stars:any) {
    return this.httpClient.post(`${this.BASE_URL}/api/v1/trainers/makereview` , {id: id , review: review , stars:stars} ,{headers:this.headers});

  }

  RateTrainer(id:any,stars:any) {
    return this.httpClient.post(`${this.BASE_URL}/api/v1/trainers/ratetrainer` , {id: id ,  stars:stars} ,{headers:this.headers});

  }
}
