import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { User } from 'src/app/models/user.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { PaymentService } from 'src/app/services/payment.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pay-appointmentc',
  templateUrl: './pay-appointmentc.component.html',
  styleUrls: ['./pay-appointmentc.component.scss']
})
export class PayAppointmentCComponent  {
  @Input() inputappointment_id: any;
  @Input() amount: any;

  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;

  title = 'stripeAngular';

  //Declare dummy data
  id: string = '123';
  name: string = 'powerbike';
  email: string = 'nelsob44@yahoo.com';
  price: number = 1200;
  currency: string = 'gbp';
  description: string = 'A very good appointment';
  private paymentIntentSub: Subscription;

  stripe:any;
  loading = false;
  confirmation:any;
  clSecret: any = null;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: any;
  appointment:any;
  user:User;

  constructor(
    private cd: ChangeDetectorRef,
    private appService: PaymentService,
    private router: Router,
    private stripeService:AngularStripeService,private AppointService:AppointmentsService,private authService: AuthentificationService) {

      /** 
      this.AppointService.getOneappByIdFromClient(this.inputappointment_id).subscribe((data:any) => {
        console.log('refch',data)
        this.appointment = data['data'];
      },(err: any) => {
        console.log(err)
      }) */

      this.user = this.authService.getUser()!;

    }

  ngAfterViewInit() {
    const stripePubKey = environment.publishableKeyStripe;
    this.stripeService.setPublishableKey(stripePubKey).then(
      stripe=> {
        this.stripe = stripe;
    const elements = stripe.elements();    
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    });
  }

  
  onChange( error:any ) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Success!', token);
      await this.onClickStripe(form);
    }
  }

  onClickStripe(form: NgForm) {
    return this.paymentIntentSub = this.appService.addPaymentIntentStripe(
      this.inputappointment_id,
      this.name,
      this.user.email,
      this.amount,
      this.currency,
      this.description
    ).pipe(
      switchMap(intent => {
        this.clSecret = intent.intent.client_secret;
        return this.appService.storePaymentIntent( 
          this.inputappointment_id, 
          this.name,
          this.user.email,
          this.amount,
          this.currency,
          this.description,
          intent.intent.id    
        );
      })      
    ).subscribe(() => {
      this.stripe.confirmCardPayment(this.clSecret, {
        receipt_email: this.user.email,
          payment_method: {
            card: this.card,
            billing_details: {
              name: this.name,
              email: this.user.email
            }
          }
      }).then((res:any) => {
        console.log(res);
        if(res.paymentIntent && res.paymentIntent.status === "succeeded") {

          Swal.fire({
            title: 'Success!',
            text:   "Appointment paid successfully.",
            icon: 'success'
            
          }
          ).then((result) => {
            // Reload the Page
            form.reset();

            window.location.reload();
          });
         
        } else {
          const errorCode = res.error.message;
          alert(errorCode);
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.paymentIntentSub) {
      this.paymentIntentSub.unsubscribe();      
    }
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
}
