import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private rootURL= 'http://localhost:9999/CompteBancaireWEBAPI/client/';
  constructor(private http:HttpClient) { }

  getClient(num:string)
  {
    return this.http.get<client>(this.rootURL+'getClient/'+num);
  }

  ModifierClient(clt:client){
    return this.http.get<String>(this.rootURL+'modifierClient/'+clt.numCarte+'/'+clt.nom+'/'+clt.prenom+'/'+clt.dateN+'/'+clt.mail+'/'+clt.tel);

  }
  ModifierAuthClient(clt:client){
    return this.http.get<String>(this.rootURL+'modifierAuthentificationClient/'+clt.numCarte+'/'+clt.mdp);

  }
 ajouterClient(clt:client){
  return this.http.get<String>(this.rootURL+'enregistrerClient/'+clt.numCarte+'/'+clt.nom+'/'+clt.prenom+'/'+clt.dateN+'/'+clt.mail+'/'+clt.tel+'/'+clt.mdp);

 }
 supprimerClient(num:string){
  return this.http.get<String>(this.rootURL+'supprimerClient/'+num);

 }

}
