import { Component, OnInit } from '@angular/core';
import { employer } from '../../_shared/model/employer';
import { EmployerService } from '../../_shared/service/employer.service';

@Component({
  selector: 'app-caissier-dagence',
  templateUrl: './caissier-dagence.component.html',
})
export class CaissierDAgenceComponent implements OnInit {

  Caissiers:employer[];
  dataavailbale_allCaissier:boolean=false;
  config: any;
 
  constructor(private EmployerService:EmployerService) { }

  ngOnInit(): void {
       
    this.LoadData_AllCaissier();
  }

  LoadData_AllCaissier(){
    const id=Number.parseInt(sessionStorage.getItem('id'));
    this.EmployerService.GetCaissierAgence(id).subscribe((data) => {  
       
      this.Caissiers=data;
      if (this.Caissiers.length > 0) {  
        this.dataavailbale_allCaissier = true;  
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.Caissiers.length};
      }  
      else {  
        this.dataavailbale_allCaissier = false;  
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
