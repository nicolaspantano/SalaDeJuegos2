import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Letra } from 'src/app/clases/letra';
import { ScoresService } from 'src/app/services/scores.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  letrasNoAdmitidas=['á','é','í','ó','ú'];
  letrasPalabra = [];
  palabraUsuario = [];
  palabra;
  intentos = 0;
  constructor(private http: HttpClient, private scoreSvc:ScoresService, private router:Router) {

  }

  ngOnInit(): void {
    this.pedirPalabra();
  }

  pedirPalabra() {
    this.http.get('https://palabras-aleatorias-public-api.herokuapp.com/random').subscribe((val) => {
      this.palabra = val['body']['Word'];
      let letrasPalabraAux=[];
      letrasPalabraAux = this.palabra.split('');
      this.letrasNoAdmitidas.forEach(element => {
        if(letrasPalabraAux.indexOf(element)!=-1){
          console.log(letrasPalabraAux,'Se cambia')
          this.pedirPalabra();
        }
      });
      letrasPalabraAux.forEach(e => {
        this.letrasPalabra.push(e);
        this.palabraUsuario.push('_');
      });
      console.log(this.palabraUsuario)
      console.log(this.letrasPalabra)
    })
  }

  elegirLetra(letra) {
    console.log(letra);
    let correcto = this.getAllIndexes(this.letrasPalabra, letra);
    console.log('correcto', correcto);
    if (correcto.length > 0) {
      correcto.forEach(i => {
        this.palabraUsuario[i] = this.letras[this.letras.indexOf(letra)];
      });

    } else {
      this.intentos++;
    }
    var index = this.letras.indexOf(letra);
    if (index !== -1) {
      this.letras.splice(index, 1);
    }
    this.ComprobarTerminar();
  }

  getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
      indexes.push(i);
    }
    return indexes;
  }



  ComprobarTerminar(){
    console.log('palabra usuario',this.palabraUsuario.toString());
    console.log('lettras paalabra',this.letrasPalabra.toString());
    if(this.palabraUsuario.toString()==this.letrasPalabra.toString()){
      console.log('gano');
      Swal.fire({
        title: 'Felicidades! Usted gano.',
        icon: 'success',
        confirmButtonText: 'Reiniciar Juego',
        showDenyButton: true,
        denyButtonText: `Responder encuesta`,
      }).then((result)=>{
         this.scoreSvc.guardarScore('ahorcado',localStorage.getItem('token'),this.intentos);

        if(result.isConfirmed){
          this.reiniciarJuego();
        }
        else{
          this.router.navigateByUrl('/encuesta');
        }
      });
      
    }
    else if(this.intentos==4){
      Swal.fire({
        title: 'Lo siento! Ha perdido',
        icon: 'error',
        confirmButtonText: 'Reiniciar Juego',
        showDenyButton: true,
        denyButtonText: `Responder encuesta`,
        allowOutsideClick: false
      }).then((result)=>{
        this.scoreSvc.guardarScore('ahorcado',localStorage.getItem('token'),this.intentos);

        if(result.isConfirmed){
          this.reiniciarJuego();
        }
        else if(result.isDenied){
          this.router.navigateByUrl('/encuesta');
        }
        
      });

    }
  }

  reiniciarJuego(){

    this.letras=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    this.intentos=0;
    this.letrasPalabra = [];
    this.palabraUsuario = [];
    this.pedirPalabra();
    console.log(this.letrasPalabra)
  }

}
