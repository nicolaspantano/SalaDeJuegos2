import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoresService } from 'src/app/services/scores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  paises = [];
  paisesTodos;
  paisActual;
  puntuacion;
  constructor(private http: HttpClient, private scoreSvc:ScoresService, private router:Router) { }

  ngOnInit(): void {
    this.peticionAjax();
  }

  peticionAjax() {

    return this.http.get('https://restcountries.com/v3.1/all').subscribe((response) => {
      this.puntuacion=0;
      this.paisesTodos = response;
      this.iniciarJuego();
    });


  }

  iniciarJuego(){
    
    this.paisActual=null;
    this.paises=[];
    for (let i = 0; i < 4; i++) {

      var numero = Math.floor(Math.random() * (249 - 0) + 0);
      
      if(i==0){
        this.paisActual=this.paisesTodos[numero];
      }

      this.paises.push(this.paisesTodos[numero]);
      
    }
    console.log(this.paisActual);

  }

  elegir(id){

    if(this.paises[id]==this.paisActual){
      console.log('gano');
      this.puntuacion++;
      this.iniciarJuego();
    }
    else{
      Swal.fire({
        title:'Ha perdido',
        text: 'Puntuacion final: ' + this.puntuacion,
        icon: 'error',
        confirmButtonText: 'Reiniciar juego',
        showDenyButton: true,
        denyButtonText: `Responder encuesta`,
        allowOutsideClick: false
      }).then((result)=>{
        
        this.scoreSvc.guardarScore('preguntados',localStorage.getItem('token'),this.puntuacion);
        
        if(result.isConfirmed){
          this.puntuacion=0;
        this.iniciarJuego();
        }
        else if(result.isDenied){
          this.router.navigateByUrl('/encuesta');
        }
        
        
      })
    }
  }
}