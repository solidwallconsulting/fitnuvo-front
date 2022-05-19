import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SpecialityService } from '../../services/speciality.service';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss'],
})
export class SpecialityComponent implements OnInit {
  settings = {

    add: {
      addButtonContent: '<i class="fa fa-4x fa-plus "></i>',
      createButtonContent: '<i class="fa fa-2x fa-check text-success"></i>&nbsp; ',
      cancelButtonContent: '<i class="fa fa-2x fa-remove text-danger"></i>',
      confirmCreate:true
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit text-warning "></i>&nbsp; &nbsp; ',
      saveButtonContent: '<i class="fa fa-2x fa-check text-success"></i>&nbsp;',
      cancelButtonContent: '<i class="fa fa-2x fa-remove text-danger"></i>',
      confirmSave:true

    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash text-danger "></i>',
      confirmDelete: true,
    },
    columns: {
      speciality_id: {
        title: 'ID',
        editable: false,
        addable: false,
        type: 'number',
      },
      speciality_name: {
        title: 'Speciality',
        type: 'string',
      },
      speciality_description: {
        title: 'Description',
        type: 'string',
      },
    },
  };
  specialities:any=[]
  alert=false;



  constructor(private service: SpecialityService, private toastrService: ToastrService,private ngxBootstrapConfirmService: NgxBootstrapConfirmService) {
    //const data = this.service.getAll();
    //this.specialities.load(data['data']);
 
  }

  
  ngOnInit(): void {
    this.service.getAll().subscribe((data:any)=>{
      console.log(data);
      this.specialities = data['data'];

    });
  }


  onDeleteConfirm(event:any): void {
    console.log(event.data);

    this.service.deleteCategorie(event.data.speciality_id).subscribe(
      (res) => {
        
        console.log("res : ",res);
        event.confirm.resolve(event.newData);
        //this.showToast("danger", "Sucess!", "Your Activity was deleted Successfuly!");
        this.toastrService.error('Ooh!', 'Sports Activity was deleted !');


      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  

  }

  onaction(event:any) {
      let options ={
        title: 'Sure you want to delete this activity?',
        confirmLabel: 'Okay',
        declineLabel: 'Cancel'
      }
      this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
        if (res) {
          this.onDeleteConfirm(event);

        } else {
          console.log('Cancel');
        }
      });
    }   



  onAddCategorie(event:any) {


    console.log("event",event);
    var data = {"name_spec" : event.newData.speciality_name,
    "desc_spec" : event.newData.speciality_description,
    };
    this.service.addCategorie(data).subscribe(
      (res) => {
        this.toastrService.success('Sucess!', 'New Activity Added Successfuly!');

        console.log("res : ",res);
        event.confirm.resolve(event.newData);

      }, (error) => {
       // handle error
       console.log("err : ",error);

      });
  
  }

  updateCategorie(event:any) {

    var data = {"name_spec" : event.newData.speciality_name,
    "desc_spec" : event.newData.speciality_description,
    "id" : event.newData.speciality_id,

    };
    this.service.updateCategorie(data).subscribe(
      (res) => {
        
        console.log("res : ",res);
        event.confirm.resolve(event.newData);
        //this.showToast("info", "Sucess!", "Your Activity Updated Successfuly!");
        this.toastrService.success('Sucess!', 'Sports Activity was Updated Successfuly!');


      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  
  }

  





}
