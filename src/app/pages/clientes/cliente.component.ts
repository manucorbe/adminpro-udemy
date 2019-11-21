import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { Factura } from '../../models/factura.model';
import { ClienteService } from '../../services/cliente/cliente.service';
import { FacturaService } from '../../services/factura/factura.service';
import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = new Cliente('', '', '', '', '', '', '');
  id: string = null;

  imagenSubir: File;
  imagenTemp: string;
  imgShow: boolean = false;

  constructor(
    public _clienteService: ClienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { 
    activatedRoute.params.subscribe(params =>{
      this.id = params['id'];
      if (this.id != 'nuevo'){
        this.imgShow = true;
        this.cargarCliente(this.id);
      }
    });
  }

  ngOnInit() {
  }

  cargarCliente(id: string){
    this._clienteService.cargarClienteID(id).subscribe((cliente: Cliente) => {
      this.cliente = cliente;
  });
}

  guardarCliente(f: NgForm){
    if (f.invalid){
      return;
    }
    if (this.id != 'nuevo'){
      this._clienteService.actualizarCliente(this.cliente).subscribe(cliente =>{
        this.router.navigate(['/clientes']);
      });
    } else {
      this._clienteService.crearCliente(this.cliente)
      .subscribe(cliente =>{
        this.router.navigate(['/clientes']);
      });
    }
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
    this._clienteService.cambiarImagen(this.imagenSubir, this.cliente._id);
  }

}
