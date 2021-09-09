import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { MayormenorComponent } from './components/mayormenor/mayormenor.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UserGuard } from './guards/user.guard';
import { HomeComponent } from './pages/home/home.component';
import { QuiensoyComponent } from './pages/quiensoy/quiensoy.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'registrarse',component:RegistroComponent},
  {path:'quiensoy',component:QuiensoyComponent},
  {path:'chat',component:ChatComponent, canActivate: [UserGuard]},
  {path:'mayormenor',component:MayormenorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
