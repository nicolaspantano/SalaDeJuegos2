import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : Usuario;
  constructor(private bd:AngularFirestore, private router:Router, private afAuth: AngularFireAuth) {
    
   }

  Login(email:string, password: string){
    return new Promise((resolve, rejected) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(response => {
        localStorage.setItem('token',email);
        this.user=new Usuario();
        this.user.correo=email;
        this.user.password=password;
        this.BuscarRol(response.user.uid);
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

  Register(email:string, password:string){

    return new Promise<any>((resolve, rejected) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((response: any) => {

        resolve(response);
      }, (error: any) => {
        switch (error.code) {
          case "auth/weak-password":
            rejected("clave muy corta,minimo 6 caracteres");
            break;
          case "auth/invalid-email":
            rejected("email invalido");
            break;
          case "auth/wrong-password":
            rejected("clave invalida");
            break;
          case "auth/email-already-in-use":
            rejected("El correo ya se encuentra tomado");
            break;
          default:
            rejected("ERROR");
            break;
        }
      });
    });
  }

  isLogged(){
    if(this.user){
      return true;
    }
    return false;
  }

  currentUser(){
    return this.afAuth.currentUser;
  }

  Logout(){
    this.afAuth.signOut();
    localStorage.clear();
    this.user=null;
    
  }

  BuscarRol(uid){
    this.bd.collection('usuarios').doc(uid).valueChanges().subscribe((res)=>{
      this.user.rol=res['rol'];
    })
  }
}
