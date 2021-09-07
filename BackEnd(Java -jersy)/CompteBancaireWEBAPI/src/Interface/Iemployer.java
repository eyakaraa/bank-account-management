package Interface;

import javax.ws.rs.PathParam;

public interface Iemployer {
	
	public String existe(String login,String mdp);
	public String enregistrerEmployer(String nom,String prenom,String tel,String type,int sup,String login,String mdp);//employer json envoyer en url pour le converter en client
	public String getEmployer(int id);
	public String getEmployer(String login);
	public String getAllEmployer();//admin voir tout les employer et les filtrer en cas de besoin
	public String supprimerEmployer(int id);
	public String getCaissierAgence(int id);//id chef d'agence 
	public String modifierAuthentificationEmployer(int id,String login,String mdp);//id,login,mdp
	public String modifierEmployer(int id,String nom,String prenom,String tel,String type,int sup);//id,all sauf login mdp
}
