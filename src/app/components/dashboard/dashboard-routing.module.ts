import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { CrearQuizzComponent } from './crear-quizz/crear-quizz.component';
import { CrearPreguntaComponent } from './crear-pregunta/crear-pregunta.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';

const routes: Routes = [
  {
    path:'',
    component:ListCuestionariosComponent
  },
  {
    path:'crearQuizz',
    component:CrearQuizzComponent
  },
  {
    path:'crearPreguntas',
    component:CrearPreguntaComponent
  },
  {
    path:'verCuestionario/:id',
    component:VerCuestionarioComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
