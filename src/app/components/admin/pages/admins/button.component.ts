import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { EditPassComponent } from './modal-editpassword/editpassword.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'button-view',
  template: `
    <div  class="d-flex flex-nowrap text-white" >
      <button type="button" class="btn btn-info mr-2" (click)="openpasswordform(this.rowData.id)">
      <i class="fa-solid fa-right-to-bracket"></i>            </button>
  
    </div>

  
  `,
})

export class ButtonViewAComponent implements ViewCell, OnInit {
  constructor( private toastrService: ToastrService,private service: UsersService,private ngxBootstrapConfirmService: NgxBootstrapConfirmService,  private modalService: NgbModal){}

  
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



  openpasswordform(id:any) {
    const modalRef =  this.modalService.open(EditPassComponent);     
    
    modalRef.componentInstance.admin = id; 
  }

}
