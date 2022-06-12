import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private BASE_URL: string = environment.Base_Url;

  constructor(private httpClient: HttpClient,private auth : AuthentificationService) { }
  token:string = this.auth.getToken();
  headers = new HttpHeaders({
   Authorization: `Bearer ${this.token}`,
   });
  getAllMymessages(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/messages/allmsg`, {headers:this.headers});
  }

  getAllMymessagestest(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/messages/testmsg`, {headers:this.headers});
  }

  getPrivateMessages(id:any){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/messages/with/`+id, {headers:this.headers});
  }

  sendMsg(id:any,msg:any){
    return this.httpClient.post(`${this.BASE_URL}/api/v1/messages/send`, {receiver_id:id,message:msg},{headers:this.headers});
  }

  markasread(id:any){
    return this.httpClient.post(`${this.BASE_URL}/api/v1/messages/markasread`, {id:id},{headers:this.headers});
  }

}
