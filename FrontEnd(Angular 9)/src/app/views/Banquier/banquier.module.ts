import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AjouterBanquierComponent } from './ajouter-banquier/ajouter-banquier.component';
import { SupprimerBanquierComponent } from './supprimer-banquier/supprimer-banquier.component';
import { ModifierBanquierComponent } from './modifier-banquier/modifier-banquier.component';
import { BanquierRoutingModule } from './banquier-routing.module';

import {MatTableModule} from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AjouterBanquierComponent,
    SupprimerBanquierComponent,
    ModifierBanquierComponent,
    
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BanquierRoutingModule
  ]
})
export class BanquierModule { }
