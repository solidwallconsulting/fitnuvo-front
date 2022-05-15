import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
})
export class ImagesComponent {
  images:any;
  id:any;
  constructor( private route: ActivatedRoute,private service: UsersService,private router: Router) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("****",this.id)


      this.service.getTrainer(this.id).subscribe((res:any) => {
        console.log(res);
        this.images = res['data'].trainer_images;
      }, (err) => {
        console.log(err);
      });



  }
}
