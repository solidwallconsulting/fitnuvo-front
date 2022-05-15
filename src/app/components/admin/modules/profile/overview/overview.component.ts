import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent {
  user:any;
  id:any;
  constructor( private route: ActivatedRoute,private service: UsersService,private router: Router) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("****",this.id)


      this.service.getTrainer(this.id).subscribe((res:any) => {
        console.log(res);
        this.user = res['data'];
      }, (err) => {
        console.log(err);
      });



  }
}
