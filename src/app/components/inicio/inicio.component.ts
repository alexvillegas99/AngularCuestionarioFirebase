import { Component, OnInit, OnDestroy } from '@angular/core';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';
import { Cuestionario } from '../../models/cuestionario';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit , OnDestroy{

  constructor(private respuestaQuizz: RespuestaQuizzService,
              private router:Router) { }
  error = false;
  pin = '';
  errorText = '';
  loading = false;
  suscriptionCode:Subscription = new Subscription();
  ngOnInit(): void {
  }
  ngOnDestroy():void{
    this.suscriptionCode.unsubscribe();
  }
  ingresar() {

    //Validad si el usuario ingreso un PIN
    if (this.pin === '') {
      this.errorMensaje('Por favor ingrese un PIN.');
      return;
    }
    this.loading = true;
    this.suscriptionCode = this.respuestaQuizz.BuscarCodigo(this.pin).subscribe(data => {
    
      if (data.empty) {
        this.errorMensaje('PIN invalido');
        this.loading = false;
      }else{
        data.forEach((element:any) => {
          const cuestionario:Cuestionario={
            id:element.id,
            ...element.data()
          }
          this.respuestaQuizz.cuestionario=cuestionario;
          this.router.navigate(['/jugar']);
        });
     
        
      }
     
    },error=>{
      this.loading = false;
      console.log(error);
    })
  }
  errorMensaje(texto: string) {
    this.errorText = texto;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 4000);
  }
}
