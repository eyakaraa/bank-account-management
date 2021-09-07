export class employer {

    id:number;
    nom:string;
    prenom:string;
    tel:string;
    type:string;
    superieur:number;
    login:string;
    mdp:string;


    getId():number{
        return this.id;
    }
    getNom():string{
        return this.nom;
    }
    getPrenom():string{
        return this.prenom;
    }
    getType():string{
        return this.type;
    }
    getSuperieur():number{
        return this.superieur;
    }
    getLogin():string{
        return this.login;
    }
    getTel():string{
        return this.tel;
    }
    getMdp():string{
        return this.mdp;
    }
   
    setId(id:number){
        this.id=id;
    }
    setNom(nom:string){
        this.nom=nom;
    }
    setPrenom(prenom:string){
        this.prenom=prenom;
    }
    setSuperieur(sup:number){
        this.superieur=sup;
    }
    setLogin(login:string){
        this.login=login;
    }
    setTel(tel:string){
        this.tel=tel;
    }
    setMdp(mdp:string){
        this.mdp=mdp;
    }
    setType(type:string){
        this.type=type;
    }
    
}
