import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../../_shared/service/client.service';
import { CoolDialogService } from '@angular-cool/dialogs';

@Component({
  selector: 'app-supprimer',
  templateUrl: './supprimer.component.html',
})
export class SupprimerComponent implements OnInit {


  
  ajoutForm: FormGroup;
  submitted = false;
  numclt:string;
  retourApi:String;

  constructor(private clientService:ClientService,private formBuilder: FormBuilder,private _dialogsService: CoolDialogService) { }

  
    ngOnInit(): void {
  
       
        this.ajoutForm = this.formBuilder.group({
        numcarte: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(16),Validators.maxLength(16)]]

        }
      );    
    }
    get f() { return this.ajoutForm.controls; }
  
   async onSubmit(data) {
    
      this.submitted = true;
  
    if (this.ajoutForm.invalid) {
      return;
  }
  this.numclt=data.numcarte;
  const result = await this._dialogsService.showDialog({
    titleText: 'Supprimer Client',
    questionText: `Vous voulez valider : "${ this.numclt }"?`,
    confirmActionButtonText: 'valider',
    cancelActionButtonText: 'annuler',
  });
  
  if (result.isConfirmed) {   
      this.clientService.supprimerClient(this.numclt).subscribe((data) => {  
        
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
      this.ajoutForm.reset();
  }

}
