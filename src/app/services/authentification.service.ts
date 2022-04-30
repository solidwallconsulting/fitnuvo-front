import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';
import { Trainer } from '../models/trainer';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
    // Variables
    private BASE_URL: string = environment.Base_Url;

  

  constructor(private http: HttpClient) { }

      // Is Loggedin
      isLoggedIn(){
          return !localStorage.getItem('token') ;
      }


    // Login
    login(email:string,password:string) {
      /**const options = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
      };
      return this.http.post(this.authUrl, {
        grant_type: 'password',
        client_id: '2',
        client_secret: 'srKHlpLcnyLaBhZmQsAIuztgY7C0N8gjZPFKjYgu',
        username: e,
        password: p,
        scope: ''
      }, options);
 **/

      return this.http.post(this.BASE_URL+'/api/v1/login',{email:email,password:password});
    }
  
    // User Info
    user() {
      const user: any = localStorage.getItem('user');
      const userObj = JSON.parse(user);
  
      const token = userObj.token;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(this.BASE_URL+'/api/v1/user', {
        headers: headers,
      });
    }

     // Logout
      logout(allDevice: boolean){
        const user: any = localStorage.getItem('user');
        const userObj = JSON.parse(user);

        const token = userObj.token;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.post(this.BASE_URL+'/api/v1logout', {allDevice:allDevice}, {headers:headers});
      }


      // Register
       register(fr:FormData){

        return this.http.post(this.BASE_URL+'/api/v1/register',fr);
      }

      public sendRestPasswordLink(email:string) {
        return this.http.post(this.BASE_URL + '/api/v1/password/sendRestPasswordLink', {email:email});
  
      }

      public changePassword(form:FormData) {
        return this.http.post(this.BASE_URL + '/api/v1/password/reset', form);
      }
    
}
