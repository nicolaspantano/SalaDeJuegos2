import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  user;
  constructor(private router:Router) {
    this.user = new Usuario();
   }

  ngOnInit(): void {
  }

  onRegister(){
    
  }
}
