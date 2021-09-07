package controller;

import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import com.google.gson.Gson;

import Interface.Icompte;
import model.client;
import model.employer;
import model.historique;
import model.compte;
import controller.Historique;
import model.connection.Connexion;
@Path("compte")
public class Compte implements Icompte {

private static Connection connect;
	
//verifier
	@GET
	@Path("/ajouterCompte/{p1}/{p2}/{p3}")
	@Produces("application/json")
	public String ajouterCompte(@PathParam("p1") double solde,@PathParam("p2") double decouvert,@PathParam("p3") String client) {
	
		try{
			connect=Connexion.getConnection();
			String req = "insert into compte(solde, decouvert, client) values(?,?,?)";
			PreparedStatement sta=connect.prepareStatement(req);
			
			sta.setDouble(1,solde);
			sta.setDouble(2,decouvert);
			sta.setString(3, client);
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
	@Path("/getCompte/{p1}")
	@Produces("application/json")
	public String getCompte(@PathParam("p1") int id) {
		compte cmp= new compte();
		try{
			connect= Connexion.getConnection();
			String req = "select * from compte where id='"+id+"'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(req);
			
			resultats.next();
			cmp.setId(resultats.getInt(1));
			cmp.setSolde(resultats.getDouble(2));
			cmp.setDecouvert(resultats.getDouble(3));
	        cmp.setClient(resultats.getString(4));
			
			connect.close();
			return new Gson().toJson(cmp);
		}catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
		return null;
	}
	//verifier
	@GET
	@Path("/getAllCompte/{p1}")
	@Produces("application/json")
	public String getAllCompte(@PathParam("p1") String numCarte) {
	ArrayList<compte> lcmp=new ArrayList<compte>();
	try{
		connect= Connexion.getConnection();
		String req = "select * from compte where client="+numCarte;
		Statement s= connect.createStatement();
		ResultSet resultats=s.executeQuery(req);
		compte cmp;
		
		while(resultats.next()) {
			cmp=new compte();
		cmp.setId(resultats.getInt(1));
		cmp.setSolde(resultats.getDouble(2));
		cmp.setDecouvert(resultats.getDouble(3));
		cmp.setClient(resultats.getString(4));
		lcmp.add(cmp);
		}
		
		
		
		connect.close();
		return new Gson().toJson(lcmp);
	}catch(SQLException e)
	{
		System.out.println(e.getMessage());
	}
	return null;
}
  //verifier
	@GET
	@Path("/supprimerCompte/{p1}")
	@Produces("application/json")
	public String supprimerCompte(@PathParam("p1")int id) {
		try{
			connect=Connexion.getConnection();
			String req = "delete from Compte where id = ?";
			PreparedStatement sta=connect.prepareStatement(req);
			sta.setInt(1,id);
			boolean b=sta.execute();
			if (b=true) {
				return new Gson().toJson("la suppression effectuée avec succes");
			}
			connect.close();
		}catch(SQLException e){
			System.out.println(e.getMessage());
		}
		return null;
	}
	//verifier
	@GET
	@Path("/debiter/{p1}/{p2}")
	@Produces("application/json")
	public String debiter(@PathParam("p1") int id,@PathParam("p2") double solde) {
		
	compte cmp=new compte();
	historique his=new historique();
		try{
			connect=Connexion.getConnection();
	
			
			String req = "select * from compte where id='"+id+"'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(req);
			
			resultats.next();
			cmp.setSolde(resultats.getDouble(2));
			cmp.setDecouvert(resultats.getDouble(3));
			
			his.setSoldeIntial(cmp.getSolde());
			his.setDecouvertIntial(cmp.getDecouvert());
		
			if(cmp.getSolde()>=solde) {
				cmp.setSolde(cmp.getSolde()-solde);
			}else {
				double d=solde-cmp.getSolde();
				cmp.setDecouvert(cmp.getDecouvert()+d);
				cmp.setSolde(0);
			}
			his.setSoldeFinal(cmp.getSolde());
			his.setSoldeFinal(cmp.getSolde());
			his.setDecouvertFinale(cmp.getDecouvert());
				
				DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
				Calendar calendar = Calendar.getInstance();
				String d=format.format(calendar.getTime());    
				his.setDate(Date.valueOf(d));
				his.setCompte(id);
			
			
			
			String req2 = "update compte set solde = ?, decouvert=? where id = ?";
			PreparedStatement sta=connect.prepareStatement(req2);
			sta.setDouble(1,cmp.getSolde());
			sta.setDouble(2,cmp.getDecouvert());
			sta.setInt(3, id);
			boolean b=sta.execute();
			
			if (b=true) {
				Historique.ajouterHistorique(his);
				connect.close();
				return new Gson().toJson("le prélévement effectuer avec succes");
			}else {
				connect.close();
				return new Gson().toJson("probléme dans le prélévement");
				
			}
			
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
		return null;
	}
	//verifier
	@GET
	@Path("/crediter/{p1}/{p2}")
	@Produces("application/json")
	public String crediter(@PathParam("p1") int id,@PathParam("p2") double solde) {
		compte cmp=new compte();
		historique his=new historique();
		try{
			connect=Connexion.getConnection();
	
			
			String req = "select * from compte where id='"+id+"'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(req);
			
			resultats.next();
			cmp.setSolde(resultats.getDouble(2));
			cmp.setDecouvert(resultats.getDouble(3));
			
			his.setSoldeIntial(cmp.getSolde());
			his.setDecouvertIntial(cmp.getDecouvert());
			if(cmp.getDecouvert()>=solde) {
				cmp.setDecouvert(cmp.getDecouvert()-solde);
				
			}else {

				cmp.setSolde(his.getSoldeIntial()+(solde-cmp.getDecouvert()));
				cmp.setDecouvert(0);
			}
			his.setSoldeFinal(cmp.getSolde());
		his.setDecouvertFinale(cmp.getDecouvert());
			
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Calendar calendar = Calendar.getInstance();
			String d=format.format(calendar.getTime());
				
			his.setDate(Date.valueOf(d));
			his.setCompte(id);
			System.out.println(his.toString());
			
			
			
				String req2 = "update compte set solde = ?, decouvert=? where id = ?";
				PreparedStatement sta=connect.prepareStatement(req2);
				System.out.println(cmp.getSolde()+":"+cmp.getDecouvert());
				sta.setDouble(1,cmp.getSolde());
				sta.setDouble(2,cmp.getDecouvert());
				sta.setInt(3, id);
				boolean b=sta.execute();
				
				if (b=true) {
					Historique.ajouterHistorique(his);
					connect.close();
					return new Gson().toJson("ajout effectuer avec succes");
				}else {
					connect.close();
					return new Gson().toJson("probléme dans crediter");
					
				}
				
			
			
		}catch(Exception e){
			System.out.println(e.getMessage()+":"+e);
		}
		return null;
	}

	
}
