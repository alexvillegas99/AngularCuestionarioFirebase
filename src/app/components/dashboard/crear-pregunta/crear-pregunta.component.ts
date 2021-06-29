import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../../services/quizz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { respuesta } from '../../../models/respuesta';
import { pregunta } from '../../../models/pregunta';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.css']
})
export class CrearPreguntaComponent implements OnInit {
  agregarPregunta: FormGroup;
  mostrarError = false;
  constructor(private quizzService: QuizzService,
    private fb: FormBuilder) {
    this.agregarPregunta = this.fb.group({
      titulo: ['', [Validators.required]],
      segundos: [10, [Validators.required]],
      puntos: [20, [Validators.required]],
      respuesta1: this.fb.group({
        titulo: ['', [Validators.required]],
        esCorrecta: [false, Validators.required]
      }),
      respuesta2: this.fb.group({
        titulo: ['', [Validators.required]],
        esCorrecta: [false, Validators.required]
      }),
      respuesta3: this.fb.group({
        titulo: [''],
        esCorrecta: [false]
      }),
      respuesta4: this.fb.group({
        titulo: [''],
        esCorrecta: [false]
      })
    })
  }

  ngOnInit(): void {
   
  }
  //getters
  get seg() { return this.agregarPregunta.get('segundos')?.value }
  get puntos() { return this.agregarPregunta.get('puntos')?.value }
  agregarPreg() {
    if (this.agregarPregunta.invalid || this.todasInorrectas()) {
      this.mostrarError = true;
    } else {
      this.mostrarError = false;
      let listRespuestas:respuesta[]=[];
      const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
    //Recorrer el array y setear todas las respuestas como false menos la que el usuario seleciona.
    for (let index = 0; index < array.length; index++) {
      const rtaTitulo = this.agregarPregunta.get(array[index])?.get('titulo')?.value;
      const esCorrecta = this.agregarPregunta.get(array[index])?.get('esCorrecta')?.value;
      const respuesta:respuesta={
        descripcion:rtaTitulo,
        esCorrecta:esCorrecta
      }
      if(rtaTitulo!==''){
        listRespuestas.push(respuesta);

      }
    }
      const tituloPregunta= this.agregarPregunta.get('titulo')?.value;
      const segundosPregunta= this.agregarPregunta.get('segundos')?.value;
      const puntosPregunta= this.agregarPregunta.get('puntos')?.value;
      const pregunta:pregunta={
        titulo:tituloPregunta,
        segundos:segundosPregunta,
        puntos:puntosPregunta,
        listRespuestas:listRespuestas
      }
      this.quizzService.agregarPregunta(pregunta);
      this.reset();
     
    }
  }
  reset(){
    this.agregarPregunta.patchValue({
      titulo:'',
      segundos:10,
      puntos:20,
      respuesta1:{
        titulo:'',
        esCorrecta:false
      },
      respuesta2:{
        titulo:'',
        esCorrecta:false
      },
      respuesta3:{
        titulo:'',
        esCorrecta:false
      },
      respuesta4:{
        titulo:'',
        esCorrecta:false
      }
    })
  }
  todasInorrectas(){
    const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
    //Recorrer el array y setear todas las respuestas como false menos la que el usuario seleciona.
    for (let index = 0; index < array.length; index++) {
      if(this.agregarPregunta.get(array[index])?.get('esCorrecta')?.value == true){
        return false;
      }
    }
   
    return true;
  }
  sumarRestar(numero: number) {
    if (this.seg + numero < 5) {
      return;
    }
    this.agregarPregunta.patchValue({
      segundos: this.seg + numero
    })
  }
  esCorrecta(numero: number) {
    const respuesta = 'respuesta' + String(numero);
    this.setFalseRespuestas(respuesta);
    const estadorta = this.obtenerEstadoRespuesta(respuesta);
    this.agregarPregunta.get(respuesta)?.patchValue({
      esCorrecta: !estadorta
    })
  }
  obtenerEstadoRespuesta(respuesta: string): boolean {
    return this.agregarPregunta.get(respuesta)?.get('esCorrecta')?.value;
  }
  setFalseRespuestas(nmtRespuesta: string) {
    const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4'];
    //Recorrer el array y setear todas las respuestas como false menos la que el usuario seleciona.
    for (let index = 0; index < array.length; index++) {
      if (array[index] !== nmtRespuesta) {
        this.agregarPregunta.get(array[index])?.patchValue({
          esCorrecta: false
        })
      } 
    }
  }
}
