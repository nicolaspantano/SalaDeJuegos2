import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayormenorComponent implements OnInit {

  orden=['ACE','2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING'];
  cartas;
  cartaActual;
  cartaAnterior;
  puntaje=0;
  mensaje;
  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.peticionAjax();
  }


  peticionAjax() {
    this.cartas= new Array();
    this.http.get('https://deckofcardsapi.com/api/deck/new/draw/?count=52').subscribe((response) => {
      this.cartas = response['cards'];
      console.log(this.orden);
      this.cartaActual=this.cartas.pop();
    });

  }

  sacarCarta(eleccion){
    console.log('eleccion',eleccion)
    this.cartaAnterior=this.cartaActual;
    this.cartaActual = this.cartas.pop();
    var res = this.comparar(this.cartaActual,this.cartaAnterior);
    console.log('res',res);
    if(res==0){
      this.mensaje="COMODIN!! Las cartas tienen el mismo valor";
      
    }else{
      if(eleccion=='mayor'){
        if(res==1){
          this.puntaje++;
          this.mensaje='Excelente!';
        }
        else{
          this.terminarJuego();
        }
      }
      else{
        console.log('if',res==-1);
        if(res==-1){
          this.puntaje++;
          this.mensaje='Excelente';
        }
        else{
          this.terminarJuego();
        }
      }
    }

    console.log('carta actual',this.cartaActual);
    console.log('cartas restantes',this.cartas);
    
  }

  comparar(carta1,carta2){

    console.log('COMPARAR');
    let i1=this.orden.indexOf(carta1.value);
    let i2=this.orden.indexOf(carta2.value);
    if(i1>i2){
      return 1;
    }
    else if(i1<i2){
      return -1;
    }
    return 0;
  }

  terminarJuego(){
    this.mensaje="Ha perdido! Su puntuacion fue de : " + this.puntaje;
    this.peticionAjax();
    this.puntaje=0;
  }
}
