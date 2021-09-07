import {Component, OnInit} from '@angular/core';
import { navItemsAdmin } from '../../_nav';
import { navItemsClient } from "../../_nav";
import { navItemsChef } from "../../_nav";
import { navItemsCaissier } from "../../_nav";
import { Router } from '@angular/router';
import { AuthGuard } from '../../_shared/service/auth.guard';
import { UtilisateurService } from '../../_shared/service/utilisateur.service';
import { client } from '../../_shared/model/client';
import { employer } from '../../_shared/model/employer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  
  public sidebarMinimized = false;
  public navItems = navItemsAdmin;
public navItemsClient=navItemsClient;
public navItemsChef=navItemsChef;
public navItemsCaissier=navItemsCaissier;
public type;
infoClient:client;
infoEmp:employer;
constructor(private authGuard:AuthGuard,private utilisateur:UtilisateurService,private router: Router) { }
ngOnInit(): void {
  this.type=sessionStorage.getItem("type");
  if(this.type=="Client"){
    this.infoClient=this.utilisateur.getutilisateurClient();
 console.log(this.infoClient);
   }else{
     emp:employer;
    this.infoEmp=this.utilisateur.getutilisateurEmp();
       }

  this.authGuard.checkLogin(this.router.url);

console.log(this.type);
}
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  dec(){
    this.utilisateur.logout();
    this.authGuard.checkLogin(this.router.url);
    
  }
}
