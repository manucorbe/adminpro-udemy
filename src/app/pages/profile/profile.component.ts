import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  guardar(usuario: Usuario){
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe(resp=>{

      });
  }

  seleccionImagen(archivo: File){
    if (!archivo){
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image')<0){
      swal('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () =>{
      this.imagenTemp = reader.result as string;
    }
  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
