import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { Factura } from '../../models/factura.model';
import { ClienteService } from '../../services/cliente/cliente.service';
import { FacturaService } from '../../services/factura/factura.service';
import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: []
})
export class FacturaComponent implements OnInit {

  clientes: Cliente [] = [];
  factura: Factura = new Factura('', '', '', '', '', '', '', '');
  clienteL: Cliente = new Cliente('', '', '', '', '', '', '');
  id: string = null;

  imagenSubir: File;
  imagenTemp: string;
  imgShow: boolean = false;

  constructor(
    public _clienteService: ClienteService,
    public _facturaService: FacturaService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { 
    activatedRoute.params.subscribe(params =>{
      this.id = params['id'];
      if (this.id != 'nuevo'){
        this.imgShow = true;
        this.cargarFactura(this.id);
      }
    });
  }

  ngOnInit() {
    this._clienteService.cargarClientes()
      .subscribe((clientes: Cliente []) => {
        this.clientes = Object.values(clientes);
      });
  }

  cargarFactura(id: string){
    this._facturaService.cargarFacturaID(id).subscribe((factura: Factura) => {
      this.factura = factura;
  });
}

  guardarFactura(f: NgForm){
    if (f.invalid){
      return;
    }
    if (this.id != 'nuevo'){
      this._facturaService.actualizarFactura(this.factura).subscribe(factura =>{
        this.router.navigate(['/facturas']);
      });
    } else {
      this._facturaService.crearFactura(this.factura)
      .subscribe(factura =>{
        this.router.navigate(['/facturas']);
      });
    }
  }

  cambioCliente(id: String){
    this._clienteService.cargarClienteID(id).subscribe((cliente: Cliente) => {
      this.clienteL = cliente;
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
    this._facturaService.cambiarImagen(this.imagenSubir, this.factura._id);
  }

}
