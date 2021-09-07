import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilisateurService } from '../../_shared/service/utilisateur.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{ 
 typeCnx;
  radio: any=["Banquier","Client"];
  loginForm: FormGroup;
submitted = false;
afficheImg:boolean;

returnUrl: string;
error: {};
loginError: string;


  constructor(private router: Router,private formBuilder: FormBuilder,private authService: UtilisateurService) {
    
}
  ngOnInit(): void {
    if (sessionStorage.getItem('nom')!=null) {
      switch (sessionStorage.getItem('type')){
        case "client": {
          this.router.navigate(['/client']);
          break;
        }
        case "admin": {
          this.router.navigate(['/admin']);
          break;
        }
        case "chefAgence": {
          this.router.navigate(['/chefAgence']);
          break;
        }
        case "caissier": {
          this.router.navigate(['/caissier']);
          break;
        }
      }

   }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      mdp:['', Validators.required]
    }
  );    
  this.afficheImg=false;
  }
  get f() { return this.loginForm.controls; }

radioevent(event: any){
  this.typeCnx=event.target.value;
}

onSubmit(data) {
  
  this.submitted = true;
  if(this.typeCnx!=null){ 
    this.afficheImg=false;
  }
  else{
  this.afficheImg=true;
  return;
  }

  this.authService.login(data.email, data.mdp,this.typeCnx).subscribe((data) => {
    console.log(this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) {
      switch (sessionStorage.getItem('type')){
        case "Client": {
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/client/accueil';
          this.router.navigate([redirect]);
            break;
        }
        case "admin": {
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin/accueil';
          this.router.navigate([redirect]);
          break;
        }
        case "chefAgence": {
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/chefAgence/accueil';
          this.router.navigate([redirect]);
              break;
        }
        case "caissier": {
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/caissier/accueil';
          this.router.navigate([redirect]);
              break;
        }
      }
     } else {
       this.submitted =false;
       this.loginError = 'identifiant ou mot de passe est incorrect'; 
     }
   },
   error =>{
     this.submitted =false;
     this.error = error ;
   }

 );

  }

 


onReset() {
  this.submitted = false;
  this.loginForm.reset();
}


}
