import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from 'src/app/components/ahorcado/ahorcado.component';
import { MatematicaComponent } from 'src/app/components/matematica/matematica.component';
import { MayormenorComponent } from 'src/app/components/mayormenor/mayormenor.component';
import { PreguntadosComponent } from 'src/app/components/preguntados/preguntados.component';

const routes: Routes = [
  {path:'mayormenor',component:MayormenorComponent},
  {path:'ahorcado',component:AhorcadoComponent},
  {path:'preguntados',component:PreguntadosComponent},
  {path:'matematica',component:MatematicaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
