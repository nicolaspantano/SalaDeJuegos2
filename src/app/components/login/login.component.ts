import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LogsService } from 'src/app/services/logs.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : Usuario;
  @Output() seLogeo: EventEmitter<any> = new EventEmitter<any>();
  constructor(private auth:AuthService, private router:Router,private log:LogsService) { this.user = new Usuario() }

  ngOnInit(): void {
    
  }


  onLogin(){
  
   this.auth.Login(this.user.correo  ,this.user.password).then(()=>{
    Swal.fire({
      title: 'Inicio de sesion correcto!',
      icon: 'success',
      confirmButtonText: 'Continuar'
    }).then(()=>{
      this.auth.user=this.user;
      this.log.LogUsuario(this.user.correo);
      localStorage.setItem('token',this.user.correo);
      this.router.navigateByUrl('');
    });
   }).catch((e)=>{
    Swal.fire({
      title: 'Error!',
      text: e,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
   })
  }

  HardcodearUsuario(){
    this.user.correo = 'prueba1234@hotmail.com';
    this.user.password='12341234'
  }
}
