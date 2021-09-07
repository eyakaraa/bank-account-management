import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { client } from '../../../_shared/model/client';
import { ClientService } from '../../../_shared/service/client.service';
import { NgbDatepicker, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
})
export class ModifierComponent implements OnInit {

  
  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;


  
retourApi:String;
  modif1Form: FormGroup;
  modifClientForm:FormGroup;
  submitted = false;
  clt:client;
  validGet:boolean=false;
  constructor(private calendar: NgbCalendar,private clientService:ClientService,private formBuilder: FormBuilder,private formBuilder2:FormBuilder) { }

  
  navigateEvent(event) {
    this.date = event.next;
  }
  
    ngOnInit(): void {
  
       
        this.modif1Form = this.formBuilder.group({
        numcarte: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(16),Validators.maxLength(16)]]

        }
      );    
      this.modifClientForm=this.formBuilder2.group({
        nom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        prenom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        tel: ['',[Validators.required,Validators.pattern('[0-9]*'),,Validators.minLength(8),Validators.maxLength(8)]],
        dp:['',Validators.required],
        email:['',[Validators.required,Validators.email]]
       });  
        }
    get fn() { return this.modif1Form.controls; }
    onReset2() {
      this.submitted = false;  
       this.modifClientForm.reset();
    
  }
  
  get f() { 
   return this.modifClientForm.controls;
    }
  
    onSubmit(data) {
    
      this.submitted = true;
  
    if (this.modif1Form.invalid) {
      return;
  }
   
      this.clientService.getClient(data.numcarte).subscribe((data) => {  
        
       this.clt=data;
        this.onReset();

        this.f.nom.setValue(this.clt.nom);
        this.f.prenom.setValue(this.clt.prenom);
        this.f.tel.setValue(this.clt.tel);
        this.f.email.setValue(this.clt.mail);
       this.validGet=true;
      
       
      }  
      )  
        , erreur => {  
          console.log(erreur);  
        }  
      
      
  
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
    
 this.clientService.ModifierClient(clt1).subscribe((data) => {  
        
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
      this.modif1Form.reset();
  }

}
