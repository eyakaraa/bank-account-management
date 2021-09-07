import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { historique } from '../model/historique';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private rootURL= 'http://localhost:9999/CompteBancaireWEBAPI/historique/';
  constructor(private http:HttpClient) { }

  getAllHistorique(id:number)
  {
    return this.http.get<historique[]>(this.rootURL+'getAllHistorique/'+id);
  }
}
