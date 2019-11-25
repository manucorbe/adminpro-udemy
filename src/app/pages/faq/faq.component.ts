import { Component, OnInit } from '@angular/core';
import { ComentarioService } from '../../services/comentario/comentario.service';
import { Comentario } from '../../models/comentario.model';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
declare var swal: any;


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {

  comentarios: Comentario [] = [];
  newComentario: Comentario = new Comentario('', '', '', 0, 0);

  constructor(
    public _comentarioService: ComentarioService,
    public router: Router
  ) { 

  }

  ngOnInit() {
    this.cargarComentarios();
  }

cargarComentarios(){
    this._comentarioService.cargarComentarios()
      .subscribe((resp: any) => {
        this.comentarios = resp.comentarios;
    });
  }


  guardarComentario(f: NgForm){
    if (f.invalid){
      return;
    }
    this.newComentario.usuario = localStorage.getItem('id');
    this._comentarioService.crearComentario(this.newComentario)
      .subscribe(comentario => {
        this.router.navigate(['/clientes']);
      });
    }

  sumarLike(comentario: Comentario){
    comentario.likes += 1;
    this.actualizarComentario(comentario);
  }

  actualizarComentario(comentario: Comentario){
    this._comentarioService.actualizarComentario(comentario).subscribe((resp: any) => {
      swal('Te ha gustado este comentario', comentario.titulo, 'success');
      this.router.navigate(['/faq/.']);
    });
  }

  cargarComentario(id: string){
    this._comentarioService.cargarComentarioID(id).subscribe((comentario: Comentario) => {
      this.newComentario = comentario;
  });
}

  }

