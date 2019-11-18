import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  id: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    this.cargarStorage();
  }

guardarStorage(id: string, usuario: Usuario){
  localStorage.setItem('id', id);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  this.usuario = usuario;
  this.id = id;
}

cargarStorage(){
  if (localStorage.getItem('id')){
    this.id = localStorage.getItem('id');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  } else{
    this.id = '';
    this.usuario = null;
  }
}

estaLogueado(){
  return (this.id.length > 5 ) ? true : false;
}

logoutUsuario(){
  this.usuario = null;
  this.id = '';
  localStorage.removeItem('id');
  localStorage.removeItem('usuario');
  this.router.navigate(['/login']);
}

loginUsuario(usuario: Usuario, recordar: boolean = false){
  if (recordar){
    localStorage.setItem('email',usuario.email);
  } else {
    localStorage.removeItem('email');
  }
  let url = URL_SERVICIOS + 'login';
  
  return this.http.post(url, usuario).pipe(map((resp: any)=>{
    this.guardarStorage(resp.id, resp.usuario);
    swal('Has iniciado sesión correctamente', " ", 'success');
    return true;
  }))
}

crearUsuario(usuario: Usuario){
  let url = URL_SERVICIOS + 'usuario';

  return this.http.post(url, usuario).pipe(
    map((resp: any) =>{
      swal('Usuario creado correctamente', usuario.email, 'success');
      return resp.usuario;
  }));

}


}
