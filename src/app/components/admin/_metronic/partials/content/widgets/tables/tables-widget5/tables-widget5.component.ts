import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/components/admin/services/users.service';

type Tabs =
  | 'kt_table_widget_5_tab_1'
  | 'kt_table_widget_5_tab_2'
  | 'kt_table_widget_5_tab_3';

@Component({
  selector: 'app-tables-widget5',
  templateUrl: './tables-widget5.component.html',
})
export class TablesWidget5Component implements OnInit {
  todayapp:any;
  weekapp:any;
  monthapp:any;
  constructor(private userS: UsersService) {}

  activeTab: Tabs = 'kt_table_widget_5_tab_1';

  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }

  ngOnInit(): void {

    this.userS.getDayAppointments().subscribe((data:any)=>{
      console.log("chy",data);
      this.todayapp = data['data'];

    })
    this.userS.getWeekAppointments().subscribe((data:any)=>{
      console.log("chy",data);
      this.weekapp = data['data'];

    })
    this.userS.getMonthAppointments().subscribe((data:any)=>{
      console.log("chy",data);
      this.monthapp = data['data'];

    })
  }
}
