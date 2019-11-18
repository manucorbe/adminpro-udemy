import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ){ }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1){
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {

    if (!forma.valid){
      return;
    }
    
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.loginUsuario(usuario, forma.value.recuerdame).subscribe( resp=>{
      this.router.navigate(['/dashboard']);
    });

 
  

    // this.router.navigate(['/dashboard']);
  }
}
