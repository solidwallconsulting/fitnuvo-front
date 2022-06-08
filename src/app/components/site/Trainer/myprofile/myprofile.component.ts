import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ToastrService } from 'ngx-toastr';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyProfileComponent implements OnInit {
  p: number = 1;

  constructor(private reviewS: ReviewsService,private confirmBox: NgxBootstrapConfirmService,private toastrService:ToastrService, private appS:AppointmentsService) { }

  url:string=environment.urlServeur;
  myreviews:any;


  ngOnInit(): void {


    

    this.reviewS.getTrReviews().subscribe((data:any) => {
      this.myreviews = data['data'];
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })
  }




  cancelreport(id:any) {

      
    Swal.fire({  
      title: 'Are you sure want to unreport?',  
      text: 'You will cancel report of this review!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, back it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        
        
        
        this.reviewS.unreportReview(id).subscribe(
          (res) => {
            
            console.log("res : ",res);

            this.toastrService.success('Success!', 'Report was canceled!');
    
    
          }, (err: any) => {
            console.log(err)
          })

          this.ngOnInit();

      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your report is safe :)',  
          'error'  
        )  
      }  
    })  




  }

  report(id:any) {

    Swal.fire({  
      title: 'Are you sure want to report?',  
      text: 'You will report of this review!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, cancel it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        
        
        
        this.reviewS.reportReview(id).subscribe(
          (res) => {
            
            console.log("res : ",res);

            this.toastrService.success('Success!', 'Report was sent to administrator!');
    
    
          }, (err: any) => {
            console.log(err)
          })

          this.ngOnInit();

      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your report is canceled :)',  
          'error'  
        )  
      }  
    })  


  }

  counter(i: number) {
    return new Array(i);
  }

}

