import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SpecialityService } from '../../services/speciality.service';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ContactusService } from 'src/app/components/site/services/contactus.service';

@Component({
  selector: 'app-website-contacts',
  templateUrl: './website-contacts.component.html',
  styleUrls: ['./website-contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      contact_id: {
        title: 'ID',
        editable: false,
        addable: false,
        type: 'number',
      },
      name: {
        title: 'From',
        type: 'string',
      },
      subject: {
        title: 'Subject',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      message: {
        title: 'Message Content',
        type: 'string',
      },
      created_at: {
        title: 'Received_at',
        type: 'string',
      },
    },
  };
  contacts:any=[]
  alert=false;



  constructor(private service: ContactusService) {
    //const data = this.service.getAll();
    //this.specialities.load(data['data']);
 
  }

  
  ngOnInit(): void {
    this.service.getAll().subscribe((data:any)=>{
      console.log(data);
      this.contacts = data['data'];

    });
  }


  





}
