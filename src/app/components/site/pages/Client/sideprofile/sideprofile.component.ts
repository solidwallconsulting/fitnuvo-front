import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sideprofile',
  templateUrl: './sideprofile.component.html',
  styleUrls: ['./sideprofile.component.scss']
})
export class SideprofileComponent implements OnInit {

  user:User;
  photo:string="/assets/site/img/icon/Ellipse3.png";
  url:string=environment.urlServeur;

  constructor(private authService: AuthentificationService) { }



  ngOnInit(): void {
    this.user = this.authService.getUser()!;
     if(this.user.photo_profil){
        this.photo=this.user.photo_profil;
     }

     console.log("test2",this.user);

  }

}
