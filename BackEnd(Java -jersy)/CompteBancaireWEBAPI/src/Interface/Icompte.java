package Interface;

import javax.ws.rs.PathParam;

public interface Icompte {

	public String ajouterCompte(double solde,double decouvert,String client);
	public String getCompte(int id);
	public String getAllCompte(String numCarte);
	public String supprimerCompte(int id);
    public String debiter(int id,double solde);
	public String crediter(int id,double solde);

}
