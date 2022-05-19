import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersService } from '../../services/users.service';
import { ButtonViewComponent } from './button.component';

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
      client_id: {
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
      is_confirmed: {
        title: 'Account Status',
        type:'html',
        valuePrepareFunction: (is_confirmed:any) => {
          if(is_confirmed==1) {
            return '<div class="badge badge-light-success fw-bolder">Active</div>';

          }else {
            return '<div class="badge badge-light-danger fw-bolder">Desactive </div>';

          }
        }      
      },
      member_since: {
        title: 'Member since',
        type: 'string',
      },
      Buttons: {
        title: 'Accounts Management',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance:any) {
          instance.save.subscribe((row:any) => {
          });
        }
      
      },


     
  
    },
  };
  alert=false;



  constructor(private service: UsersService) {
    this.users = new LocalDataSource();
    this.service.getAllClients().subscribe((data:any)=>{
      console.log(data);
      this.users.load(data['data']);

    });
 
  }

  
  ngOnInit(): void {
  }

  accountStatus(id:any) {
    console.log("amine",id)

  }

}
