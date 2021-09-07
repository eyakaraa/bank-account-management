import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AjouterComponent } from './ajouter/ajouter.component';
import { SupprimerComponent } from './supprimer/supprimer.component';
import { ModifierComponent } from './modifier/modifier.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Client'
    },
    children: [
      
      {
        path: 'ajouter',
        component: AjouterComponent,
        data: {
          title: 'Ajouter Client'
        }
      },
      {
        path: 'modifier',
        component: ModifierComponent,
        data: {
          title: 'Modifier Client'
        }
      },
      {
        path: 'supprimer',
        component: SupprimerComponent,
        data: {
          title: 'Supprimer Client'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
