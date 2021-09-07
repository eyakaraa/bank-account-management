import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HistoriqueComponent } from './historique/historique.component';
import { DebiterComponent } from './debiter/debiter.component';
import { CrediterComponent } from './crediter/crediter.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'OpBancaire'
    },
    children: [
      
      {
        path: 'debiter',
        component: DebiterComponent,
        data: {
          title: 'Debiter'
        }
      },
      {
        path: 'crediter',
        component: CrediterComponent,
        data: {
          title: 'Crediter'
        }
      },
      {
        path: 'historique',
        component: HistoriqueComponent,
        data: {
          title: 'Historique des comptes client'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpBancaireRoutingModule { }
