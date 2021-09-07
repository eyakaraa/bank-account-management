import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { client } from '../../../_shared/model/client';
import { NgbDatepicker, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../_shared/service/client.service';
import { CoolDialogService } from '@angular-cool/dialogs';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
})

export class AjouterComponent implements OnInit {

  
  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;


  
  retourApi:String;
  addClientForm:FormGroup;
  submitted = false;
  clt:client;
  constructor(private calendar: NgbCalendar,private _dialogsService: CoolDialogService,private ClientService:ClientService,private formBuilderClt: FormBuilder) { }
 

    
  navigateEvent(event) {
    this.date = event.next;
  }

  ngOnInit(): void {
    this.addClientForm=this.formBuilderClt.group({
      numCarte: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(16),Validators.maxLength(16)]],
      nom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      prenom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      tel: ['',[Validators.required,Validators.pattern('[0-9]*'),,Validators.minLength(8),Validators.maxLength(8)]],
      dp:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      mdp:['',Validators.required]
     });
  }
  async onSubmitClient(data){
    this.submitted=true;

    if (this.addClientForm.invalid) {
      return;
  }

    clt1:client;
    const clt1=new client();
    clt1.numCarte=data.numCarte;
    clt1.nom=data.nom;
    clt1.prenom=data.prenom;
    clt1.tel=data.tel;
    clt1.dateN=data.dp.year+"-"+data.dp.month+"-"+data.dp.day;
    clt1.mail=data.email;
    clt1.mdp=data.mdp;

    const result = await this._dialogsService.showDialog({
      titleText: 'Ajouter Client',
      questionText: `Vous voulez valider ce client : "${ clt1.numCarte }"?`,
      confirmActionButtonText: 'valider',
      cancelActionButtonText: 'annuler',
    });
    
    if (result.isConfirmed) {
      
 this.ClientService.ajouterClient(clt1).subscribe((data) => {  
        
         this.retourApi=data;
         this.onReset();
       
         }
            
         
       )  
         , erreur => {  
           console.log(erreur);  
         }  
       
     
        }

   }

   onReset() {
    this.submitted = false;  
     this.addClientForm.reset();
  
}

get f() { 
 return this.addClientForm.controls;
  }


}
