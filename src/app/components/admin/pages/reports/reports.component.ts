import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ReviewsService } from '../../services/reviews.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './Reports.component.html',
  styleUrls: ['./Reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      edit: false,
      custom: [{ name: 'ourCustomAction', title: '<i class="fa fa-eye fa-xl"></i>&nbsp;  ' }],
      position: 'right'

    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash text-danger "></i>',
      confirmDelete: true,
    },
    columns: {
      review_id: {
        title: 'ID',
        editable: false,
        addable: false,
        type: 'number',
      },
      stars: {
        title: 'Stars',
        type:'html',
        valuePrepareFunction: (stars:any) => {
          let msg=""
          for (let index = 0; index < stars; index++) {

            msg= msg + ' <i class="fa fa-star text-warning" > </i> ';
          }
          return msg ;
 
        }  

      },
      comment: {
        title: 'Comment',
        type: 'string',
      },



      client: {
        title:"Review From ",
        valuePrepareFunction: (client:any) => {
            return client.first_name + " " +client.last_name;
        }
      },
      trainer: {
        title:"Report From ",
        valuePrepareFunction: (trainer:any) => {
            return trainer.first_name + " " +trainer.last_name;
        }
      },
    },
  };
  reviews:any=[]
  alert=false;



  constructor(private service: ReviewsService,private router: Router , private toastrService: ToastrService,private ngxBootstrapConfirmService: NgxBootstrapConfirmService) {
    //const data = this.service.getAll();
    //this.specialities.load(data['data']);
 
  }

  
  ngOnInit(): void {
    this.service.getAll().subscribe((data:any)=>{
      console.log(data);
      this.reviews = data['data'];

    });
  }


  onDeleteConfirm(event:any): void {
    console.log(event.data);

    this.service.deleteReview(event.data.review_id).subscribe(
      (res) => {
        
        console.log("res : ",res);
        event.confirm.resolve(event.newData);
        //this.showToast("danger", "Sucess!", "Your Activity was deleted Successfuly!");
        this.toastrService.error('Ooh!', 'Review was deleted Successfuly !');


      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  

  }

  onCustomAction(event:any) {
    console.log("ev",event.data.trainer);
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/admin/crafted/pages/profile/'+event.data.trainer.trainer_id+'/reviews/'+event.data.trainer.trainer_id]);
  }

  onaction(event:any) {
      let options ={
        title: 'Sure you want to delete this review?',
        confirmLabel: 'Okay',
        declineLabel: 'Cancel'
      }
      this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
        if (res) {
          this.onDeleteConfirm(event);

        } else {
          console.log('Cancel');
        }
      });
    }   






  





}
