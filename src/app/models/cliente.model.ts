export class Cliente {
    constructor(
        public nombre: string,
        public nif: string,
        public email: string,
        public tlf: string,
        public direccion: string,
        public img?: string,
        public _id?: string,
    ){}
}