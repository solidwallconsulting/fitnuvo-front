import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { IconUserModel } from '../../../_metronic/partials';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
})
export class SpecialitiesComponent implements OnInit { 
  specialities:any;
  id:any;
  constructor( private route: ActivatedRoute,private service: UsersService,private router: Router) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("****",this.id)


      this.service.getTrainer(this.id).subscribe((res:any) => {
        console.log(res);
        this.specialities = res['data'].trainer_specialities;
      }, (err) => {
        console.log(err);
      });



  }

}
