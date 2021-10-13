import { Component, OnInit } from '@angular/core';
import { MinLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { ScoresService } from 'src/app/services/scores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matematica',
  templateUrl: './matematica.component.html',
  styleUrls: ['./matematica.component.css']
})
export class MatematicaComponent implements OnInit {

  ecuacion;
  score=0;
  signos=['+','-','x'];

  min=1;
  max=50;
  opciones=[];
  correcta;
  constructor(private scoreSvc:ScoresService, private router:Router) { }

  ngOnInit(): void {

    this.IniciarJuego();
  }

  IniciarJuego(){
    this.opciones=[];
    for (let i = 0; i < 4; i++) {
      
      var numero1 = Math.floor(Math.random() * (this.max - this.min) + this.min);
      console.log('numero 1',numero1);
      var numero2 = Math.floor(Math.random() * (this.max - this.min) + this.min);
      console.log('numero 2',numero2);
      
      var numeroSigno = Math.floor(Math.random() * (2 - 0) + 0);

      if(i==0){
        this.ecuacion=numero1.toString() + ' ' + this.signos[numeroSigno] + ' ' + numero2.toString(); 
        console.log(this.ecuacion);
      }
      
      let resultado;
      switch (numeroSigno) {
        case 0:
          this.opciones.push(numero1 + numero2);
          if(i==0){
            this.correcta=numero1+numero2;
          }
          break;

        case 1:
          this.opciones.push(numero1 - numero2);
          if(i==0){
            this.correcta=numero1-numero2;
          }
          break;

        case 2:
          this.opciones.push(numero1 * numero2); 
          if(i==0){
            this.correcta=numero1*numero2;
          }
          break;
      }
      
    }
    
    console.log(this.correcta, ' correcta ');
    console.log(this.ecuacion , 'ecuacion');
    

    this.shuffleArray(this.opciones);
    console.log(this.opciones, 'opciones');

    
  }


  eleccion(elegido){
    console.log(this.opciones[elegido]);
    if(this.opciones[elegido] == this.correcta){
      this.IniciarJuego();
      this.score++;
    }
    else{
      Swal.fire({
      title: 'Lo siento! Ha perdido.',
      icon: 'success',
      confirmButtonText: 'Reiniciar Juego',
      showDenyButton: true,
        denyButtonText: `Responder encuesta`,
        allowOutsideClick: false
    }).then((result)=>{
      this.scoreSvc.guardarScore('matematica',localStorage.getItem('token'),this.score);

      if(result.isConfirmed){
        this.reiniciarJuego();
      }
      else if(result.isDenied){
        this.router.navigateByUrl('/encuesta');
      }
    });
      
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  reiniciarJuego(){
    
    this.score=0;
    this.opciones=[]
    this.IniciarJuego();

  }


  onChange(deviceValue) {
    switch (deviceValue.value) {
      case 'facil':
        this.min=1;
        this.max=50;
        break;
        case 'intermedio':
          this.min=1;
          this.max=150;
        
        break;
        case 'dificil':
          this.min=-150;
          this.max=150;
        break;

    }
    this.reiniciarJuego();
  }
}
