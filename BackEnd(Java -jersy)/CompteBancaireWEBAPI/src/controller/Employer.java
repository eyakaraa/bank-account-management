package controller;

import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import com.google.gson.Gson;

import Interface.Iemployer;
import model.employer;
import model.connection.Connexion;

@Path("employer")
public class Employer implements Iemployer {

	private static Connection connect;
	//verifier
	@GET
	@Path("/existe/{p1}/{p2}")
	@Produces("application/json")
	public String existe(@PathParam("p1") String login,@PathParam("p2") String mdp) {
		employer emp=new employer();
		try {
			connect=Connexion.getConnection();
			
			MessageDigest md = MessageDigest.getInstance("SHA-256");
	        md.update(mdp.getBytes());

	        byte byteData[] = md.digest();

	        //convertir le tableau de bits en une format hexadécimal - méthode 1
	        StringBuffer sb = new StringBuffer();
	        for (int i = 0; i < byteData.length; i++) {
	         sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
	        }
			mdp=sb.toString();
			String sql="select * from employe where login='"+login+"'and mdp='"+mdp+"'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(sql);
			resultats.next();
			emp.setId(resultats.getInt(1));
			emp.setNom(resultats.getString(2));
			emp.setPrenom(resultats.getString(3));
			emp.setTel(resultats.getString(4));
			emp.setType(resultats.getString(5));
			emp.setSuperieur(resultats.getInt(6));
				connect.close();
			
				return new Gson().toJson(emp);
				
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
	return null;
	}
	//verifier
	@GET
	@Path("/enregistrerEmployer/{p1}/{p2}/{p3}/{p4}/{p5}/{p6}/{p7}")
	@Produces("application/json")
	public String enregistrerEmployer(@PathParam("p1") String nom,@PathParam("p2") String prenom,@PathParam("p3") String tel,@PathParam("p4") String type,@PathParam("p5") int sup,@PathParam("p6") String login,@PathParam("p7") String mdp) {
		
		try{
			connect=Connexion.getConnection();
			String req = "insert into employe(nom, prenom, tel, type,superieur,login, mdp) values(?,?,?,?,?,?,?)";
			PreparedStatement sta=connect.prepareStatement(req);
			sta.setString(1,nom);
			sta.setString(2,prenom);
			sta.setString(3,tel);
			sta.setString(4,type);
			sta.setInt(5,sup);
			sta.setString(6,login);
			
			MessageDigest md = MessageDigest.getInstance("SHA-256");
	        md.update(mdp.getBytes());

	        byte byteData[] = md.digest();

	        //convertir le tableau de bits en une format hexadécimal - méthode 1
	        StringBuffer sb = new StringBuffer();
	        for (int i = 0; i < byteData.length; i++) {
	         sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
	        }
			mdp=sb.toString();
			
			sta.setString(7,mdp);
			boolean b=sta.execute();
		
			connect.close();
			if (b=true) {
				return new Gson().toJson("insertion effectuer avec succes");
			}
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
		return null;
	}
	//verifier
	@GET
	@Path("/getEmployer/{p1}")
	@Produces("application/json")
	public String getEmployer(@PathParam("p1") int id) {
		employer emp= new employer();
		try{
			connect= Connexion.getConnection();
			String req = "select * from employe where id="+id+" and type != 'admin'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(req);
			
			resultats.next();
			emp.setId(resultats.getInt(1));
			emp.setNom(resultats.getString(2));
			emp.setPrenom(resultats.getString(3));
			emp.setTel(resultats.getString(4));
			emp.setType(resultats.getString(5));
			emp.setSuperieur(resultats.getInt(6));
			emp.setLogin(resultats.getString(7));
			connect.close();
			return new Gson().toJson(emp);
		}catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
		return null;
	}
	//verifier
	
	@GET
	@Path("/getEmployerMail/{p1}")
	@Produces("application/json")
	public String getEmployer(@PathParam("p1") String login) {
		employer emp= new employer();
		try{
			connect= Connexion.getConnection();
			String req = "select * from employe where login='"+login+"' and type != 'admin'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(req);
			
			resultats.next();
			emp.setId(resultats.getInt(1));
			emp.setNom(resultats.getString(2));
			emp.setPrenom(resultats.getString(3));
			emp.setTel(resultats.getString(4));
			emp.setType(resultats.getString(5));
			emp.setSuperieur(resultats.getInt(6));
			connect.close();
			return new Gson().toJson(emp);
		}catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
		return null;
	}
	//verifier
	
	@GET
	@Path("/getAllEmployer")
	@Produces("application/json")
	public String getAllEmployer() {
		ArrayList<employer> lemp= new ArrayList<employer>();
		try{
			connect= Connexion.getConnection();
			String req = "select * from employe where type != 'admin'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(req);
			employer emp;
			
			while(resultats.next()) {
		    emp=new employer();
			emp.setId(resultats.getInt(1));
			emp.setNom(resultats.getString(2));
			emp.setPrenom(resultats.getString(3));
			emp.setTel(resultats.getString(4));
			emp.setType(resultats.getString(5));
			emp.setSuperieur(resultats.getInt(6));
			emp.setLogin(resultats.getString(7));
			lemp.add(emp);
			}
			connect.close();
			
			return new Gson().toJson(lemp);
		}catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
		return null;
	}

	@GET
	@Path("/supprimerEmployer/{p1}")
	@Produces("application/json")
	public String supprimerEmployer(@PathParam("p1") int id) {
		try{
			connect=Connexion.getConnection();
			String req = "delete from employe where id = ? and type != 'admin'";
			PreparedStatement sta=connect.prepareStatement(req);
			sta.setInt(1,id);
			boolean b=sta.execute();
			
			connect.close();
			if (b=true) {
				return new Gson().toJson("suppression avec succes");
			}
		}catch(SQLException e){
			System.out.println(e.getMessage());
		}
		return null;
	}
//verifier
	@GET
	@Path("/getCaissierAgence/{p1}")
	@Produces("application/json")
	public String getCaissierAgence(@PathParam("p1") int id) {
		ArrayList<employer> lemp= new ArrayList<employer>();
		try{
			connect= Connexion.getConnection();
			String req = "select * from employe where superieur="+id+" and type != 'admin'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(req);
			employer emp=new employer();
			
			while(resultats.next()) {
			emp.setId(resultats.getInt(1));
			emp.setNom(resultats.getString(2));
			emp.setPrenom(resultats.getString(3));
			emp.setTel(resultats.getString(4));
			emp.setType(resultats.getString(5));
			emp.setSuperieur(resultats.getInt(6));
			lemp.add(emp);
			}
			connect.close();
			return new Gson().toJson(lemp);
		}catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
		return null;
	}
//verifier
	
	@GET
	@Path("/modifierAuthentificationEmployer/{p1}/{p2}/{p3}")
	@Produces("application/json")
	public String modifierAuthentificationEmployer(@PathParam("p1") int id,@PathParam("p2") String login,@PathParam("p3") String mdp) {
	
		try{
			connect=Connexion.getConnection();
			String req = "update employe set login = ?, mdp = ? where id = ? and type != 'admin'";
			PreparedStatement sta=connect.prepareStatement(req);
			sta.setString(1,login);
			
			MessageDigest md = MessageDigest.getInstance("SHA-256");
	        md.update(mdp.getBytes());

	        byte byteData[] = md.digest();

	        //convertir le tableau de bits en une format hexadécimal - méthode 1
	        StringBuffer sb = new StringBuffer();
	        for (int i = 0; i < byteData.length; i++) {
	         sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
	        }
			mdp=sb.toString();
			
			sta.setString(2,mdp);
			sta.setInt(3,id);
			boolean b=sta.execute();
			
			connect.close();
			if (b=true) {
				return new Gson().toJson("la modification effectuer avec succes");
			}
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
		return null;
	}
//verifier
	@GET
	@Path("/modifierEmployer/{p1}/{p2}/{p3}/{p4}/{p5}/{p6}")
	@Produces("application/json")
	public String modifierEmployer(@PathParam("p1") int id,@PathParam("p2") String nom,@PathParam("p3") String prenom,@PathParam("p4") String tel,@PathParam("p5") String type,@PathParam("p6") int sup) {
		
		try{
			connect=Connexion.getConnection();
			String req = "update employe set nom = ?, prenom = ?,tel =?,type=?,superieur=? where id = ?";
			PreparedStatement sta=connect.prepareStatement(req);
			sta.setString(1,nom);
			sta.setString(2,prenom);
			sta.setString(3,tel);
			sta.setString(4,type);
			sta.setInt(5,sup);
			sta.setInt(6,id);
			boolean b=sta.execute();
			
			connect.close();
			if (b=true) {
				return new Gson().toJson("la modification effectuer avec succes");
			}
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
		return null;
	}

}
