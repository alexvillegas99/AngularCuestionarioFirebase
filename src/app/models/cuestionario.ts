import { pregunta } from './pregunta';
export class Cuestionario {
    id?: string;
    uid: string;
    titulo: string;
    descripcion: string;
    codigo: string;
    cantPreguntas: number;
    fechaCreacion: Date;
    listPreguntas: pregunta[];
    constructor(
        _uid: string,
        _titulo: string,
        _descripcion: string,
        _codigo: string,
        _cantPreguntas: number,
        _fechaCreacion: Date,
        _listPreguntas: pregunta[]) {

        this.uid = _uid;
        this.titulo = _titulo;
        this.descripcion = _descripcion;
        this.codigo = _codigo;
        this.cantPreguntas = _cantPreguntas;
        this.fechaCreacion = _fechaCreacion;
        this.listPreguntas = _listPreguntas;

    }
}