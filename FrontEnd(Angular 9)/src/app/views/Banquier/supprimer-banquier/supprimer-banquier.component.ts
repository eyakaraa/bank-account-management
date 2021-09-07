import { Component, OnInit } from '@angular/core';

import { employer } from '../../../_shared/model/employer';
import { EmployerService } from '../../../_shared/service/employer.service';
import { CoolDialogService } from '@angular-cool/dialogs';

@Component({
  templateUrl: './supprimer-banquier.component.html'
})
export class SupprimerBanquierComponent implements OnInit {
  employers:employer[];
  retourApi:String;
  dataavailbale_allEmployers:boolean=false;
  config: any;
  constructor(private _dialogsService: CoolDialogService,private EmployerService:EmployerService) { }

  ngOnInit(): void {
    
     
    this.LoadData_AllEmployer();
  }


  LoadData_AllEmployer() {  
    this.EmployerService.getAllEmployer().subscribe((data) => {  
       
      this.employers=data;
      console.log(this.employers); 
      if (this.employers.length > 0) {  
        this.dataavailbale_allEmployers = true;  
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.employers.length};
      }  
      else {  
        this.dataavailbale_allEmployers = false;  
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
  async Supprimer(id:number){
    const result = await this._dialogsService.showDialog({
      titleText: 'Modifier Mot de passe',
      questionText: `Vous voulez valider la suppression de banquier : "${ id }"?`,
      confirmActionButtonText: 'valider',
      cancelActionButtonText: 'annuler',
    });
    
    if (result.isConfirmed) {
      

    this.EmployerService.SupprimeEmployer(id).subscribe((data) => {  
       
      this.retourApi=data;
      this.LoadData_AllEmployer(); 
    }  
    )  
      , erreur => {  
        console.log(erreur);  
      }  
    
    
  }
}
}
