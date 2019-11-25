export class Comentario {
    constructor(
        public titulo: string,
        public comentario: string,
        public usuario: string,
        public likes?: number, 
        public dislikes?: number,
        public _id?: string,
    ){}
}