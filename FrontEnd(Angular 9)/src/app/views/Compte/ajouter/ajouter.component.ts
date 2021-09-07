import { Component, OnInit } from '@angular/core';
import { compte } from '../../../_shared/model/compte';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompteService } from '../../../_shared/service/compte.service';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
})
export class AjouterComponent implements OnInit {

  Comptes:compte[];
  dataavailbale_allCompte:boolean=false;
  config: any;
  client:string;
  ajoutForm: FormGroup;
  submitted = false;
  retourApi:String;
  constructor(private CompteService:CompteService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ajoutForm = this.formBuilder.group({
    numCarte: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(16),Validators.maxLength(16)]],
    solde: ['',  [Validators.required,Validators.pattern('[0-9]*.[0-9]*')]]
       }
  );    
  }

  get f() { return this.ajoutForm.controls; }
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
    this.LoadData_AllCompte(this.client); 
    this.submitted = true;
    cmp:compte;
    const cmp =new compte();
    
    if (this.ajoutForm.invalid) {
      return;
  }
    cmp.decouvert=0;
    cmp.solde=data.solde;
    cmp.client=data.numCarte;
    this.client=data.numCarte;
  
      this.CompteService.AddCompte(cmp).subscribe((data) => {  
       
        this.retourApi=data;
        this.onReset();
        
       
      }  
      )  
        , erreur => {  
          console.log(erreur);  
        }  
      


    
  
   
    

}

onReset() {
    this.submitted = false;
    this.ajoutForm.reset();
}


}
