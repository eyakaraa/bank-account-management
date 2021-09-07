import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployerService } from '../../../_shared/service/employer.service';
import { UtilisateurService } from '../../../_shared/service/utilisateur.service';
import { employer } from '../../../_shared/model/employer';
import { client } from '../../../_shared/model/client';
import { ClientService } from '../../../_shared/service/client.service';
import { CoolDialogService } from '@angular-cool/dialogs';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
})
export class AuthentificationComponent implements OnInit {

  retourApi:String;
modifForm: FormGroup;
modifClientForm:FormGroup;
submitted = false;
public typeCnx;
clt:client;
emp:employer;
  constructor(private _dialogsService: CoolDialogService,private ClientService:ClientService,private utilisateur:UtilisateurService,private EmployerService:EmployerService,private formBuilder: FormBuilder,private formBuilderClt: FormBuilder) { }
 
 
  ngOnInit(): void {
    this.modifClientForm=this.formBuilderClt.group({
      mdp: ['', Validators.required]
     
     });
  
      this.modifForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        mdp: ['', Validators.required]
          }
    ); 

    this.typeCnx=sessionStorage.getItem("type");
    if(this.typeCnx=="Client"){
     this.clt=this.utilisateur.getutilisateurClient();
    
    }else{
      this.emp=this.utilisateur.getutilisateurEmp();
      this.f.email.setValue(this.emp.login);
         
    }

  
  }
  async onSubmitClient(data){
    this.submitted=true;
    if (this.modifClientForm.invalid) {
      return;
  }


    clt1:client;
    const clt1=new client();
    clt1.numCarte=this.clt.numCarte;
    clt1.mdp=data.mdp;


      const result = await this._dialogsService.showDialog({
        titleText: 'Modifier Mot de passe',
        questionText: `Vous voulez valider ce mot de passe : "${ clt1.mdp }"?`,
        confirmActionButtonText: 'valider',
        cancelActionButtonText: 'annuler',
      });
      
      if (result.isConfirmed) {
        

        this.ClientService.ModifierAuthClient(clt1).subscribe((data) => {  
        
          this.retourApi=data;
          this.onReset();
       }
             
          
        )  
          , erreur => {  
            console.log(erreur);  
          }  
        
      
    



      }
  
  
    


  }
  async onSubmitEmp(data){
    this.submitted=true;
    if (this.modifForm.invalid) {
      return;
  }

    emp1:employer ;
     const emp1 =new employer();
     emp1.id=this.emp.id;
     emp1.login=data.email;
     emp1.mdp=data.mdp;
    
    

     const result = await this._dialogsService.showDialog({
      titleText: 'Modifier Mot de passe',
      questionText: `Vous voulez valider ce mot de passe : "${ emp1.mdp }"?`,
      confirmActionButtonText: 'valider',
      cancelActionButtonText: 'annuler',
    });
    
    if (result.isConfirmed) {
      

      this.EmployerService.ModifierAuthEmp(emp1).subscribe((data) => {  
      
        this.retourApi=data;
        this.onReset();
        sessionStorage.setItem('mail',emp1.login);

     }
           
        
      )  
        , erreur => {  
          console.log(erreur);  
        }  
      
    
  



    }
 
  }

  onReset() {
    this.submitted = false;
    if(this.typeCnx=="Client"){
     this.modifClientForm.reset();
    }else{
     this.modifForm.reset();
    }}

    get f() { if(this.typeCnx=="Client"){
      return this.modifClientForm.controls;
    }else{
      return this.modifForm.controls;
    } 
       }
}
