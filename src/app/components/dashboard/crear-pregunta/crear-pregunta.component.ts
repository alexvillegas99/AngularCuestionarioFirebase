import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../../services/quizz.service';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.css']
})
export class CrearPreguntaComponent implements OnInit {

  constructor(private quizzService:QuizzService) { }

  ngOnInit(): void {
    console.log(this.quizzService.tituloCuestionario)
  }

}
