import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PersonnelComponent } from './personnel/personnel.component';
import { AuthentificationComponent } from './authentification/authentification.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'gérer votre compte'
    },
    children: [
      
      {
        path: 'personnel',
        component: PersonnelComponent,
        data: {
          title: 'Information Génerale'
        }
      },
      {
        path: 'authentification',
        component: AuthentificationComponent,
        data: {
          title: 'Information Authentification'
        }
      },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordonnéesRoutingModule { }
