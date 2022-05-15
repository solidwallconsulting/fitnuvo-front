import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
})
export class ReviewsComponent {
  reviews:any;
  id:any;
  constructor( private route: ActivatedRoute,private service: UsersService,private router: Router) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];


      this.service.getTrainer(this.id).subscribe((res:any) => {
        console.log(res);
        this.reviews = res['data'].trainer_reviews;
      }, (err) => {
        console.log(err);
      });



  }


}
