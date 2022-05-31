import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
})
export class AppointmentsComponent {
  appointments:any;
  id:any;
  constructor( private route: ActivatedRoute,private service: UsersService,private router: Router) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("****",this.id)


      this.service.getTrainer(this.id).subscribe((res:any) => {
        console.log(res);
        this.appointments = res['data'].trainer_appointments!;
      }, (err) => {
        console.log(err);
      });



  }
}
