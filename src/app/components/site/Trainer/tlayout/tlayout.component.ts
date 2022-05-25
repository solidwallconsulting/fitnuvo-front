import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-tlayout',
  templateUrl: './tlayout.component.html',
  styleUrls: ['./tlayout.component.scss']
})
export class TlayoutComponent implements OnInit {

  visible:number;
  constructor(private auth:AuthentificationService) { }

  ngOnInit(): void {
    this.visible = this.auth.getVisible()!;

  }

}
