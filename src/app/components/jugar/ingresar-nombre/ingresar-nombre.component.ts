import { Component, OnInit } from '@angular/core';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit {
nombre='';
errorText='';
error=false;
  constructor(private respuestaQuizzService:RespuestaQuizzService,
              private router:Router) { }

  ngOnInit(): void {
    this.validarRefresh();
  }
  ingresarNombre(){
    if(this.nombre!==''){

   
    this.respuestaQuizzService.nombre=this.nombre;
    this.router.navigate(['/jugar/iniciarContador'])
  }else{
    this.errorMensaje('Ingrese su nombre.');
  }
  }
  errorMensaje(texto: string) {
    this.errorText = texto;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 4000);
  }
  validarRefresh(){
    if(this.respuestaQuizzService.cuestionario === undefined){
      this.router.navigate(['/inicio']);
    }
  }
}
