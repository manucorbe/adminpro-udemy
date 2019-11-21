import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
// import swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  sig: boolean = true;
  ant: boolean = false;
  cargando: boolean = true;
  busq: boolean = false;
  delete: boolean = false;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    if (this.desde === this.totalRegistros - 1 && this.delete === true){
      this.desde -= 5;
      this.delete = false;
    }
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any)=>{
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
        this.lockBotones();
    });
  }

  cambiarDesde(valor: number){
    
    if (this.busq === true){
      return;
    }
    if (this.desde < 0 || this.desde >= this.totalRegistros){
      return;
    }
    this.desde += valor;
  
    if (this.desde < 0){
      this.desde = 0;
      return;
    }
    if (this.desde >= this.totalRegistros){
      this.desde -= valor;
      return;
    }
    this.cargarUsuarios();
  }
  
  buscarUsuario(termino: string){
    this.busq = true;
    if (termino.length <= 0){
      this.busq = false;
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[])=>{
      this.desde = 0;
      this.busq = true;
      this.usuarios = usuarios;
      this.cargando = false;
      this.lockBotones();
    });
  }

  borrarUsuario(usuario: Usuario){
    this.delete = true;
    if (usuario._id === this._usuarioService.id){
      swal('No puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }). then(borrar=>{
      if (borrar){
        this._usuarioService.borrarUsuario(usuario._id).subscribe((resp: any)=>{
          swal('Usuario borrado correctamente', usuario.nombre, 'success');
          this.cargarUsuarios();
        });
      }
    });
  }

  lockBotones(){
    if (this.desde >= 5){
      this.ant = true;
    }
    if (this.desde < 5){
      this.ant = false;
    }
    if (this.desde >= this.totalRegistros - 5){
      this.sig = false;
    }
    if (this.desde < this.totalRegistros - 5){
      this.sig = true;
    }
    if (this.busq === true){
      this.ant = false;
      this.sig = false;
    }
  }


}
