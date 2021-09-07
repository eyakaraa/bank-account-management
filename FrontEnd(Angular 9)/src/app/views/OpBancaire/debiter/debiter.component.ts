import { Component, OnInit } from '@angular/core';
import { compte } from '../../../_shared/model/compte';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoolDialogService } from '@angular-cool/dialogs';
import { CompteService } from '../../../_shared/service/compte.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-debiter',
  templateUrl: './debiter.component.html',
})
export class DebiterComponent implements OnInit {

  Comptes:compte[];
  dataavailbale_allCompte:boolean=false;
  client:string;
  idCompte:number;
  debiterForm: FormGroup;
  modifForm:FormGroup;
  accepte:boolean=false;
  submitted = false;
  submitted2 =false;
  retourApi:String;
  constructor(private _dialogsService: CoolDialogService,private CompteService:CompteService,private formBuilder: FormBuilder,private formBuilder2: FormBuilder) { }

  ngOnInit(): void {

    this.debiterForm = this.formBuilder.group({
      numCarte: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(16),Validators.maxLength(16)]]         }
    );

    this.modifForm = this.formBuilder2.group({
      solde: ['',  [Validators.required,Validators.pattern('[0-9]*.[0-9]*')]]
         }
    ); 
  }
  get f() { return this.debiterForm.controls; }
  get ff() { return this.modifForm.controls; }

  async onSubmitmodif(data){
    this.submitted2=true;
    if (this.modifForm.invalid) {
      return;
  }

  const result = await this._dialogsService.showDialog({
    titleText: 'Debiter',
    questionText: `Vous voulez valider : "${ data.solde }"?`,
    confirmActionButtonText: 'valider',
    cancelActionButtonText: 'annuler',
  });
  
  if (result.isConfirmed) {

    cmp:compte;
    const cmp =new compte();
    cmp.id=this.idCompte;
    cmp.solde=data.solde;
   
    this.CompteService.debiter(cmp).subscribe((data) => {  
     
      this.retourApi=data;
      this.onReset();
      this.dataavailbale_allCompte=false;
timer(2500).subscribe((x) =>{this.accepte=false;});
 
    }  
    )  
      , erreur => {  
        console.log(erreur);  
      }  
    
    
  }

  }
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
    if (this.debiterForm.invalid) {
      return;
  }
this.client=data.numCarte;
  this.LoadData_AllCompte(this.client);
   
}
debiteritem(item:number){
this.idCompte=item;
this.accepte=true;
}
onReset() {
    this.submitted = false;
    this.debiterForm.reset();
}
onResetmodif(){
  this.submitted2 = false;
    this.modifForm.reset();
}

}
