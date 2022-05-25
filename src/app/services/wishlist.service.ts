import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private BASE_URL: string = environment.Base_Url;

  constructor(private httpClient: HttpClient,private auth : AuthentificationService) { }
  token:string = this.auth.getToken();
  headers = new HttpHeaders({
   Authorization: `Bearer ${this.token}`,
   });
  getmyWishlist(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/wishlist`, {headers:this.headers});
  }





  addtoWishlist(data:any){
    console.log(data);
    return this.httpClient.post(`${this.BASE_URL}/api/v1/addtowish`, {trainer_id:data},{headers:this.headers});
  }


  removefromList(data:any){
    console.log(data);
    return this.httpClient.post(`${this.BASE_URL}/api/v1/removefromList`, {trainer_id:data},{headers:this.headers});
  }

  verifyadd(data:any){
    console.log(data);
    return this.httpClient.post(`${this.BASE_URL}/api/v1/verifyadded`, {trainer_id:data},{headers:this.headers});
  }
}
