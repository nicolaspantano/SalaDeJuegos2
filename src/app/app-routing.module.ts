import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './components/chat/chat.component';
import { EncuestaRespuestasComponent } from './components/encuesta-respuestas/encuesta-respuestas.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { LoginComponent } from './components/login/login.component';

import { RegistroComponent } from './components/registro/registro.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { HomeComponent } from './pages/home/home.component';
import { QuiensoyComponent } from './pages/quiensoy/quiensoy.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent, canActivate: [UserGuard]},
  {path:'login',component:LoginComponent},
  {path:'registrarse',component:RegistroComponent},
  {path:'quiensoy',component:QuiensoyComponent},
  {path:'chat',component:ChatComponent, canActivate: [UserGuard]},
  {path:'juegos',loadChildren: ()=>(import('./modules/juegos/juegos-routing.module').then(m => m.JuegosRoutingModule)),canActivate: [UserGuard]},
  {path:'encuesta',component:EncuestaComponent, canActivate: [UserGuard]},
  {path: 'encuesta-respuestas',component:EncuestaRespuestasComponent,canActivate: [AdminGuard]}
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
