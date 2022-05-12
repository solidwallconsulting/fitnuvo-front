import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
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
      user_id: {
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
        type: 'string',

      },
      role: {
        title: 'Role ', 
        type:'html',
        valuePrepareFunction: (role:any) => {
          return '<div class="badge badge-light fw-bolder" > '+role.role_name +' </div>' ;
        },
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
      is_confirmed: {
        title: 'Account Confirmation',
        type:'html',
        valuePrepareFunction: (is_confirmed:any) => {
          if(is_confirmed==1) {
            return '<div class="badge badge-light-success fw-bolder">Confirmed </div>';

          }else {
            return '<div class="badge badge-light-danger fw-bolder">Unconfirmed </div>';

          }
        }      },
      is_visible: {
        title: 'Account Visibility',
        type:'html',
        valuePrepareFunction: (is_visible:any) => {
          if(is_visible==1) {
            return '<div class="badge badge-light-success fw-bolder">Visible </div>';

          }else {
            return '<div class="badge badge-light-danger fw-bolder">Invisible </div>';

          }
        }   
      },
     
  
    },
  };
  alert=false;



  constructor(private service: UsersService) {
    this.users = new LocalDataSource();
    this.service.getAll().subscribe((data:any)=>{
      console.log(data);
      this.users.load(data['data']);

    });
 
  }

  
  ngOnInit(): void {
  }

}
