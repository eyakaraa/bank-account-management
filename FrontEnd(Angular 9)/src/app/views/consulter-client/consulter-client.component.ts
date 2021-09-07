import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { client } from '../../_shared/model/client';
import { ClientService } from '../../_shared/service/client.service';

@Component({
  templateUrl: './consulter-client.component.html',
})
export class ConsulterClientComponent implements OnInit {

  
  ajoutForm: FormGroup;
  submitted = false;
  clt:client;
  validGet:boolean=false;
  constructor(private clientService:ClientService,private formBuilder: FormBuilder) { }

  
    ngOnInit(): void {
  
       
        this.ajoutForm = this.formBuilder.group({
        numcarte: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(16),Validators.maxLength(16)]]

        }
      );    
    }
    get f() { return this.ajoutForm.controls; }
  
    onSubmit(data) {
    
      this.submitted = true;
  
    if (this.ajoutForm.invalid) {
      return;
  }
    console.log(data.numcarte);
   
      this.clientService.getClient(data.numcarte).subscribe((data) => {  
        
       this.clt=data;
       console.log(this.clt);
        this.onReset();
       this.validGet=true;
      
       
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
