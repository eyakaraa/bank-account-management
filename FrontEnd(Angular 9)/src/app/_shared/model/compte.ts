export class  compte {
	id:number;
	solde:number;
	decouvert:number;
	client:string;

	getId():number{
        return this.id;
	}
	getSolde():number{
        return this.solde;
	}
	getDecouvert():number{
        return this.decouvert;
	}
	getclient():string{
        return this.client;
	}
	setId(id:number){
        this.id=id;
	}
	setSolde(solde:number){
        this.solde=solde;
	}
	setDecouvert(decouvert:number){
        this.decouvert=decouvert;
	}
	setClient(client:string){
        this.client=client;
    }
}