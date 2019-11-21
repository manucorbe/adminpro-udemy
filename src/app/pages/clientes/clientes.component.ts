import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente/cliente.service';
// import swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  sig: boolean = true;
  ant: boolean = false;
  cargando: boolean = true;
  busq: boolean = false;
  delete: boolean = false;

  constructor(
    public _clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  crearCliente(){
    swal({
      title: 'Añadir un nuevo Cliente',
      text: 'Inserta el Nombre del Cliente',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then()
  }

  cargarClientes(){
    this.cargando = true;
    if (this.desde === this.totalRegistros - 1 && this.delete === true){
      this.desde -= 5;
      this.delete = false;
    }
    this._clienteService.cargarClientes(this.desde)
      .subscribe((resp: any)=>{
        this.totalRegistros = resp.total;
        this.clientes = resp.clientes;
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
    this.cargarClientes();
  }
  
  buscarCliente(termino: string){
    this.busq = true;
    if (termino.length <= 0){
      this.busq = false;
      this.cargarClientes();
      return;
    }
    this.cargando = true;
    this._clienteService.buscarClientes(termino).subscribe((clientes: Cliente[])=>{
      this.desde = 0;
      this.busq = true;
      this.clientes = clientes;
      this.cargando = false;
      this.lockBotones();
    });
  }

  borrarCliente(cliente: Cliente){
    this.delete = true;
    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de borrar a ' + cliente.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }). then(borrar=>{
      if (borrar){
        this._clienteService.borrarCliente(cliente._id).subscribe((resp: any)=>{
          swal('Cliente borrado correctamente', cliente.nombre, 'success');
          this.cargarClientes();
        });
      }
    });
  }

  actualizarCliente(cliente: Cliente){
    this._clienteService.actualizarCliente(cliente).subscribe((resp: any)=>{
      swal('Cliente actualizado correctamente', cliente.nombre, 'success');
      this.cargarClientes();
    })
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
