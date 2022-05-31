import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { ContactusService } from 'src/app/services/contactus.service';

@Component({
  selector: 'app-contact-not',
  templateUrl: './contact-not.component.html',
})
export class ContactNotComponent {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  contacts:any=[];
  constructor(private service: ContactusService,private router: Router) {}

  ngOnInit(): void {
    this.service.get_unreadedcontacts().subscribe((data:any)=>{
      console.log(data);
      this.contacts = data['data'];

    });
  }

  onclick() {
    this.service.readAll().subscribe((data:any)=>{
      console.log(data);
      this.router.navigate(['/admin/features/contacts']);

    });

  }


}
