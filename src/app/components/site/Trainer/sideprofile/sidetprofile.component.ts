import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidetprofile',
  templateUrl: './sidetprofile.component.html',
  styleUrls: ['./sidetprofile.component.scss']
})
export class SideTprofileComponent implements OnInit {
  url:string=environment.urlServeur;

  user:User= new User();
  photo:string="/assets/site/img/icon/Ellipse3.png";
  constructor(private authService: AuthentificationService) { }



  ngOnInit(): void {

      this.user=this.authService.getUser()!;
     
     if(this.user.photo_profil){
        this.photo=this.user.photo_profil;
     }

     console.log("test2",this.user);

  }

}
