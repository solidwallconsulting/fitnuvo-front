import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Form } from '@angular/forms';
import { Trainer } from '../models/trainer';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Loginresult } from '../models/loginresult.model';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../models/adminsModel/role.model';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
    // Variables
    private BASE_URL: string = environment.Base_Url;
    expToken: any;
    tokenPayload: any;
    expirationDate: any;
    result: Loginresult;
    private menu: Permission[];
    private userr: User;
    private role: string;

    constructor(private http: HttpClient, private toastr: ToastrService) { }

    /*public setUser(user: User){
      this.userr=user;
    }
     public getUser(){
      return this.userr;
    }*/
    public getUser() {
      this.userr = JSON.parse(localStorage.getItem('user')!);
      return this.userr;
    } 
    public setMenu(menu: Permission[]) {
     this.menu=menu;
     
    }
    public getMenu(){
      return this.menu;
    }

    // Login
   /* login(email:string,password:string) {

      return this.http.post(this.BASE_URL+'/api/v1/login',{email:email,password:password});
    }*/
    public login(email:string,password:string):Observable<HttpResponse<Loginresult>>{
      return this.http.post<Loginresult>(`${environment.Base_Url}/api/v1/login`,{email:email,password:password},{observe:'response'});
    }
    
      public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if(token){
         // Check whether the token is expired and return
        // true or false
          return !jwtHelper.isTokenExpired(token!);
        } 
        else{ 
          return false;
        } 
       
        
      }
      public islogout(): void {
        const user = localStorage.getItem('user');
        if(user){
         // Check whether the token is expired and return
        // true or fals
        localStorage.clear();
         
        } 
        
       
        
      }
      getRole() {
        this.role = JSON.parse(localStorage.getItem('ROLE')!);
        return this.role;
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
       // localStorage.clear();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.post(this.BASE_URL+'/api/v1/logout', {allDevice:allDevice}, {headers:headers});
        
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
     // Is Loggedin
     isLoggedIn(){
      return !localStorage.getItem('token') ;
    }
}