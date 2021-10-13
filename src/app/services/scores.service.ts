import { getLocaleDateFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  constructor(private firestore:AngularFirestore) { }

  guardarScore(juego,usuario,puntuacion){
    let fecha = new Date();
    
    let data = {'fecha': fecha.getDate() + '-' + (fecha.getMonth()+1) +  '-' +fecha.getFullYear(),'usuario':usuario,'puntuacion': puntuacion};
    this.firestore.collection(juego).add(data);
  }

  getScores(juego){
    return this.firestore.collection(juego).valueChanges();
  }
}
