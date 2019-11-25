import { Injectable } from '@angular/core';
import { Comentario } from '../../models/comentario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  comentario: Comentario;

  constructor(
    public http: HttpClient,
    public router: Router) { }

    crearComentario(comentario: Comentario){
      let url = URL_SERVICIOS + 'comentario';
      return this.http.post(url, comentario).pipe(
        map((resp: any) =>{
          swal('Se ha añadido tu comentario', comentario.titulo, 'success');
          return resp.comentario;
      }));
    }
    
    actualizarComentario(comentario: Comentario){
      let url = URL_SERVICIOS + 'comentario/' + comentario._id;
      return this.http.put(url, comentario).pipe(
        map((resp: any) =>{
          let comentarioDB: Comentario = resp.comentario;
          swal('Información actualizada correctamente', comentarioDB.titulo, 'success');
          return true;
      }));
    }
    
    cargarComentarios(){
      let url = URL_SERVICIOS + 'comentario';
      return this.http.get(url);
    }
    
    cargarComentarioID(id: String){
      let url = URL_SERVICIOS + 'comentario/' + id;
      return this.http.get(url).pipe(map((resp: any) => resp.comentario));
    }
    
    borrarComentario(id: string){
      let url = URL_SERVICIOS + 'comentario/' + id;
      return this.http.delete(url);
    }

}

