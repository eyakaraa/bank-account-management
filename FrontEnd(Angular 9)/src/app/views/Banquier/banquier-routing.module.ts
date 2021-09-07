import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterBanquierComponent } from './ajouter-banquier/ajouter-banquier.component';
import { SupprimerBanquierComponent } from './supprimer-banquier/supprimer-banquier.component';
import { ModifierBanquierComponent } from './modifier-banquier/modifier-banquier.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Banquier'
    },
    children: [
      
      {
        path: 'ajouter',
        component: AjouterBanquierComponent,
        data: {
          title: 'Ajouter Banquier'
        }
      },
      {
        path: 'modifier',
        component: ModifierBanquierComponent,
        data: {
          title: 'Modifier Banquier'
        }
      },
      {
        path: 'supprimer',
        component: SupprimerBanquierComponent,
        data: {
          title: 'Supprimer Banquier'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanquierRoutingModule { }
