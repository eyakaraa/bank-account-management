import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonnelComponent } from './personnel/personnel.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { CoordonnéesRoutingModule } from'./coordonnées-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PersonnelComponent,
     AuthentificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    CoordonnéesRoutingModule

  ]
})
export class CoordonnéesModule { }
