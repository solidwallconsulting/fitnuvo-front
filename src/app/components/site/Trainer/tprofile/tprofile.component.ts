import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ToastrService } from 'ngx-toastr';
import Validation from 'src/app/components/admin/provides/CustomValidators';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ImagesService } from 'src/app/services/images.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import { TrainerService } from 'src/app/services/trainer.service';
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
  certifications:any;
  achivements:any;

  //Forms
  profileCform: FormGroup;
  FormEditPass:FormGroup;
  FormImage:FormGroup;
  FormDesc:FormGroup;
  files:any;
  filescertif:any;
  myspecialities:any;

  data:any;
  newJson:JSON;
  hasError:boolean;


 IsmodelShow= false;
 submitted = false;
 user:User= new User();
  photo="notyet.png";

  settings = {

    actions: {
      add: false,
      edit: false,
      position: 'right',
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash text-danger "></i>',
      confirmDelete: true,
    },
    columns: {
      certification_name: {
        title: 'Description'
      },
      certification_image: {
        title: 'Certification file'
      },
  
    },
  };

  settings2 = {

    actions: {
      add: false,
      edit: false,
      position: 'right',

    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash text-danger "></i>',
      confirmDelete: true,
    },
    columns: {

      achivement_id: {
        title: 'Achivement description'
      },
      achivement_description: {
        title: 'Achivement description'
      },
    
  
    },
  };
 
  constructor(private router:Router, private auth:AuthentificationService,private trainerS:TrainerService,private ngxBootstrapConfirmService:NgxBootstrapConfirmService,private formBuilder: FormBuilder,private imageS : ImagesService,private specialityS:SpecialityService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.profileCform = this.formBuilder.group({
      firstname: ["", [ Validators.required,Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]],
      secondname: ["", [ Validators.required,Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]],
      email: ["",  [Validators.email,Validators.required]],
      gender: ["", [ Validators.required]],
      datebirth: ["", [ Validators.required]],
      phone: ["", [Validators.required,Validators.pattern("[0-9 ]{12}")]],
      adress: ["", [Validators.required]],
      experience: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.min(20), Validators.max(200),Validators.pattern("^[0-9]*$")]],

    }),
    this.FormDesc = this.formBuilder.group({
      description: ["", [ Validators.required]],
      certifname1: ["", [Validators.required]],
      certifup1: ["", [Validators.required]],
      achv: ["", [ Validators.required]],
      speciality :["", [ Validators.required]],

    
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





    

     this.certifications = new LocalDataSource();
     this.trainerS.mycertifications().subscribe((data:any)=>{
       console.log(data);
       this.certifications.load(data['data']);
 
       
     });

     this.achivements = new LocalDataSource();
     this.trainerS.myachivements().subscribe((data:any)=>{
       console.log(data);
       this.achivements.load(data['data']);
 
     });


     this.specialityS.getAll().subscribe((data:any)=>{
      console.log("dataaa",data['data']);
      this.myspecialities=data['data'];
      console.log("dddd",this.user);

    });


  }


  get f() {
    return this.profileCform.controls;
  }
  get fpass(){
    return this.FormEditPass.controls;
  }

  get fdesc(){
    return this.FormDesc.controls;
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
          console.log(res);
    
          //this.router.navigate(['admin/crafted/account/overview']);
          Swal.fire({
            title: 'Success!',
            text:   "Profile details updated successfully .",
            icon: 'success'
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



    Editdesc(){

   

      if(this.FormDesc.invalid){
         
        return;
        
        }

        const formDataa= new FormData();
        formDataa.append("certifup1",this.filescertif,this.filescertif.name);
        formDataa.append("certifname1",this.FormDesc.value.certifname1)
        formDataa.append("description",this.FormDesc.value.description)
        formDataa.append("achv",this.FormDesc.value.achv)
        formDataa.append("speciality",this.FormDesc.value.speciality)

  
  
        console.log("testss",formDataa)




        this.trainerS.EditProfileDesc(formDataa).subscribe((res:any) => {

         
         console.log("res",res);
         this.toastr.success(JSON.stringify(res.message),'',{
           timeOut:2000,
           progressBar:true
           
         });

         this.ngOnInit();

       },(err: any) => {
         console.log("errapp",err)
         this.toastr.error(err.error.message,'',{
           timeOut:2000,
           progressBar:true
         })
       })
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
        
    onresetformA(){
      return this.profileCform.reset();
      
    }


    uploadcertif(event:any){
      this.filescertif=event.target.files[0]
      console.log("file",this.filescertif)
    }



    onDeleteConfirm(event:any): void {
      console.log(event.data);
  
      this.trainerS.deleteAchv(event.data.achivement_id).subscribe(
        (res) => {
          
          console.log("res : ",res);
          event.confirm.resolve(event.newData);
          //this.showToast("danger", "Sucess!", "Your Activity was deleted Successfuly!");
          this.toastr.error('Achievement was deleted Successfuly !','',{
            timeOut:2000,
            progressBar:true});
  
  
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
    
  
    }

    onActiond(event:any) {
      console.log("cjls",event)

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
    


    onDeleteConfirmCertif(event:any): void {
      console.log(event.data);
  
      this.trainerS.deleteCertif(event.data.certification_id).subscribe(
        (res) => {
          
          console.log("res : ",res);
          event.confirm.resolve(event.newData);
          //this.showToast("danger", "Sucess!", "Your Activity was deleted Successfuly!");
          this.toastr.error('Certification was deleted Successfuly !','',{
            timeOut:2000,
            progressBar:true});
  
  
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
    
  
    }
    


    onActionCertif(event:any) {
      console.log("cjls",event)

      let options ={
        title: 'Sure you want to delete this review?',
        confirmLabel: 'Okay',
        declineLabel: 'Cancel'
      }
      this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
        if (res) {
          this.onDeleteConfirmCertif(event);

        } else {
          console.log('Cancel');
        }
      });
   
    }  


    
}
