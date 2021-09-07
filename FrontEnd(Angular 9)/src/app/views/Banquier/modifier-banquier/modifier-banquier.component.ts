import { Component, OnInit } from '@angular/core';
import { employer } from '../../../_shared/model/employer';
import { EmployerService } from '../../../_shared/service/employer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  templateUrl: './modifier-banquier.component.html'
})
export class ModifierBanquierComponent implements OnInit {

  accepteModif:boolean=false;
  employers:employer[];
  retourApi:String;
  dataavailbale_allEmployers:boolean=false;
  config: any;
radio: any=["chefAgence","caissier"];
radioselect :boolean=false;
modifForm: FormGroup;
submitted = false;
supId:number;
type;
afficheImg:boolean;
IdEmpModif:number;
  constructor(private EmployerService:EmployerService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.LoadData_AllEmployer();
    this.modifForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      prenom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      tel: ['',[Validators.required,Validators.pattern('[0-9]*'),,Validators.minLength(8),Validators.maxLength(8)]],
      sup: ['',  Validators.required]
    }
  );    
  this.afficheImg=false;
  }

  get f() { return this.modifForm.controls; }
  
  radioevent(event: any){
    this.type=event.target.value;
    if(event.target.value=="caissier"){
      this.radioselect=true;
      this.supId=null;
    }else{
      this.radioselect=false;
      this.supId=1;
    }
    console.log(this.radioselect);

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
  modifier(item:employer){
this.f.nom.setValue(item.nom);
this.f.prenom.setValue(item.prenom);
this.f.sup.setValue(item.superieur);
this.f.tel.setValue(item.tel);

this.IdEmpModif=item.id;
    this.accepteModif=true;

  }
    
  addSup(id : number){
    this.supId=id;
    
   }
   onSubmit(data) {
   
     this.submitted = true;
     emp:employer ;
     const emp =new employer();
    
     if(emp.type!=null){ this.afficheImg=false;
     }
     else{
       this.afficheImg=true;
     }
     if ((this.modifForm.invalid)||(this.type==null)) {
      return;
  }
      emp.id=this.IdEmpModif;
     emp.nom=data.nom;
     emp.prenom=data.prenom;
     emp.tel=data.tel;
     emp.superieur=data.sup;
     emp.type=this.type;
     emp.superieur=this.supId;
 
 
        
       this.EmployerService.ModifierEmployer(emp).subscribe((data) => {  
        
         this.retourApi=data;
         this.onReset();
         this.LoadData_AllEmployer(); 
timer(1500).subscribe((x) =>{this.accepteModif=false;});
        
       }  
       )  
         , erreur => {  
           console.log(erreur);  
         }  
       
 
 
     
   
    
     
 
 }
 
 onReset() {
     this.submitted = false;
     this.modifForm.reset();
 }


}
