import { Component, OnInit } from '@angular/core';
import { compte } from '../../../_shared/model/compte';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoolDialogService } from '@angular-cool/dialogs';
import { CompteService } from '../../../_shared/service/compte.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-crediter',
  templateUrl: './crediter.component.html',
})
export class CrediterComponent implements OnInit {
  Comptes:compte[];
  dataavailbale_allCompte:boolean=false;
  client:string;
  idCompte:number;
  crediterForm: FormGroup;
  modifForm:FormGroup;
  accepte:boolean=false;
  submitted = false;
  submitted2 =false;
  public typeCnx;

  retourApi:String;
  constructor(private _dialogsService: CoolDialogService,private CompteService:CompteService,private formBuilder: FormBuilder,private formBuilder2: FormBuilder) { }

  ngOnInit(): void {
this.typeCnx=sessionStorage.getItem("type");

    this.crediterForm = this.formBuilder.group({
      numCarte: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(16),Validators.maxLength(16)]]         }
    );
    if(this.typeCnx=='Client'){
    this.modifForm = this.formBuilder2.group({
      solde: ['',  [Validators.required,Validators.pattern('[0-9]*.[0-9]*')]],
      num:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(1),Validators.maxLength(1)]]
         }
    ); 
    this.f.numCarte.setValue(sessionStorage.getItem("numCarte"));
    this.f.numCarte.disable();
  }
    else{
      this.modifForm = this.formBuilder2.group({
        solde: ['',  [Validators.required,Validators.pattern('[0-9]*.[0-9]*')]]
           }
      );
    }

  }
  get f() { return this.crediterForm.controls; }
  get ff() { return this.modifForm.controls; }

  async onSubmitmodif(data){
    this.submitted2=true;
    if (this.modifForm.invalid) {
      return;
  }
  if(this.typeCnx=="Client"){

    const resultat = this.Comptes.find( elm => elm.id == data.num);
    console.log(resultat);
    if(resultat==null){
      const result = await this._dialogsService.showDialog({
        titleText: 'Crediter',
        questionText: `Verifer num compte: "${ data.num }"?`,
        confirmActionButtonText: 'valider',
        cancelActionButtonText: 'annuler',
      });
    }else{
    const result = await this._dialogsService.showDialog({
      titleText: 'Crediter',
      questionText: `Vous voulez valider : "${ data.solde }"?`,
      confirmActionButtonText: 'valider',
      cancelActionButtonText: 'annuler',
    });
    
    if (result.isConfirmed) {
  
      cmp:compte;
      const cmp =new compte();
      cmp.id=this.idCompte;
      cmp.solde=data.solde;
      cmp2:compte;
      const cmp2 =new compte();
      cmp2.id=data.num;
      cmp2.solde=data.solde;
  
  this.CompteService.debiter(cmp2).subscribe((data1) => {  
       console.log(data1);
    this.CompteService.crediter(cmp).subscribe((data) => {  
       
      this.retourApi=data;
      this.dataavailbale_allCompte=false;
  timer(2500).subscribe((x) =>{this.accepte=false;});
  
    }  
    )  
      , erreur => {  
        console.log(erreur);  
      } 
    
  
  }  
  )  
    , erreur => {  
      console.log(erreur);  
    }   
      
    }
    }

  }else{

    const result = await this._dialogsService.showDialog({
      titleText: 'Crediter',
      questionText: `Vous voulez valider : "${ data.solde }"?`,
      confirmActionButtonText: 'valider',
      cancelActionButtonText: 'annuler',
    });
    
    if (result.isConfirmed) {
  
      cmp:compte;
      const cmp =new compte();
      cmp.id=this.idCompte;
      cmp.solde=data.solde;
     
      this.CompteService.crediter(cmp).subscribe((data) => {  
       
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
    if (this.crediterForm.invalid) {
      return;
  }
this.client=data.numCarte;
  this.LoadData_AllCompte(this.client);
   
}
crediteritem(item:compte){
this.idCompte=item.id;
this.accepte=true;
}
onReset() {
    this.submitted = false;
    this.crediterForm.reset();
}
onResetmodif(){
  this.submitted2 = false;
    this.modifForm.reset();
}

}
/*
 */ 