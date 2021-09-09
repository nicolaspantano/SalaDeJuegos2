import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private firestore:AngularFirestore) { }

  LogUsuario(usuario){
    let data = {"usuario" : usuario, 'fecha' : Date.now()}
    this.firestore.collection('logs').add(data);
  }
}
