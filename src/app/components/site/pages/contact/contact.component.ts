import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactusService } from '../../services/contactus.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  mailForm: FormGroup;
  submitted = false;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,private ContactusService:ContactusService) { }
  get f() { return this.mailForm.controls; }

  onSubmit() {
  
    this.submitted = true;
    // stop here if form is invalid
    if (this.mailForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      
      // Initialize Params Object
       var myFormData = new FormData();
    
     // Begin assigning parameters
    
        myFormData.append('name', this.mailForm.value.name);
        myFormData.append('email', this.mailForm.value.email);
        myFormData.append('message', this.mailForm.value.message);

        myFormData.append('subject', this.mailForm.value.subject);
    
      //post request
      return this.ContactusService.addContact(myFormData).subscribe(
        (res) => {

               //sweetalert message popup
        Swal.fire({
          title: 'Thanks!',
          text:   "We have received your message and would like to thank you for writing to us , We will get back to you as soon as possibe.",
          icon: 'success'
        });


        console.log(res);
      }, (error) => {
        // handle error
        console.log("err : ",error);
 
       });
    }
   
  }

  ngOnInit() {
    //Mail User form validations
    this.mailForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    subject:['', [Validators.required]],
    message:['', [Validators.required]]

    });
  }

}
