import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'button-view',
  template: `
    <div *ngIf="valuee==0" class="d-flex flex-nowrap text-white" >
      <button type="button" class="btn btn-info mr-2" (click)="unlock()">
      <i class="fa-solid fa-unlock-keyhole"></i>
            </button>
  
    </div>

    <div *ngIf="valuee==1" class="d-flex flex-nowrap text-white" >
        <button type="button" class="btn btn-danger" (click)="lock()">
        <i class="fa-solid fa-key"></i>
                       </button>
     </div>
  `,
})

export class ButtonViewComponent implements ViewCell, OnInit {
  constructor( private toastrService: ToastrService,private service: UsersService,private ngxBootstrapConfirmService: NgxBootstrapConfirmService){}
  renderValue: string;

  valuee:any;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue =  '<' + this.value + '>';
    this.valuee=this.rowData.is_confirmed;
    console.log("aaaa",this.rowData) ;
    console.log("bbb",this.value);
    this.save.emit();
  }

  unlock() {
      let options ={
        title: 'Sure you want to unlock this account?',
        confirmLabel: 'Okay',
        declineLabel: 'Cancel'
      }
      console.log("amine",this.rowData.client_id)
      this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
        if (res) {

              this.service.activeAccount(this.rowData.client_id).subscribe(
                (res) => {
                  
                  console.log("res : ",res);
                  this.save.emit(this.rowData);
                  this.toastrService.success('Sucess!', 'Client Account was unlocked !');
          

                }, (err: HttpErrorResponse) => {
                  if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                  } else {
                    console.log("Server-side error occured.");
                  }
                });

        } else {
          console.log('Cancel');
        }
      });
    console.log('Deleting', this.rowData.id);
  }
  lock() {
   
    
    let options ={
      title: 'Sure you want to lock this account?',
      confirmLabel: 'Okay',
      declineLabel: 'Cancel'
    }
    console.log("amine",this.rowData.client_id)
    this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
      if (res) {

            this.service.DesacitveAccount(this.rowData.client_id).subscribe(
              (res) => {
                
                console.log("res : ",res);

                this.save.emit(this.rowData);
                this.toastrService.error('Ooh!', 'Client Account was locked !');
        
        
              }, (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log("Client-side error occured.");
                } else {
                  console.log("Server-side error occured.");
                }
              });

      } else {
        console.log('Cancel');
      }
    });
  console.log('Deleting', this.rowData.id);

  }

}
