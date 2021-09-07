package Interface;

import java.sql.Date;

import javax.ws.rs.FormParam;

public interface Iclient {

	public String existe(String login,String mdp);
	public String enregistrerClient(String numCarte,String nom,String prenom,Date dateN,String mail,String tel,String mdp);
	public String getClient(String numCarte);
	public String supprimerClient(String numCarte);
	public String modifierAuthentificationClient(String numCarte,String mdp);
	public String modifierClient(String numCarte,String nom,String prenom,Date dateN,String mail,String tel);

}
