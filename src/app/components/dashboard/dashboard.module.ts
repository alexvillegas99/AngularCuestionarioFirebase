import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { CrearQuizzComponent } from './crear-quizz/crear-quizz.component';
import { SharedModule } from '../shared/shared.module';
import { CrearPreguntaComponent } from './crear-pregunta/crear-pregunta.component';
import { ListPreguntasComponent } from './list-preguntas/list-preguntas.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListCuestionariosComponent,
    CrearQuizzComponent,
    CrearPreguntaComponent,
    ListPreguntasComponent,
    VerCuestionarioComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
