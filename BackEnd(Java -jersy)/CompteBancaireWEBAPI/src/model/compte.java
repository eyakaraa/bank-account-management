package model;

public class compte {
	private int id;
	private double solde;
	private double decouvert;
	private String client;
	
	
	public compte() {
	}

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getSolde() {
		return solde;
	}

	public void setSolde(double solde) {
		this.solde = solde;
	}

	public double getDecouvert() {
		return decouvert;
	}

	public void setDecouvert(double decouvert) {
		this.decouvert = decouvert;
	}


	public String getClient() {
		return client;
	}


	public void setClient(String client) {
		this.client = client;
	}

	
	
}
