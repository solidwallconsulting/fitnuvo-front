import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersService } from '../../services/users.service';
import { ButtonViewComponent } from './button.component';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss'],
})
export class TrainersComponent implements OnInit {
  
  constructor(private service: UsersService,private router: Router) {
    this.users = new LocalDataSource();
    this.service.getAllTrainers().subscribe((data:any)=>{
      console.log(data);
      this.users.load(data['data']);

    });
 
  }

  showData(){
    console.log('here');
    this.service.getAllTrainers()
      .subscribe(resHerbsData => {
        console.log(this.users);
        this.users.load(resHerbsData)
        });
  }
  users:LocalDataSource;

  settings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [{ name: 'ourCustomAction', title: '<i class="fa fa-eye fa-xl"></i>' }],
      position: 'right'

    },
    columns: {
      trainer_id: {
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
            return 'Male <i class="fa fa-male fa-xl"> </i>';

          }else {
            return 'Female <i class="fa fa-female fa-xl"> </i> ';

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
    
      is_confirmed: {
        title: 'Account Status',
        type:'html',
        valuePrepareFunction: (is_confirmed:any) => {
          if(is_confirmed==1) {
            return '<div class="badge badge-light-success fw-bolder">Active </div>';

          }else {
            return '<div class="badge badge-light-danger fw-bolder">Desactive </div>';

          }
        }      
      },
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



  onCustomAction(event:any) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/admin/crafted/pages/profile/',event.data.trainer_id]);
  }

  
  ngOnInit(): void {
    this.users.refresh()
  }


  accountStatus(id:any) {
    console.log("amine",id);

  }

   handleUpdatedUser(updatedUserData: any) {
    // TODO is it possible to update only single row with update result instead of full table?
    this.users.refresh();
  }
}
