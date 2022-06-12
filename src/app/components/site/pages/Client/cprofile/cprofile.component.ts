import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ToastrService } from 'ngx-toastr';
import Validation from 'src/app/components/admin/provides/CustomValidators';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ImagesService } from 'src/app/services/images.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../../../auth/register/register.component';
import { MustMatch } from '../../../auth/_helpers/must-match.validator';

@Component({
  selector: 'app-cprofile',
  templateUrl: './cprofile.component.html',
  styleUrls: ['./cprofile.component.scss']
})
export class CprofileComponent implements OnInit {

  //Forms
  profileCform: FormGroup;
  FormEditPass:FormGroup;
  FormImage:FormGroup;
  files:any;
  data:any;

 IsmodelShow= false;
 submitted = false;
 user:User= new User();
  photo="/assets/site/img/icon/Ellipse3.png";
  url:string=environment.urlServeur;


 
  constructor(private router:Router, private auth:AuthentificationService,private formBuilder: FormBuilder,private toastr : ToastrService, private trainerS:TrainerService,private ngxBootstrapConfirmService:NgxBootstrapConfirmService,private imageS : ImagesService) { }

  ngOnInit(): void {
    this.profileCform = this.formBuilder.group({
      firstname: ["", [ Validators.required,Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]],
      secondname: ["", [ Validators.required,Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]],
      email: ["",  [Validators.email,Validators.required]],
      gender: ["", [ Validators.required]],
      datebirth: ["", [ Validators.required]],
      phone: ["", [Validators.required,Validators.pattern("[0-9 ]{12}")]],
      adress: ["", [Validators.required]],

    }),

    this.FormEditPass = this.formBuilder.group({
      oldpwd: ["", [ Validators.required]],
      newpwd: ["", [Validators.required]],
      repeatpassword: ["", [Validators.required]],
 

    
    },
    
      {
        validators: [Validation.match('newpwd', 'repeatpassword')]
      }     
     
    ),
    this.FormImage = this.formBuilder.group({
      image: ["", [ Validators.required]],

    });

   


     this.auth.user().subscribe((data:any)=>{
      console.log("dataaa",data['user']);
      this.user=data['user'];
      console.log("dddd",this.user);

    });
    console.log("test",this.user);

    
  }

  get f() {
    return this.profileCform.controls;
  }
  get fpass(){
    return this.FormEditPass.controls;
  }

  



 // Register for a Client
 EditprofileClient(){
    
  //const email = this.formControl.email.value;
  // const password = this.formControl.password.value;

  this.submitted = true;

  if(this.profileCform.invalid){
  
  return;
  
  }



 console.log(this.profileCform.value);

 return this.trainerS.updateInfo(this.profileCform.value).subscribe((res: any) => {


  let item =JSON.parse(localStorage.getItem('user')!);
  item['firstname']=this.profileCform.value.firstname;
  item['secondname']=this.profileCform.value.secondname;

  item['email']=this.profileCform.value.email;
  item['gender']=this.profileCform.value.gender;
  item['datebirth']=this.profileCform.value.datebirth;
  item['phone']=this.profileCform.value.phone;
  item['adress']=this.profileCform.value.adress;

  localStorage.setItem('user', JSON.stringify(item));
   console.log(res);

   //this.router.navigate(['admin/crafted/account/overview']);
   Swal.fire({
     title: 'Success!',
     text:   "Profile details updated successfully .",
     icon: 'success'
   }).then(function() {

    window.location.reload();

   });

 },(err:any)=>{ 
   console.log(err);
 });


}


EditPassword(){

if(this.FormEditPass.invalid){
  
 return;
 
 }


return this.trainerS.changePwd(this.FormEditPass.value).subscribe((res: any) => {
 console.log(res);

 Swal.fire({
   title: 'Success!',
   text:   "Password updated successfully .",
   icon: 'success'
 });
 this.FormEditPass.reset();

},(err:any)=>{ 
 console.log("this",this.FormEditPass.value)

 Swal.fire({
   title: 'Error!',
   text:   err.error.message,
   icon: 'error'
 });
 console.log(err);
});

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

   this.ngOnInit();

 },(err: any) => {
   console.log("errapp",err)
   this.toastr.error(JSON.stringify(err.error.message),'',{
     timeOut:2000,
     progressBar:true
   })
 })
}


desactive() {



  
  Swal.fire({  
    title: 'Are you sure want to deactive?',  
    text: 'If you need to recover your account, please contact us!',  
    icon: 'warning',  
    showCancelButton: true,  
    confirmButtonText: 'Yes, deactive it!',  
    cancelButtonText: 'No, keep it'  
  }).then((result) => {  
    if (result.value) {  
      
      
      
      this.auth.DesacitveAccount(this.user.id).subscribe(
        (res) => {
          
          console.log("res : ",res);

          this.toastr.info('Oops!', 'Your Account was desactivated!');
  
  
          this.auth.islogout();

          window.location.reload();
        }, (err: any) => {
          console.log(err)
        })

        this.ngOnInit();

    } else if (result.dismiss === Swal.DismissReason.cancel) {  
      Swal.fire(  
        'Cancelled',  
        'Your account is safe :)',  
        'error'  
      )  
    }  
  })

}


}
