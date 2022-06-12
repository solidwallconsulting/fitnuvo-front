import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/admin/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = "/";
  Role:any;


  constructor(public auth : AuthService) {}

  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      console.log('isauth',this.auth.getRole())
      this.Role=this.auth.getRole();
    
    }
  }
}
