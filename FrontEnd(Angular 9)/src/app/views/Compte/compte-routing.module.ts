import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupprimerComponent } from './supprimer/supprimer.component';
import { AjouterComponent } from './ajouter/ajouter.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Compte'
    },
    children: [
      
      {
        path: 'ajouter',
        component: AjouterComponent,
        data: {
          title: 'Ajouter Compte'
        }
      },
      {
        path: 'supprimer',
        component: SupprimerComponent,
        data: {
          title: 'Supprimer Compte'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteRoutingModule { }
