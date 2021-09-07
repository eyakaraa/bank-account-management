import { Component, OnInit } from '@angular/core';
import { compte } from '../../../_shared/model/compte';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { historique } from '../../../_shared/model/historique';
import { CompteService } from '../../../_shared/service/compte.service';
import { HistoriqueService } from '../../../_shared/service/historique.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
})
export class HistoriqueComponent implements OnInit {

  Comptes:compte[];
  historiques:historique[]
  dataavailbale_allCompte:boolean=false;
  dataavailbale_allHistorique:boolean=false;
  client:string;
  idCompte:number;
  config: any;
  historiqueForm: FormGroup;
  submitted = false;
  retourApi:String;
  public typeCnx;
  constructor(private CompteService:CompteService,private historiqueService:HistoriqueService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.typeCnx=sessionStorage.getItem("type");
    this.historiqueForm = this.formBuilder.group({
      numCarte: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(16),Validators.maxLength(16)]]         }
    );
    if(this.typeCnx=='Client'){
      this.f.numCarte.setValue(sessionStorage.getItem("numCarte"));
      this.f.numCarte.disable();
  
    }
  }
  get f() { return this.historiqueForm.controls; }
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
    if (this.historiqueForm.invalid) {
      return;
  }
this.client=data.numCarte;
  this.LoadData_AllCompte(this.client);
   
}
onReset() {
  this.submitted = false;
  this.historiqueForm.reset();
}
getHistorique(id:number){
  this.idCompte=id;
  this.historiqueService.getAllHistorique(id).subscribe((data) => {  
       
    this.historiques=data;
    console.log(this.historiques);
    if (this.historiques.length > 0) {  
      this.dataavailbale_allHistorique= true;  
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.historiques.length};
    }  
    
    else {  
      this.dataavailbale_allHistorique= false;  
    }  
   
  }  
  )  
    , erreur => {  
      console.log(erreur);  
    }  
  
  
}
pageChanged(event){
  this.config.currentPage = event;
}
}
