import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(private auth:AuthService, private router:Router) { 

  }

  ngOnInit(): void {
    
  }

  logout(){
    Swal.fire({
      title: 'Hasta luego!',
      confirmButtonText: 'Continuar'
    }).then(()=>{
      this.auth.Logout();
      this.auth.user=null;
      this.router.navigateByUrl('');    
    })
  }

  verificarLogin(){
    if(this.auth.user){
      return true;
    }
    return false;
  }
}
