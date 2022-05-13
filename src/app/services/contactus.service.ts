import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  private BASE_URL: string = environment.Base_Url;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Contact[] | null > {
    return this.httpClient.get<Contact[]>(`${this.BASE_URL}/api/v1/contacts`);
  }
  

  get_unreadedcontacts(): Observable<Contact[] | null > {
    return this.httpClient.get<Contact[]>(`${this.BASE_URL}/api/v1/unreaded-contacts`);
  }
  addContact(data:any){
    console.log(data);
    return this.httpClient.post<Contact>(`${this.BASE_URL}/api/v1/contactus`, data);
  }

  readAll(){
    return this.httpClient.get<Contact>(`${this.BASE_URL}/api/v1/readAllContacts`);
  }
}
