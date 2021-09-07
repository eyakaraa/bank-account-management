import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsulterClientComponent } from './consulter-client.component';





const routes: Routes = [
  {
    path: '',
    component:ConsulterClientComponent,
    data: {
      title: 'Consulter les informations des clients'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsulterClientRoutingModule { }
