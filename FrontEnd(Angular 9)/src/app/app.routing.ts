import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'accueil',
        loadChildren: () => import('./views/accueil/accueil.module').then(m => m.AccueilModule)
      },
      {
        path: 'banquier',
        loadChildren: () => import('./views/Banquier/banquier.module').then(m => m.BanquierModule)
      }
    ]
  },
  {
    path: 'client',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'accueil',
        loadChildren: () => import('./views/accueil/accueil.module').then(m => m.AccueilModule)
      },
      {
        path: 'coordonnées',
        loadChildren: () => import('./views/coordonnées/coordonnées.module').then(m => m.CoordonnéesModule)
      },
      {
        path: 'OpBancaire',
        loadChildren: () => import('./views/OpBancaire/op-bancaire.module').then(m => m.OpBancaireModule)
      }
    ]
  },
  {
    path: 'caissier',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'accueil',
        loadChildren: () => import('./views/accueil/accueil.module').then(m => m.AccueilModule)
      },
      {
        path: 'coordonnées',
        loadChildren: () => import('./views/coordonnées/coordonnées.module').then(m => m.CoordonnéesModule)
      },
      {
        path: 'InfoClient',
        loadChildren: () => import('./views/consulter-client/consulter-client.module').then(m => m.ConsulterClientModule)
      },
      {
        path: 'compte',
        loadChildren: () => import('./views/Compte/compte.module').then(m => m.CompteModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./views/Client/client.module').then(m => m.ClientModule)
 
      },
      {
        path: 'OpBancaire',
        loadChildren: () => import('./views/OpBancaire/op-bancaire.module').then(m => m.OpBancaireModule)
      }
    ]
  },
  {
    path: 'chefAgence',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'accueil',
        loadChildren: () => import('./views/accueil/accueil.module').then(m => m.AccueilModule)
      },
      {
        path: 'coordonnées',
        loadChildren: () => import('./views/coordonnées/coordonnées.module').then(m => m.CoordonnéesModule)
      },
      {
        path: 'InfoClient',
        loadChildren: () => import('./views/consulter-client/consulter-client.module').then(m => m.ConsulterClientModule)
      },
      {
        path: 'CaissierAgence',
        loadChildren: () => import('./views/caissier-dagence/caissier-dagence.module').then(m => m.CaissierDagenceModule)  
      }
    ]
  },
  { path: '**', component: P404Component }
];




@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
