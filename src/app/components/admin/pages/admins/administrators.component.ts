import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.scss'],
})
export class AdministratorsComponent implements OnInit {
  users:LocalDataSource;

  settings = {
    pager: {
      display: true,
      perPage: 10,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      admin_id: {
        title: 'ID',
        editable: false,
        addable: false,
        type: 'number',
      },
 
      photo_profil: {
          title: 'Picture',
          filter: false,
          type: 'html',
          valuePrepareFunction: (photo_profil:string) => { return `<div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
          <a href="">
            <div class="symbol-label">
              <img src="${photo_profil}" alt="Avater" class="w-100" />
            </div>
          </a>
        </div>`; },
          }, 
      first_name: {
        title: 'First name',
        type: 'string',

      },
      last_name: {
        title: 'Last name',
        type: 'string',

      },
      gender: {
        title: 'Gender',
        type:'html',
        valuePrepareFunction: (gender:any) => {
          if(gender=='H') {
            return 'Male <i class="fa fa-male fa-xl text-primary"> </i>';

          }else {
            return 'Female <i class="fa fa-female fa-xl text-danger"> </i> ';

          }
        }  

      },

      email: {
        title: 'Email',
        type: 'string',
      },
      mobile_number: {
        title: 'Mobile Number',
        type: 'string',
      },
      home_adress: {
        title: 'Home Address',
        type: 'string',
      },
      member_since: {
        title: 'Member since',
        type: 'string',
      },

     
  
    },
  };
  alert=false;



  constructor(private service: UsersService) {
    this.users = new LocalDataSource();
    this.service.getAdmins().subscribe((data:any)=>{
      console.log(data);
      this.users.load(data['data']);

    });
 
  }

  
  ngOnInit(): void {
  }

}
