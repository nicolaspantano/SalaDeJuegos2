import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { QuiensoyComponent } from './pages/quiensoy/quiensoy.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { MayormenorComponent } from './components/mayormenor/mayormenor.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { MatematicaComponent } from './components/matematica/matematica.component';
import { PuntuacionesComponent } from './components/puntuaciones/puntuaciones.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { EncuestaRespuestasComponent } from './components/encuesta-respuestas/encuesta-respuestas.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    QuiensoyComponent,
    LoginComponent,
    RegistroComponent,
    ChatComponent,
    MayormenorComponent,
    LoadingComponent,
    AhorcadoComponent,
    PreguntadosComponent,
    MatematicaComponent,
    PuntuacionesComponent,
    EncuestaComponent,
    EncuestaRespuestasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
