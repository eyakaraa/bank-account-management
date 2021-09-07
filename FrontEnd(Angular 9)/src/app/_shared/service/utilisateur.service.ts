import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { employer } from '../model/employer';
import { client } from '../model/client';
import { compte } from '../model/compte';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private rootURLEmployer= 'http://localhost:9999/CompteBancaireWEBAPI/employer/existe/';
 private rootURLClient='http://localhost:9999/CompteBancaireWEBAPI/client/existe/';
  errorData: {};
private employer:employer;
private client:client;
  isLoggedIn ;
  i:number;
  redirectUrl: string;
compteCourant:compte;
  constructor(private http:HttpClient) { }
  

  login(login: string, password: string,type:string) {
if(type=="Banquier"){

  return this.http.get<employer>(this.rootURLEmployer+login+'/'+password)
    .pipe(map(emp => {
        if (emp!=null) {
          sessionStorage.setItem('id', emp.id.toString());
          sessionStorage.setItem('nom',emp.nom);
          sessionStorage.setItem('prenom', emp.prenom);
          sessionStorage.setItem('tel', emp.tel);
          sessionStorage.setItem('type',emp.type);
          sessionStorage.setItem('mail',login);
          sessionStorage.setItem('sup',emp.superieur.toString());
             this.isLoggedIn = true;
        }
      }),
      catchError(this.handleError)
    );

}
if(type=="Client") {

  return this.http.get<client>(this.rootURLClient+login+'/'+password)
  .pipe(map(clt => {
      if (clt!=null) {
        sessionStorage.setItem('numCarte', clt.numCarte);
        console.log("client login: "+clt.numCarte);

        sessionStorage.setItem('nom',clt.nom);
        sessionStorage.setItem('prenom', clt.prenom);
        sessionStorage.setItem('dateN', clt.dateN);
        sessionStorage.setItem('tel', clt.tel);
        sessionStorage.setItem('type',type);
        sessionStorage.setItem('mail',clt.mail);
        for(var j=0;j<clt.LCompte.length;j++){

          sessionStorage.setItem('compte '+j+':id',clt.LCompte[j].id.toString());
          sessionStorage.setItem('compte '+j+':solde',clt.LCompte[j].solde.toString());
          sessionStorage.setItem('compte '+j+':decouvert',clt.LCompte[j].decouvert.toString());
        }
      
        sessionStorage.setItem('LCompteLength',clt.LCompte.length.toString());
           this.isLoggedIn = true;
      }
    }),
    catchError(this.handleError)
  );

}

  
  }
  getutilisateurEmp():employer{


    this.employer=new employer();
this.employer.id=Number.parseInt(sessionStorage.getItem('id'));
this.employer.nom=sessionStorage.getItem('nom');
this.employer.prenom=sessionStorage.getItem('prenom');
this.employer.tel=sessionStorage.getItem('tel');
this.employer.superieur=Number.parseInt(sessionStorage.getItem('sup'));
this.employer.type=sessionStorage.getItem('type');
this.employer.login=sessionStorage.getItem('mail');
const currentUser = this.employer;
return currentUser;
  }
  getutilisateurClient():client {
      this.client=new client();
      this.client.numCarte=sessionStorage.getItem('numCarte');
      this.client.nom=sessionStorage.getItem('nom');
      this.client.prenom=sessionStorage.getItem('prenom');
      this.client.dateN=sessionStorage.getItem('dateN');
      this.client.tel=sessionStorage.getItem('tel');
      this.client.mail=sessionStorage.getItem('mail');
      this.i=Number.parseInt(sessionStorage.getItem('LCompteLength'));
     
      const currentUser = this.client;
      console.log("client : "+this.client);
      return currentUser;
     }
   
  
 

  logout() {
    if(sessionStorage.getItem('type')=="client"){

      sessionStorage.removeItem('numCarte');
      sessionStorage.removeItem('nom');
      sessionStorage.removeItem('prenom');
      sessionStorage.removeItem('dateN');
      sessionStorage.removeItem('tel');
      sessionStorage.removeItem('mail');
      this.i=Number.parseInt(sessionStorage.getItem('LCompteLength'));
      for(var counter:number = 0; counter<this.i; counter++){
       sessionStorage.removeItem('compte '+this.i+':id');
      sessionStorage.removeItem('compte '+this.i+':solde');
      sessionStorage.removeItem('compte '+this.i+':decouvert');
        
      }
      sessionStorage.removeItem('LCompteLength');

    }else
    {

      sessionStorage.removeItem('id');
      sessionStorage.removeItem('nom');
      sessionStorage.removeItem('prenom');
      sessionStorage.removeItem('tel');
      sessionStorage.removeItem('sup');
      sessionStorage.removeItem('type');
      sessionStorage.removeItem('mail');
    }

    this.isLoggedIn = false;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error.message}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'La demande a échoué',
      errorDesc: 'Veuillez réessayer plus tard'
    };
    return throwError(this.errorData);
  }

   
}
