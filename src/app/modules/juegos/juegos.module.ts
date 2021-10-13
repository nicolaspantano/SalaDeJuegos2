import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from 'src/app/components/ahorcado/ahorcado.component';
import { MayormenorComponent } from 'src/app/components/mayormenor/mayormenor.component';
import { PreguntadosComponent } from 'src/app/components/preguntados/preguntados.component';
import { MatematicaComponent } from 'src/app/components/matematica/matematica.component';


@NgModule({
  declarations: [AhorcadoComponent, MayormenorComponent, PreguntadosComponent,MatematicaComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
