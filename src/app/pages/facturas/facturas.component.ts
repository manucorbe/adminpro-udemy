import { Component, OnInit } from '@angular/core';
import { Factura } from '../../models/factura.model';
import { FacturaService } from '../../services/factura/factura.service';
// import swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: []
})
export class FacturasComponent implements OnInit {

  facturas: Factura[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  sig: boolean = true;
  ant: boolean = false;
  cargando: boolean = true;
  busq: boolean = false;
  delete: boolean = false;

  constructor(
    public _facturaService: FacturaService,
  ) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas(){
    this.cargando = true;
    if (this.desde === this.totalRegistros - 1 && this.delete === true){
      this.desde -= 5;
      this.delete = false;
    }
    this._facturaService.cargarFacturas(this.desde)
      .subscribe((resp: any)=>{
        this.totalRegistros = resp.total;
        this.facturas = resp.facturas;
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
    this.cargarFacturas();
  }
  
  buscarFactura(termino: string){
    this.busq = true;
    if (termino.length <= 0){
      this.busq = false;
      this.cargarFacturas();
      return;
    }
    this.cargando = true;
    this._facturaService.buscarFacturas(termino).subscribe((facturas: Factura[])=>{
      this.desde = 0;
      this.busq = true;
      this.facturas = facturas;
      this.cargando = false;
      this.lockBotones();
    });
  }

  borrarFactura(factura: Factura){
    this.delete = true;
    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de borrar a ' + factura.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }). then(borrar=>{
      if (borrar){
        this._facturaService.borrarFactura(factura._id).subscribe((resp: any)=>{
          swal('Factura borrado correctamente', factura.nombre, 'success');
          this.cargarFacturas();
        });
      }
    });
  }

  actualizarFactura(factura: Factura){
    this._facturaService.actualizarFactura(factura).subscribe((resp: any)=>{
      swal('Factura actualizado correctamente', factura.nombre, 'success');
      this.cargarFacturas();
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
