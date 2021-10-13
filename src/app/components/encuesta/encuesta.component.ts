import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/clases/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  estado="1";
  encuesta: Encuesta;
  form: FormGroup;
  constructor(private fb:FormBuilder, private encSvc:EncuestaService) { 
    this.encuesta = new Encuesta();
    this.encuesta.respuestaPuntuacion="1";
    this.encuesta.usuario = localStorage.getItem('token');
  }
  

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99), Validators.pattern('^[0-9]*$')]],
      telefono: ['',[Validators.required,Validators.max(9999999999),Validators.pattern('^[0-9]*$')]],
      conocer: ['',[Validators.required]],
      game: ['',[Validators.required]]
         });

}

isValid(field: string) {
  const validateField = this.form.get(field);
  let retorno = !validateField.valid && validateField.touched
  ? 'is-invalid'
  : validateField.touched
  ? 'is-valid'
  : '';
  console.log(retorno);
  return retorno;
}

Enviar(){
  this.encuesta.nombre=this.form.value.nombre;
  this.encuesta.apellido=this.form.value.apellido;
  this.encuesta.edad=this.form.value.edad;
  this.encuesta.telefono=this.form.value.telefono;
  this.encuesta.respuestaConocer=this.form.value.conocer;
  console.log(this.encuesta);
  this.encSvc.Crear(this.encuesta);
  this.estado='2';

}

changeGame(e){
  this.encuesta.respuestaJuego = e.target.value;
}

radioButtonSelect(e){
 this.encuesta.respuestaPuntuacion = e.target.value; 
}

}
