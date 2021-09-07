package model.connection;

import java.sql.Connection;
import java.sql.DriverManager;



public class Connexion {

private static Connection cnx;
	
	public static Connection getConnection(){
		try{
		Class.forName("com.mysql.jdbc.Driver");
		cnx = (Connection)DriverManager.getConnection("jdbc:mysql://localhost:3306/comptebancaire","root","");
			
		}catch(Exception e){
			System.out.println("erreur connexion: "+e.getMessage()+"erreur"+e);
		}
		return cnx;
	}
}