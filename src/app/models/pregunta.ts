import { respuesta } from "./respuesta";

export class pregunta {
    titulo: string;
    puntos: number;
    segundos: number;
    listRespuestas: respuesta[];
    constructor(titulo: string,
        puntos: number,
        segundos: number,
        listRespuestas: respuesta[]) {
        this.titulo = titulo;
        this.puntos = puntos;
        this.segundos = segundos;
        this.listRespuestas = listRespuestas;
    }
}