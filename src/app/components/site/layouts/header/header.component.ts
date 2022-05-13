import { Component, OnInit } from '@angular/core';
import Popper from "popper.js";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  closeResult = '';
  isAuth:boolean =false;
  user:User;
  photo="/assets/site/img/icon/Ellipse3.png";
  constructor(private router:Router,private modalService: NgbModal, private authService: AuthentificationService) { }

  ngOnInit(): void {
   this.isAuth= this.authService.isAuthenticated();
   if(this.isAuth)
   {
     this.user = this.authService.getUser()!;
     if(this.user.photo_profil){
        this.photo=this.user.photo_profil;
     }
   }
  }
  goToprofile(): void {
    this.router.navigate(['/user/profile']);
  }
  openLoginForm(): void {
    const modalRef = this.modalService.open(LoginComponent); 
   }

   openRegisterForm(): void {
    const modalReff = this.modalService.open(RegisterComponent); 
   }
   logout(): void {
    this.authService.islogout();
    this.router.navigate(['/']);
   }
   

  
  
}
