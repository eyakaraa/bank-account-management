import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AccueilComponent } from './accueil.component';
import { AccueilRoutingModule } from './accueil-routing.module';


@NgModule({
  imports: [
    FormsModule,
    AccueilRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ AccueilComponent ]
})



export class AccueilModule { }
