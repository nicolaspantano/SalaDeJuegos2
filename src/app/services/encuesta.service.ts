import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  ruta="encuesta";
  
  constructor(private firestore:AngularFirestore) { }

  Crear(mensaje:Encuesta){
    return this.firestore.collection(this.ruta).add({...mensaje});
  } 
}
