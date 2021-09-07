package model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class client {
 private String numCarte;
 private String nom, prenom;
 private Date dateN;
 private String mail;
 private String tel;
 private String mdp;
 private List<compte> LCompte;
 
 public client() {
	 LCompte=new ArrayList<compte>();
 }
 public client (String numCarte, String nom,String  prenom, Date dateN, String tel, String mdp) 
 {
	this.numCarte=numCarte;
	this.nom=nom;
	this.prenom=prenom;
	this.dateN=dateN;
	this.tel=tel;
	this.mdp=mdp;
	 LCompte=new ArrayList<compte>();
 }
public client(String numCarte, String mdp) {
	this.numCarte = numCarte;
	this.mdp = mdp;
	 LCompte=new ArrayList<compte>();
}
public client(String numCarte, String nom, String prenom, Date dateN, String tel) {
	this.numCarte = numCarte;
	this.nom = nom;
	this.prenom = prenom;
	this.dateN = dateN;
	this.tel = tel;
	 LCompte=new ArrayList<compte>();
}
 
public String getNumCarte() {
	return numCarte;
}
public void setNumCarte(String numCarte) {
	this.numCarte=numCarte;
}
public String getNom() {
	return nom;
}
public void setNom(String nom) {
	this.nom = nom;
}
public String getPrenom() {
	return prenom;
}
public void setPrenom(String prenom) {
	this.prenom = prenom;
}
public Date getDateN() {
	return dateN;
}
public void setDateN(Date dateN) {
	this.dateN = dateN;
}
public String getTel() {
	return tel;
}
public void setTel(String tel) {
	this.tel = tel;
}
public String getMdp() {
	return mdp;
}
public void setMdp(String mdp) {
	this.mdp = mdp;
}
public List<compte> getLCompte() {
	return LCompte;
}
public void setLCompte(List<compte> lCompte) {
	LCompte = lCompte;
}
public String getMail() {
	return mail;
}
public void setMail(String mail) {
	this.mail = mail;
}


 
}
