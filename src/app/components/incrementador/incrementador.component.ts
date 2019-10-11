import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso: number = 50;
  // tslint:disable-next-line: no-input-rename
  @Input('nombre') leyenda: string = 'Leyenda';

  // tslint:disable-next-line: no-output-rename
  @Output('actualizaValor') cambioValor: EventEmitter <number> = new EventEmitter();

  @ViewChild('txtProgress', null) txtProgress: ElementRef;

  constructor() {

  }

  ngOnInit() {

  }

  onChange(newValue: number) {

    // let elemHTML: any = document.getElementsByName('progreso')[0];
    // console.log(elemHTML.value);

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = Number (this.progreso);
    // tslint:disable-next-line: no-unused-expression
    this.txtProgress.nativeElement.value = Number (this.progreso);
    this.cambioValor.emit( this.progreso );
  }

  cambiarValor(numero: number) {
    if (this.progreso >= 100 && numero > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && numero < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso += numero;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

}
