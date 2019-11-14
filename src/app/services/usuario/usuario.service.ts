import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) { 
    console.log('servicio de usuario listo');
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
