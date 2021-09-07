import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaissierDAgenceComponent } from './caissier-dagence.component';





const routes: Routes = [
  {
    path: '',
    component:CaissierDAgenceComponent,
    data: {
      title: 'les caissier d\'agence'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaissierDagenceRoutingModule { }
