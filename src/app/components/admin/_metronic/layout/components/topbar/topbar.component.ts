import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/admin/services/auth.service';
import { ContactusService } from 'src/app/services/contactus.service';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})

export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  contacts:any=[];
  role:string;
  sMet:any;

  constructor(private layout: LayoutService,private service: ContactusService,public authservice: AuthService) {

  }

  ngOnInit(): void {

    this.headerLeft = this.layout.getProp('header.left') as string;

    this.service.get_unreadedcontacts().subscribe((data:any)=>{
      console.log(data);
      this.contacts = data['data'];

    });
    


  }


  


}
