import { Component, OnInit, OnDestroy } from '@angular/core';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { Cuestionario } from '../../../models/cuestionario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css']
})
export class RealizarQuizzComponent implements OnInit, OnDestroy {
  cuestionario!: Cuestionario;
  nombreParticipante: string = '';
  indexPregunta = 0;
  segundos = 0;
  setInterval: any;
  opcionSeleccionada: any;
  indexSeleccionado: any;
  cantidadCorrectas = 0;
  cantidadIncorrectas = 0;
  puntosTotales = 0;
  listRespuestaUsuario: any[] = [];
  loading=false;
  constructor(private _RespuestaQuizzService: RespuestaQuizzService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cuestionario = this._RespuestaQuizzService.cuestionario;
    this.nombreParticipante = this._RespuestaQuizzService.nombre;
    this.validateRefresh();
    this.iniciarContador();
  }
  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }
  validateRefresh() {
    if (this.cuestionario === undefined) {
      this.router.navigate(['/inicio']);
    }
  }
  obtenerSegundos(): number {
    return this.segundos;
  }
  obtenerTitulo(): string {
    return this.cuestionario.listPreguntas[this.indexPregunta].titulo;
  }
  iniciarContador() {
    this.segundos = this.cuestionario?.listPreguntas[this.indexPregunta].segundos;
    this.setInterval = setInterval(() => {
      if (this.segundos === 0) {
        this.agregarRespuesta();
      }
      this.segundos--;
    }, 1000)
  }
  repuestaSeleccionada(respuesta: any, index: number) {
    this.opcionSeleccionada = respuesta;
    this.indexSeleccionado = index;
  }

  addClassOption(respuesta: any): string {
    if (respuesta === this.opcionSeleccionada) {
      return 'classSeleccionada';
    } else { return '' }
  }
  siguiente() {
    this.agregarRespuesta();
  }
  agregarRespuesta() {

    //Incrementar contadores Correcta y incorrecta 
    this.contadorCorrectaIncorrecta();

    //Crear obbjeto respuesta y agregar al array.
    const respuestasUsuario: any = {
      titulo: this.cuestionario.listPreguntas[this.indexPregunta].titulo,
      puntosObtenidos: this.obtenerPuntosPregunta(),
      segundos: this.obtenerSegundosUtilizados(),
      indexRespuestaSeleccionada: this.obtenerIndexSeleccionado(),
      listRespuesas: this.cuestionario.listPreguntas[this.indexPregunta].listRespuestas
    }
    this.listRespuestaUsuario.push(respuestasUsuario);
    this.opcionSeleccionada = undefined;
    this.indexSeleccionado = undefined;

    if (this.cuestionario.listPreguntas.length - 1 === this.indexPregunta) {
      //GuardarRespuestas en firebase.
      this.guardarRespuestaCuestionario();
      //Redireccionar al siguiente

      clearInterval(this.setInterval);
    } else {
      clearInterval(this.setInterval);
      this.indexPregunta++;
      this.segundos = this.cuestionario?.listPreguntas[this.indexPregunta].segundos;
      this.iniciarContador();
    }

  }
  obtenerPuntosPregunta(): number {
    const puntosPregunta = this.cuestionario.listPreguntas[this.indexPregunta].puntos;
    if (this.opcionSeleccionada === undefined) {
      return 0;
    }
    //Validar si la pregunta es correcta
    if (this.opcionSeleccionada.esCorrecta) {
      this.puntosTotales = this.puntosTotales + puntosPregunta;
      return puntosPregunta;
    } else {
      return 0;
    }
  }
  obtenerSegundosUtilizados(): string {
    if (this.opcionSeleccionada === undefined) {
      return 'No respondio la pregunta'
    } else {
      const segundosPregunta = this.cuestionario.listPreguntas[this.indexPregunta].segundos;

      return String(segundosPregunta - this.segundos);
    }
  }
  obtenerIndexSeleccionado(): string {
    if (this.opcionSeleccionada === undefined) {
      return 'No respondio la pregunta';
    } else {
      return this.indexSeleccionado;
    }
  }
  contadorCorrectaIncorrecta(): number {
    //Validar si el usuario selecciono pregunta
    if (this.opcionSeleccionada === undefined) {
      return this.cantidadIncorrectas++;
    }
    //Preguntar si la opcion es incorrecta
    if (this.opcionSeleccionada.esCorrecta) {
      return this.cantidadCorrectas++;
    } else {
      return this.cantidadIncorrectas++;
    }
  }
  guardarRespuestaCuestionario() {
    this.loading=true;
    const respuestasCuestionario: any = {
      idCuestioanrio: this.cuestionario.id,
      nombreParticipante: this.nombreParticipante,
      fecha: new Date(),
      cantidadPreguntas: this.cuestionario.cantPreguntas,
      cantidadCorrectas: this.cantidadCorrectas,
      cantidadIncorrectas: this.cantidadIncorrectas,
      puntosTotal: this.puntosTotales,
      listRespuestasUsuario: this.listRespuestaUsuario
    }
    this._RespuestaQuizzService.GuardarRespuestas(respuestasCuestionario)
      .then(data => {
        this.toastr.success('Cuestionario terminado exitosamente', 'Felicitaciones!!!');

        this.router.navigate(['/jugar/respuestasUsuario', data.id]);
      }, error => {
        this.toastr.error('Error al guardar cuestionario', 'Error!!!');

        this.router.navigate(['/inicio']);
      });
  }
}
