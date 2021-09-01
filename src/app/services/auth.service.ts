import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user;
  constructor(private bd:AngularFirestore, private router:Router, private afAuth: AngularFireAuth) {
    
   }

  Login(email:string, password: string){
    return new Promise((resolve, rejected) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(response => {
        localStorage.setItem('token',email);
        this.user=new Usuario();
        this.user.email=email;
        this.user.password=password;
        resolve(response);
        
        
      }, (error: any) => {
        console.log(error);
        switch (error.code) {
          case "auth/user-not-found":
            rejected("El usuario no existe");
            break;
          case "auth/invalid-email":
            rejected("email invalido");
            break;
          case "auth/wrong-password":
            rejected("clave incorrecta");
            break;
          default:
            rejected("ERROR");
            break;
        }
      });

    });
  }

  Register(){

  }

  isLogged(){
    if(this.user){
      return true;
    }
    return false;
  }
}
