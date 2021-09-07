package model;

import java.sql.Date;

public class historique {

 private int id;
 private double soldeIntial;
 private double decouvertIntial;
 private double soldeFinal;
 private double decouvertFinale;
 private Date date;
 private int compte;

 
public historique() {
	
}



public int getId() {
	return id;
}


public void setId(int id) {
	this.id = id;
}


public double getSoldeIntial() {
	return soldeIntial;
}


public void setSoldeIntial(double soldeIntial) {
	this.soldeIntial = soldeIntial;
}


public double getSoldeFinal() {
	return soldeFinal;
}


public void setSoldeFinal(double soldeFinal) {
	this.soldeFinal = soldeFinal;
}


public Date getDate() {
	return date;
}


public void setDate(Date date) {
	this.date = date;
}


public int getCompte() {
	return compte;
}


public void setCompte(int compte) {
	this.compte = compte;
}



public double getDecouvertIntial() {
	return decouvertIntial;
}



public void setDecouvertIntial(double decouvertIntial) {
	this.decouvertIntial = decouvertIntial;
}



public double getDecouvertFinale() {
	return decouvertFinale;
}



public void setDecouvertFinale(double decouvertFinale) {
	this.decouvertFinale = decouvertFinale;
}


 
	
}
