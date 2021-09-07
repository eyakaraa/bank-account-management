import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsulterClientComponent } from './consulter-client.component';
import { ConsulterClientRoutingModule } from './consulter-client-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ConsulterClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ConsulterClientRoutingModule
  ]
})
export class ConsulterClientModule { }
