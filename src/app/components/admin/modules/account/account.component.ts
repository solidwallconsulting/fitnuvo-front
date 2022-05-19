import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/adminsModel/admin.model';
import { AuthService,  } from '../auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  profile: Admin = new Admin();


  constructor(private auth : AuthService) {}

  ngOnInit(): void {

    this.auth.getUserByToken().subscribe((data:any)=>{
      console.log("dataaa",data['user']);
      this.profile=data['user'];
      console.log("dddd",this.profile);

    });
    console.log("dddd",this.profile);

  }

}
