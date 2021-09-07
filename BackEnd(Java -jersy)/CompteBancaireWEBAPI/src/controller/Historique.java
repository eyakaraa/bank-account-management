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

import Interface.IHistorique;
import model.historique;
import model.connection.Connexion;

@Path("historique")
public class Historique implements IHistorique{
	private static Connection connect;
	
//verifier
	public static boolean ajouterHistorique(historique historique) {
		boolean b = false;
		try{
			connect=Connexion.getConnection();
			String req = "insert into historique(soldeIntial,decouvertIntial, soldeFinale, decouvertFinale,date, compte) values(?,?,?,?,?,?)";
			PreparedStatement sta=connect.prepareStatement(req);
			sta.setDouble(1,historique.getSoldeIntial());
			sta.setDouble(2, historique.getDecouvertIntial());
			sta.setDouble(3,historique.getSoldeFinal());
			sta.setDouble(4,historique.getDecouvertFinale());
			sta.setDate(5,historique.getDate());
			sta.setInt(6,historique.getCompte());
			
			b=sta.execute();
		
			connect.close();
			
		}catch(Exception e){
			System.out.println(e.getMessage());
		}
		return b;
	}
//verifier
	@GET
	@Path("/getAllHistorique/{p1}")
	@Produces("application/json")
	public String getAllHistorique(@PathParam("p1") int id) {
		ArrayList<historique> lhis= new ArrayList<historique>();
		try{
			connect= Connexion.getConnection();
			String req = "select * from historique where compte= '"+id+"'";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(req);
			historique his;
			
			while(resultats.next()) {
				his=new historique();
				his.setId(resultats.getInt(1));
				his.setSoldeIntial(resultats.getDouble(2));
				his.setDecouvertIntial(resultats.getDouble(3));
				his.setSoldeFinal(resultats.getDouble(4));
				his.setDecouvertFinale(resultats.getDouble(5));
				his.setDate(resultats.getDate(6));
				his.setCompte(resultats.getInt(7));
				lhis.add(his);
			}
			connect.close();
			return new Gson().toJson(lhis);
		}catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
		return null;
	}
//verifier
	@GET
	@Path("/getAllHistoriqueClient/{p1}")
	@Produces("application/json")
	public String getAllHistoriqueClient(@PathParam("p1") String numCarte) {
		ArrayList<historique> lhis= new ArrayList<historique>();
		try{
			connect= Connexion.getConnection();
			String req = "select * from historique where compte in (select id from compte where client ='"+numCarte+"')";
			Statement s= connect.createStatement();
			ResultSet resultats=s.executeQuery(req);
			historique his;
			
			while(resultats.next()) {
				his=new historique();
			his.setId(resultats.getInt(1));
			his.setSoldeIntial(resultats.getDouble(2));
			his.setDecouvertIntial(resultats.getDouble(3));
			his.setSoldeFinal(resultats.getDouble(4));
			his.setDecouvertFinale(resultats.getDouble(5));
			his.setDate(resultats.getDate(6));
			his.setCompte(resultats.getInt(7));
			lhis.add(his);
			}
			connect.close();
			return new Gson().toJson(lhis);
		}catch(SQLException e)
		{
			System.out.println(e.getMessage());
		}
		return null;
	}

}
