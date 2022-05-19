import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { AuthService, UserType } from '../../../../../../modules/auth';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  users:any;
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.auth.getUserByToken().subscribe((data:any)=>{
      console.log("dataaa",data['user']);
      this.users=data['user'];

    });
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }



  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}




