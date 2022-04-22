import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
    // Variables
    authUrl = 'http://localhost:8000/oauth/token';
    apiUrl = 'http://localhost:8000/api/v1';
  

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

      return this.http.post(this.apiUrl+'/login',{email:email,password:password});
    }
  
    // User Info
    user() {
      const user: any = localStorage.getItem('user');
      const userObj = JSON.parse(user);
  
      const token = userObj.token;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(this.apiUrl+'/user', {
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
        return this.http.post(this.apiUrl+'logout', {allDevice:allDevice}, {headers:headers});
      }


      // Register
       register(fr:FormData){

        return this.http.post(this.apiUrl+'/register',fr);
      }
}
