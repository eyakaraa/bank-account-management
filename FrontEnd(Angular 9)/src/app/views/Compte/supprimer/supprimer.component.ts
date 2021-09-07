import { Component, OnInit } from '@angular/core';
import { compte } from '../../../_shared/model/compte';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompteService } from '../../../_shared/service/compte.service';
import { CoolDialogService } from '@angular-cool/dialogs';

@Component({
  selector: 'app-supprimer',
  templateUrl: './supprimer.component.html',
})
export class SupprimerComponent implements OnInit {
  Comptes:compte[];
  dataavailbale_allCompte:boolean=false;
  client:string;
  supForm: FormGroup;
  submitted = false;
  retourApi:String;
  constructor(private _dialogsService: CoolDialogService,private CompteService:CompteService,private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.supForm = this.formBuilder.group({
      numCarte: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(16),Validators.maxLength(16)]]         }
    );

  }

  get f() { return this.supForm.controls; }
  LoadData_AllCompte(client:string) {  
    this.CompteService.getAllCompte(client).subscribe((data) => {  
       
      this.Comptes=data;
      if (this.Comptes.length > 0) {  
        this.dataavailbale_allCompte = true;  
      }
      else {  
        this.dataavailbale_allCompte = false;  
      }  
     
    }  
    )  
      , erreur => {  
        console.log(erreur);  
      }  
    
    
  }

  onSubmit(data) {
     
    this.submitted = true;
    if (this.supForm.invalid) {
      return;
  }
this.client=data.numCarte;
  this.LoadData_AllCompte(this.client);
   
}

onReset() {
    this.submitted = false;
    this.supForm.reset();
}

async Supprimer(item:compte){

if((item.solde==0)&&(item.decouvert==0)){
  const result = await this._dialogsService.showDialog({
    titleText: 'Supprimer Compte',
    questionText: `Vous voulez valider la suppression de compte : "${ item.id }"?`,
    confirmActionButtonText: 'valider',
    cancelActionButtonText: 'annuler',
  });
  
  if (result.isConfirmed) {


    this.CompteService.SupprimerCompte(item.id).subscribe((data) => {  
     
      this.retourApi=data;
      this.LoadData_AllCompte(this.client);
      }  
    )  
      , erreur => {  
        console.log(erreur);  
      }  
    
    
  }
}
else {

  const result = await this._dialogsService.showDialog({
    titleText: 'Supprimer Compte',
    questionText: `Vous ne pouvez pas valider la suppression : solde ou/et découvert différent de 0`,
    confirmActionButtonText: 'valider',
  });
  

}


  
}

}
