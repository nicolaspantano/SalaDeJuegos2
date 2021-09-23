import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Mensaje } from 'src/app/clases/mensaje';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  coleccion: AngularFirestoreCollection;
  mensajes=[];
  mensajeTexto;
  constructor(private firestore:AngularFirestore, public authSvc:AuthService) { 
    this.coleccion=firestore.collection('chat');
  }

  ngOnInit(): void {
    this.coleccion.valueChanges().subscribe((res)=>{
      this.mensajes = res;
      this.mensajes = this.mensajes.sort((a,b) => {return a.hora - b.hora})
    })
  }

  Enviar(){
    console.log('mensajeTxto',this.mensajeTexto);
    let mensajeNuevo = new Mensaje();
    mensajeNuevo.usuario=this.authSvc.user.correo;
    let actual = new Date();
    mensajeNuevo.hora = actual;
    mensajeNuevo.texto=this.mensajeTexto;
    console.log(mensajeNuevo);
    this.coleccion.add({...mensajeNuevo}).then(() => {
      this.coleccion.valueChanges().subscribe((res)=>{
        this.mensajes = res;
        this.mensajes = this.mensajes.sort((a,b) => {return a.hora - b.hora})
      })
    });
  }

}
