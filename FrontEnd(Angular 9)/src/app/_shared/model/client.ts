import { compte } from './compte';

export class client {
    
    numCarte:string;
    nom:string;
    prenom:string;
    dateN:string;
    mail:string;
    tel:string;
    mdp:string;
    LCompte: compte[];

    getNumCarte():string{
        return this.numCarte;
    }
    getNom():string{
        return this.nom;
    }
    getPrenom():string{
        return this.prenom;
    }
    getDateN():string{
        return this.dateN;
    }
    getMail():string{
        return this.mail;
    }
    getTel():string{
        return this.tel;
    }
    getMdp():string{
        return this.mdp;
    }
    getLCompte():compte[]{
        return this.LCompte;
    }
    setNumCarte(numCarte:string){
        this.numCarte=numCarte;
    }
    setNom(nom:string){
        this.nom=nom;
    }
    setPrenom(prenom:string){
        this.prenom=prenom;
    }
    setDateN(date:string){
        this.dateN=date;
    }
    setMail(mail:string){
        this.mail=mail;
    }
    setTel(tel:string){
        this.tel=tel;
    }
    setMdp(mdp:string){
        this.mdp=mdp;
    }
    setLCompte(Lcompte:compte[]){
        this.LCompte=Lcompte;
    }
}