import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ImagesService } from 'src/app/services/images.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { MustMatch } from '../../auth/_helpers/must-match.validator';

@Component({
  selector: 'app-tprofile',
  templateUrl: './tprofile.component.html',
  styleUrls: ['./tprofile.component.scss']
})
export class TprofileComponent implements OnInit {

  
  url:string=environment.urlServeur;
  //Forms
  profileCform: FormGroup;
  FormEditPass:FormGroup;
  FormImage:FormGroup;
  FormDesc:FormGroup;
  files:any;
  data:any;
  newJson:JSON;

 IsmodelShow= false;
 submitted = false;
 user:User;
  photo="/assets/site/img/icon/Ellipse3.png";


 
  constructor(private router:Router, private auth:AuthentificationService,private formBuilder: FormBuilder,private imageS : ImagesService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.profileCform = this.formBuilder.group({
      firstname: ["", [ Validators.required]],
      secondname: ["", [ Validators.required]],
      email: ["",  [Validators.email,Validators.required]],
      gender: ["", [ Validators.required]],
      datebirth: ["", [ Validators.required]],
      phone: ["", [Validators.required,Validators.pattern("[0-9 ]{12}")]],
      adress: ["", [Validators.required]],
      experience: ["", [Validators.required]],

      price: ["", [Validators.required]],
      activities: ["", [Validators.required]],


    
    }),
    this.FormDesc = this.formBuilder.group({
      description: ["", [ Validators.required]],
      password: ["", [Validators.required]],
      repeatpassword: ["", [Validators.required]],
 

    
    }),

    this.FormEditPass = this.formBuilder.group({
      oldpassword: ["", [ Validators.required]],
      password: ["", [Validators.required]],
      repeatpassword: ["", [Validators.required]],
 

    
    },
    {
      validator: MustMatch('password', 'repeatpassword')
    }
    ),
    this.FormImage = this.formBuilder.group({
      image: ["", [ Validators.required]],

    });

    this.user = this.auth.getUser()!;
    console.log("test",this.user);
     if(this.user.photo_profil){
        this.photo=this.user.photo_profil;
        
     } 


    
  }

  get formControl() {
    return this.profileCform.controls;
  }


  // Register for a Client
  EditprofileClient(){
    
         //const email = this.formControl.email.value;
         // const password = this.formControl.password.value;

         this.submitted = true;

         if(this.profileCform.invalid){
         
         return;
         
         }
     
        // Initialize Params Object
        var myFormData = new FormData();
      
      // Begin assigning parameters
      
      myFormData.append('firstname', this.formControl.firstname.value);
      myFormData.append('secondname', this.formControl.secondname.value);
      myFormData.append('email', this.formControl.email.value);
      myFormData.append('gender', this.formControl.gender.value);
      myFormData.append('datebirth', this.formControl.datebirth.value);
      myFormData.append('password', this.formControl.password.value);
      myFormData.append('phone', this.formControl.phone.value);
      myFormData.append('adress', this.formControl.adress.value);
      myFormData.append('role', 'client');



      return this.auth.register(myFormData).subscribe((res: any) => {
          console.log(res);
            //sweetalert message popup
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'you has been registered successfully',
              showConfirmButton: false,
              timer: 5000
            })
            //this.registerFormC.reset();

          
      },(err)=>{ 
        console.log(err);

      });
      

    }


    EditPassword(){

    }
    uploadImage(event:any){
      this.files=event.target.files[0]
      console.log("file",this.files)
    }
    EditImage(){

      
         this.submitted = true;

         if(this.FormImage.invalid){
         
         return;
         
         }

         const formData= new FormData();
         formData.append("image",this.files,this.files.name)


         this.imageS.EditProfileImage(formData).subscribe((res:any) => {

          let item =JSON.parse(localStorage.getItem('user')!);
          item['photo_profil']=this.files.name;
          localStorage.setItem('user', JSON.stringify(item));
          
          this.data = res;
          console.log("res",res);
          this.toastr.success(JSON.stringify(this.data.message),'',{
            timeOut:2000,
            progressBar:true
            
          });
          window.location.reload();


        },(err: any) => {
          console.log("errapp",err)
          this.toastr.error(JSON.stringify(err.error.message),'',{
            timeOut:2000,
            progressBar:true
          })
        })
    }
        
    onresetformA(){
      return this.profileCform.reset();
      
    }




    
}
