package controller;

import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import com.google.gson.Gson;

import Interface.Iclient;
import model.client;
import model.compte;
import model.employer;
import model.connection.Connexion;

@Path("client")
public class Client implements Iclient {
	
	private static Connection connect;
	//verifier
	@GET
	@Path("/existe/{p1}/{p2}")
	@Produces("application/json")
	public String existe(@PathParam("p1")String login,@PathParam("p2") String mdp) {
		client clt=new client();
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
			
			String sql="select * from client where numCarte='"+login+"'and mdp='"+mdp+"'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(sql);
			resultats.next();
			clt.setNumCarte(resultats.getString(1));
			clt.setNom(resultats.getString(2));
			clt.setPrenom(resultats.getString(3));
			clt.setDateN(resultats.getDate(4));
			clt.setMail(resultats.getString(5));
			clt.setTel(resultats.getString(6));
			
			
			ArrayList<compte> lcmp= new ArrayList<compte>();
			
				connect= Connexion.getConnection();
				String sql2="select * from compte where client='"+clt.getNumCarte()+"'";
				Statement s2= connect.createStatement();
				ResultSet resultats2=s.executeQuery(sql2);
				compte cmp;
				
				while(resultats2.next()) {
					 cmp=new compte();
			    cmp.setId(resultats2.getInt(1));
				cmp.setSolde(resultats2.getDouble(2));
				cmp.setDecouvert(resultats2.getDouble(3));
				
				lcmp.add(cmp);
				}
			clt.setLCompte(lcmp);
				
				connect.close();
			
				return new Gson().toJson(clt);
				
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
	return null;
	}
//verifier
	@GET
	@Path("/enregistrerClient/{p1}/{p2}/{p3}/{p4}/{p5}/{p6}/{p7}")
	@Produces("application/json")
	public String enregistrerClient(@PathParam("p1") String numCarte,@PathParam("p2") String nom,@PathParam("p3") String prenom,@PathParam("p4") Date dateN,@PathParam("p5") String mail,@PathParam("p6") String tel,@PathParam("p7") String mdp) {
		
		try{
			connect=Connexion.getConnection();
			String req = "insert into client(numCarte, nom, prenom, dateN,mail ,tel, mdp) values(?,?,?,?,?,?,?)";
			PreparedStatement sta=connect.prepareStatement(req);
			sta.setString(1,numCarte);
			sta.setString(2,nom);
			sta.setString(3,prenom);
			sta.setDate(4,dateN);
			sta.setString(5, mail);
			sta.setString(6,tel);
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
			System.out.println(e+" erreur : "+ e.getMessage());
		}
		return null;

	}
//verifier
	@GET
	@Path("/getClient/{p1}")
	@Produces("application/json")
	public String getClient(@PathParam("p1") String numCarte) {
		client clt= new client();
		try{
			connect= Connexion.getConnection();
			String req = "select * from client where numCarte='"+numCarte+"'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(req);
			
			resultats.next();
			clt.setNumCarte(resultats.getString(1));
			clt.setNom(resultats.getString(2));
			clt.setPrenom(resultats.getString(3));
			clt.setDateN(resultats.getDate(4));
			clt.setMail(resultats.getString(5));
			clt.setTel(resultats.getString(6));
			
			ArrayList<compte> lcmp= new ArrayList<compte>();
			
			connect= Connexion.getConnection();
			String sql2="select * from compte where client='"+numCarte+"'";
			Statement s2= connect.createStatement();
			ResultSet resultats2=s2.executeQuery(sql2);
			compte cmp;
			
			while(resultats2.next()) {
				cmp=new compte();
		    cmp.setId(resultats2.getInt(1));
			cmp.setSolde(resultats2.getDouble(2));
			cmp.setDecouvert(resultats2.getDouble(3));
			
			lcmp.add(cmp);
			}
		    clt.setLCompte(lcmp);

			
			connect.close();
			return new Gson().toJson(clt);
		}catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
		return null;
	}
//verifier
	@GET
	@Path("/supprimerClient/{p1}")
	@Produces("application/json")

	public String supprimerClient(@PathParam("p1") String numCarte) {
		
		
		ArrayList<compte> lcmp=new ArrayList<compte>();
		
		
		try{
			connect=Connexion.getConnection();
			
			String req = "delete from client where numCarte = ?";
			PreparedStatement sta=connect.prepareStatement(req);
			sta.setString(1,numCarte);
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
	@Path("/modifierAuthentificationClient/{p1}/{p2}")
	@Produces("application/json")
	public String modifierAuthentificationClient(@PathParam("p1") String numCarte,@PathParam("p2") String mdp) {

		try{
			connect=Connexion.getConnection();
			String req = "update client set mdp = ? where numCarte = ?";
			PreparedStatement sta=connect.prepareStatement(req);
			
			
			MessageDigest md = MessageDigest.getInstance("SHA-256");
	        md.update(mdp.getBytes());

	        byte byteData[] = md.digest();

	        //convertir le tableau de bits en une format hexadécimal - méthode 1
	        StringBuffer sb = new StringBuffer();
	        for (int i = 0; i < byteData.length; i++) {
	         sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
	        }
			mdp=sb.toString();
			
			sta.setString(1,mdp);
			sta.setString(2,numCarte);
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
//modifierclient
	@GET
	@Path("/modifierClient/{p1}/{p2}/{p3}/{p4}/{p5}/{p6}")
	@Produces("application/json")
	public String modifierClient(@PathParam("p1") String numCarte,@PathParam("p2") String nom,@PathParam("p3") String prenom,@PathParam("p4") Date dateN,@PathParam("p5") String mail,@PathParam("p6") String tel) {
		
		try{
			connect=Connexion.getConnection();
			String req = "update client set nom = ?, prenom = ?,dateN =?,mail =?,tel =? where numCarte = ?";
			PreparedStatement sta=connect.prepareStatement(req);
			sta.setString(1,nom);
			sta.setString(2,prenom);
			sta.setDate(3,dateN);
			sta.setString(4,mail);
			sta.setString(5,tel);
			sta.setString(6,numCarte);
			
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
