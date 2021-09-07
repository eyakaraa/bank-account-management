import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaissierDagenceRoutingModule } from './caissier-dagence-routing.module';
import { CaissierDAgenceComponent } from './caissier-dagence.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CaissierDAgenceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    CaissierDagenceRoutingModule
  ]
})
export class CaissierDagenceModule { }
