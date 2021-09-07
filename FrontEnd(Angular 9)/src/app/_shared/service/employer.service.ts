import { Injectable } from '@angular/core';
import { employer } from '../model/employer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private rootURL= 'http://localhost:9999/CompteBancaireWEBAPI/employer/';
  constructor(private http:HttpClient) { }

  getAllEmployer()
  {
    return this.http.get<employer[]>('http://localhost:9999/CompteBancaireWEBAPI/employer/getAllEmployer');
  }
  AddEmployer(emp:employer)
  {
    return this.http.get<String>(this.rootURL+'enregistrerEmployer/'+emp.nom+'/'+emp.prenom+'/'+emp.tel+'/'+emp.type+'/'+emp.superieur+'/'+emp.login+'/'+emp.mdp);
  }
  SupprimeEmployer(id:number){
    return this.http.get<String>(this.rootURL+'supprimerEmployer/'+id);
  }
  ModifierEmployer(emp:employer){
    return this.http.get<String>(this.rootURL+'modifierEmployer/'+emp.id+'/'+emp.nom+'/'+emp.prenom+'/'+emp.tel+'/'+emp.type+'/'+emp.superieur);
  }
  ModifierAuthEmp(emp:employer){
    return this.http.get<String>(this.rootURL+'modifierAuthentificationEmployer/'+emp.id+'/'+emp.login+'/'+emp.mdp);
  }
  GetCaissierAgence(id:number){
    return this.http.get<employer[]>(this.rootURL+'getCaissierAgence/'+id);
  }
}
