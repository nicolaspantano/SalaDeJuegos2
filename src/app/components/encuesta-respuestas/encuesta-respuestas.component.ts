import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-encuesta-respuestas',
  templateUrl: './encuesta-respuestas.component.html',
  styleUrls: ['./encuesta-respuestas.component.css']
})
export class EncuestaRespuestasComponent implements OnInit {

  respuestas;
  constructor(private firestore:AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection('encuesta').valueChanges().subscribe((res)=>{
      console.log(res);
      this.respuestas=res;
    })
  }

}
