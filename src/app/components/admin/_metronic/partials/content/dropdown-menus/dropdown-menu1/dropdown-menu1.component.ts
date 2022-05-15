import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/components/admin/services/users.service';

@Component({
  selector: 'app-dropdown-menu1',
  templateUrl: './dropdown-menu1.component.html',
})
export class DropdownMenu1Component implements OnInit {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  user:any;
  constructor(    private route: ActivatedRoute,private service: UsersService,private router: Router) {
  }
  ngOnInit(): void {

    this.route.params.subscribe(params =>  {

      this.service.getTrainer(params.id).subscribe((res:any) => {
        console.log(res);
        this.user = res['data'].is_confirmed;
      });
  });


  }
}
