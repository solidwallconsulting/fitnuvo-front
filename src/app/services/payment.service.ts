import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(private http: HttpClient) { }

 addPaymentIntentStripe(
   id: string,
    email: string,
    price: number,
    currency: string,
    description: string,
    date_time:string

 ) {
   let uploadData = {
      id: id, 
      email: email,
      price: price, 
      currency: currency, 
      description: description,
      date_time:date_time

    };

     const url = environment.Base_Url + '/api/v1/payment-intent';
    console.log(uploadData);
    return this.http.post<any>(url, JSON.stringify(uploadData), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(tap(resData => {
      console.log(resData);
      return resData;
    }));
 }

 storePaymentIntent(
   itemId: string,
    buyerEmail: string, 
    itemPrice: number,
    currency: string,
    description: string,
    intent_id: string,
    date_time:string

 ) {
   let uploadData = {
      itemId: itemId,
      intentId: intent_id,      
      currency: currency,      
      buyerEmail: buyerEmail, 
      itemPrice: itemPrice,     
      itemDescription: description, 
      date_time:date_time

      
    };

    const url = environment.Base_Url + '/api/v1/store-intent';
    return this.http.post<any>(url, JSON.stringify(uploadData), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(tap(resData => {
      console.log(resData);
      return resData;
    }));
 }
 
}
