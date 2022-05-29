import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesTComponent implements OnInit {

  visible:number;
  constructor(private auth:AuthentificationService) { }

  ngOnInit(): void {
    this.visible = this.auth.getVisible()!;

  }

}
