import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoriqueComponent } from './historique/historique.component';
import { DebiterComponent } from './debiter/debiter.component';
import { CrediterComponent } from './crediter/crediter.component';
import { OpBancaireRoutingModule } from './op-bancaire-routing.module';

import {MatTableModule} from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
 DebiterComponent,
 CrediterComponent,
 HistoriqueComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OpBancaireRoutingModule
  ]
})
export class OpBancaireModule { }
