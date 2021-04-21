import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizzService } from '../../../services/quizz.service';

@Component({
  selector: 'app-crear-quizz',
  templateUrl: './crear-quizz.component.html',
  styleUrls: ['./crear-quizz.component.css']
})
export class CrearQuizzComponent implements OnInit {
cuestionarioForm:FormGroup;
mostrarError=false;
  constructor(private fb:FormBuilder,
    private router:Router,
    private quizzService:QuizzService) {
    this.cuestionarioForm=this.fb.group({
      titulo:['',Validators.required],
      descripcion:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }
  siguiente(){
      if(this.cuestionarioForm.invalid){
        this.mostrarError=true;
        setTimeout(() => {
          this.mostrarError=false;
        }, 2000);
      }else{
        this.quizzService.tituloCuestionario = this.cuestionarioForm.get('titulo')?.value;
        this.quizzService.descripcionCuestionario = this.cuestionarioForm.get('descripcion')?.value;
        this.router.navigate(['/dashboard/crearPreguntas']);
      }
  }
}
