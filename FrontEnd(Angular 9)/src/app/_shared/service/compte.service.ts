import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { compte } from '../model/compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private rootURL= 'http://localhost:9999/CompteBancaireWEBAPI/compte/';
  constructor(private http:HttpClient) { }

  getAllCompte(client:string)
  {
    return this.http.get<compte[]>(this.rootURL+'getAllCompte/'+client);
  }
  AddCompte(cmp:compte)
  {
    return this.http.get<String>(this.rootURL+'ajouterCompte/'+cmp.solde+'/'+cmp.decouvert+'/'+cmp.client);
  }
crediter(cmp:compte)
{
  return this.http.get<String>(this.rootURL+'crediter/'+cmp.id+'/'+cmp.solde);

}
debiter(cmp:compte)
{
  return this.http.get<String>(this.rootURL+'debiter/'+cmp.id+'/'+cmp.solde);

}
  SupprimerCompte(id:number)
  {
    return this.http.get<String>(this.rootURL+'supprimerCompte/'+id);
  }
}
