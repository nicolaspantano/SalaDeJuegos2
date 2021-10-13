import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-puntuaciones',
  templateUrl: './puntuaciones.component.html',
  styleUrls: ['./puntuaciones.component.css']
})
export class PuntuacionesComponent implements OnInit {

  @Input() juego;
  puntuaciones;
  constructor(private score:ScoresService,private firestore:AngularFirestore) {

    setTimeout(() => {
      this.getPuntuaciones();
    }, 1000);
    console.log(this.puntuaciones)
   }

  ngOnInit(): void {
  }

  getPuntuaciones(){
    console.log(this.juego);
    this.firestore.collection(this.juego).valueChanges().subscribe((res)=>{
      console.log('res',res);
      res = res.sort((a:any,b:any) => {return b.puntuacion - a.puntuacion})
      this.puntuaciones=res;
    })
  }

}
