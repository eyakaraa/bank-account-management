export class historique {

    id:number;
    soldeIntial:number;
    decouvertIntial:number;
    soldeFinal:number;
    decouvertFinal:number;
    date:string;
    compte:number;


    getId():number{
        return this.id;
    }
    getSoldeIntial():number{
        return this.soldeIntial;
	}
	getDecouvertIntial():number{
        return this.decouvertIntial;
    }
    getSoldeFinal():number{
        return this.soldeFinal;
	}
	getDecouvertFinale():number{
        return this.decouvertFinal;
    }
    getDate():string{
        return this.date;
    }
    getCompte():number{
        return this.compte;
    }
    setId(id:number){
        this.id=id;
	}
	setSoldeIntial(soldeIntial:number){
        this.soldeIntial=soldeIntial;
	}
	setDecouvertIntial(decouvertIntial:number){
        this.decouvertIntial=decouvertIntial;
    }
    setSoldeFinal(soldeFinal:number){
        this.soldeFinal=soldeFinal;
	}
	setDecouvertFinal(decouvertFinal:number){
        this.decouvertFinal=decouvertFinal;
    }
    setDate(date:string){
        this.date=date;
    }
    setCompte(compte:number){
        this.compte=compte;
    }
}
