import { Component, OnInit } from '@angular/core';
import { employer } from '../../../_shared/model/employer';
import { EmployerService } from '../../../_shared/service/employer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './ajouter-banquier.component.html',

})
export class AjouterBanquierComponent implements OnInit {

employers:employer[];
dataavailbale_allEmployers:boolean=false;
config: any;
radio: any=["chefAgence","caissier"];
radioselect :boolean=false;
ajoutForm: FormGroup;
submitted = false;
supId:number;
type;
afficheImg:boolean;
retourApi:String;
constructor(private EmployerService:EmployerService,private formBuilder: FormBuilder) { }
 

  ngOnInit(): void {

     
     this.LoadData_AllEmployer(); 
      this.ajoutForm = this.formBuilder.group({
        nom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      prenom: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      tel: ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(8),Validators.maxLength(8)]],
    sup: ['',  Validators.required],
        email: ['', [Validators.required, Validators.email]],
         mdp:['', Validators.required]
      }
    );    
    this.afficheImg=false;
  }
  get f() { return this.ajoutForm.controls; }
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
  radioevent(event: any){
    this.type=event.target.value;
    if(event.target.value=="caissier"){
      this.radioselect=true;
      this.supId=null;
    }else{
      this.radioselect=false;
      this.supId=1;
      this.f.sup.setValue(1);
    }
  }
  addSup(id : number){
   this.supId=id;
   this.f.sup.setValue(id);
   console.log(this.f.sup.value);
  }
  onSubmit(data) {
  
    this.submitted = true;
    emp:employer ;
    const emp =new employer();
    if(this.type!=null){ this.afficheImg=false;
    }
    else{
      this.afficheImg=true;
    }
    if ((this.ajoutForm.invalid)||(this.type==null)) {
      console.log();
      return;
  }
    
    emp.nom=data.nom;
    emp.prenom=data.prenom;
    emp.tel=data.tel;
    emp.superieur=data.sup;
    emp.type=this.type;
    emp.superieur=this.supId;
    emp.login=data.email;
    emp.mdp=data.mdp;

  
      this.EmployerService.AddEmployer(emp).subscribe((data) => {  
       
        this.retourApi=data;
        this.onReset();
        this.LoadData_AllEmployer(); 
       
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
