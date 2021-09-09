import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  user: Usuario;
  constructor(private router:Router, private auth:AuthService, private log:LogsService) {
    this.user = new Usuario();
   }

  ngOnInit(): void {
  }

  onRegister(){
    
   this.auth.Register(this.user.correo  ,this.user.password).then(()=>{
    Swal.fire({
      title: 'Registro correcto',
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
}
