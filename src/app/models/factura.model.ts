export class Factura {
    constructor(
        public nombre: string,
        public fecha: string,
        public numero: string,
        public producto: string,
        public cantidad: string,
        public cliente: string,
        public img?: string,
        public _id?: string
    ){}
}