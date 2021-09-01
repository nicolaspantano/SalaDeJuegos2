import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user;
  constructor(private auth:AuthService, private router:Router) { this.user = new Usuario() }

  ngOnInit(): void {
    console.log(this.auth.isLogged(),this.auth.user);
  }



  onLogin(){

   this.auth.Login(this.user.correo  ,this.user.password).then(()=>{
     console.log('login success');
     this.router.navigateByUrl('');
   }).catch((e)=>{
     alert(e);
   })
  }
}
