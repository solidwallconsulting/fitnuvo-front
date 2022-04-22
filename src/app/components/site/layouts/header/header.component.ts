import { Component, OnInit } from '@angular/core';
import Popper from "popper.js";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  closeResult = '';
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openLoginForm(): void {
    const modalRef = this.modalService.open(LoginComponent); 
   }

   openRegisterForm(): void {
    const modalReff = this.modalService.open(RegisterComponent); 
   }

  
  
}
