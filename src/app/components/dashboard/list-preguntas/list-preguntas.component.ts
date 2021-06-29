import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../../services/quizz.service';
import { pregunta } from '../../../models/pregunta';
import { Cuestionario } from '../../../models/cuestionario';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid'
import { User } from '../../../interfaces/user';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.css']
})
export class ListPreguntasComponent implements OnInit {

  constructor(private quizzService:QuizzService,
              private router:Router,
              private toastr: ToastrService) { 
    this.quizzService.getPreguntas().subscribe(data=>{
      this.listPreguntas.push(data);
      console.log(this.listPreguntas);
    })
  }
  loading=false;
listPreguntas:pregunta[]=[];
  ngOnInit(): void {
    if(this.quizzService.descripcionCuestionario==='' || this.quizzService.tituloCuestionario===''){
this.router.navigate(['/dashboard'])
    }
  }
  generarCodigo():string{
    return nanoid(6).toUpperCase();
  }
  eliminarPregunta(index:number){
    this.listPreguntas.splice(index,1);
  }
  finalizarCuestionario(){
    this.loading=true;
    const user:User= JSON.parse(localStorage.getItem('usuario') || '{}')
    const cuestionario:Cuestionario={
      uid:user.uid,
      titulo: this.quizzService.tituloCuestionario,
      descripcion:  this.quizzService.descripcionCuestionario,
      codigo:this.generarCodigo(),
      cantPreguntas:this.listPreguntas.length,
      fechaCreacion:new Date,
      listPreguntas:this.listPreguntas
    }
    this.quizzService.crearCuestionario(cuestionario)
    .then(data=>{
      this.loading=false;
      this.toastr.success('El cuestinario se guardo exitosamente.', 'Cuestionario Guardado.');
      this.router.navigate(['/dashboard']);
    }).catch(error=>{
      this.loading=false;
      this.toastr.error('El cuestinario no se guardo.', 'Error');
      this.router.navigate(['/dashboard']);
    })
  
  }
}
