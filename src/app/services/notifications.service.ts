import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Echo  from 'laravel-echo';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private BASE_URL: string = environment.Base_Url;

  constructor(private httpClient: HttpClient,private auth : AuthentificationService) { }
  token:string = this.auth.getToken();
  headers = new HttpHeaders({
   Authorization: `Bearer ${this.token}`,
   });
      getmynotifications(){

        return this.httpClient.get(`${this.BASE_URL}/api/v1/mynotifications`, {headers:this.headers});
      }

  getSockets() : Echo {
    return new Echo({
      broadcaster: 'pusher',
      key: environment.pusher_key,
      wsHost: environment.pusher_host,
      cluster : environment.pusher_cluster, 
      authEndpoint:`${ environment.urlServeur}/api/broadcasting/auth`,
      auth: {

        headers :  {
          Accept: 'application/json',
          Authorization : `Bearer ${this.auth.getToken()}`
        }
      },
      wsPort: 6001,
      forceTLS: false,

      disableStats: true,
      enabledTransports: ['ws']
    })
  }
}
