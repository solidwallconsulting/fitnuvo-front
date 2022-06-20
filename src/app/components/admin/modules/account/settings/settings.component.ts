import { Component } from '@angular/core';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  constructor(private auth : AuthService) {}


  Role:any;

  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      console.log('isauth',this.auth.getRole())
      this.Role=this.auth.getRole();
    
    }
  }
  
}
