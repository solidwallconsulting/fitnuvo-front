import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
@Injectable()
export class ProfileComponent implements OnInit {
  url:string=environment.urlServeur;

  user:any;
  id:any;
  constructor( private route: ActivatedRoute,private service: UsersService,private router: Router) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];


      this.service.getTrainer(this.id).subscribe((res:any) => {
        console.log(res);
        this.user = res['data'];
      }, (err) => {
        console.log(err)
      });



  }

  
}
