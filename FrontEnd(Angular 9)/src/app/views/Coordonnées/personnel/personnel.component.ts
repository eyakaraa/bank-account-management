import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilisateurService } from '../../../_shared/service/utilisateur.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployerService } from '../../../_shared/service/employer.service';
import { client } from '../../../_shared/model/client';
import { employer } from '../../../_shared/model/employer';
import { controllers } from 'chart.js';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../_shared/service/client.service';


@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
})
export class PersonnelComponent implements OnInit {

  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;

  public typeCnx;

  
retourApi:String;
modifForm: FormGroup;
modifClientForm:FormGroup;
submitted = false;
supId:number;
afficheImg:boolean;
clt:client;
emp:employer;

  constructor(private calendar: NgbCalendar,private ClientService:ClientService,private utilisateur:UtilisateurService,private EmployerService:EmployerService,private formBuilder: FormBuilder,private formBuilderClt: FormBuilder) { }
 
  navigateEvent(event) {
    this.date = event.next;
  }
  
  
  ngOnInit(): void {
    this.modifClientForm=this.formBuilderClt.group({
      nom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      prenom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      tel: ['',[Validators.required,Validators.pattern('[0-9]*'),,Validators.minLength(8),Validators.maxLength(8)]],
      dp:['',Validators.required],
      email:['',[Validators.required,Validators.email]]
     });
  
      this.modifForm = this.formBuilder.group({
        nom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      prenom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      tel: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(8),Validators.maxLength(8)]],
        sup: ['',  Validators.required]
      }
    );    

    this.typeCnx=sessionStorage.getItem("type");
    if(this.typeCnx=="Client"){
     this.clt=this.utilisateur.getutilisateurClient();
     this.f.nom.setValue(this.clt.nom);
    this.f.prenom.setValue(this.clt.prenom);
    this.f.tel.setValue(this.clt.tel);
    this.f.email.setValue(this.clt.mail);
    
    }else{
      this.emp=this.utilisateur.getutilisateurEmp();
      this.f.nom.setValue(this.emp.nom);
      this.f.prenom.setValue(this.emp.prenom);
      this.f.sup.setValue(this.emp.superieur);
      this.f.tel.setValue(this.emp.tel);
     
    }

  
  this.afficheImg=false;
  }
  
 
   onSubmitClient(data){
    this.submitted=true;

    if (this.modifClientForm.invalid) {
      return;
  }

    clt1:client;
    const clt1=new client();
    clt1.numCarte=this.clt.numCarte;
    clt1.nom=data.nom;
    clt1.prenom=data.prenom;
    clt1.tel=data.tel;
    clt1.dateN=data.dp.year+"-"+data.dp.month+"-"+data.dp.day;
    clt1.mail=data.email;
    
 this.ClientService.ModifierClient(clt1).subscribe((data) => {  
        
         this.retourApi=data;
         this.onReset();
       
        sessionStorage.setItem('nom',clt1.nom);
        sessionStorage.setItem('prenom', clt1.prenom);
        sessionStorage.setItem('dateN', clt1.dateN);
        sessionStorage.setItem('tel', clt1.tel);
        sessionStorage.setItem('mail',clt1.mail);
      }
            
         
       )  
         , erreur => {  
           console.log(erreur);  
         }  
       
     


   }
   onSubmitEmp(data) {
   
    this.submitted=true;

      if ((this.modifForm.invalid)) {
        return;
  }

    emp1:employer ;
     const emp1 =new employer();
     emp1.id=this.emp.id;
     emp1.nom=data.nom;
     emp1.prenom=data.prenom;
     emp1.tel=data.tel;
     emp1.superieur=this.emp.superieur;
     emp1.type=this.emp.type;

     this.EmployerService.ModifierEmployer(emp1).subscribe((data) => {  
        
      this.retourApi=data;
      this.onReset();
    
      sessionStorage.setItem('nom',emp1.nom);
      sessionStorage.setItem('prenom', emp1.prenom);
      sessionStorage.setItem('tel', emp1.tel);
      sessionStorage.setItem('type',emp1.type);
      sessionStorage.setItem('sup',emp1.superieur.toString());

   }
         
      
    )  
      , erreur => {  
        console.log(erreur);  
      }  
    
     
 
 }
 
 onReset() {
     this.submitted = false;
     if(this.typeCnx=="Client"){
      this.modifClientForm.reset();
     }else{
      this.modifForm.reset();
     }
 }

 get f() { if(this.typeCnx=="Client"){
  return this.modifClientForm.controls;
}else{
  return this.modifForm.controls;
} 
   }


}
