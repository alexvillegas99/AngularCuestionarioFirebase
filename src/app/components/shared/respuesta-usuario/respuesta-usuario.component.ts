import { Component, OnInit } from '@angular/core';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.component.html',
  styleUrls: ['./respuesta-usuario.component.css']
})
export class RespuestaUsuarioComponent implements OnInit {
respuestaCuestionario:any;
  constructor(private _respuestaQuizzService:RespuestaQuizzService,
              private route:ActivatedRoute,
              private router:Router) { }
id:string='';
loading=false;
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.getRespuestaUsuario();
    
  }
  getRespuestaUsuario(){
    this.loading=true;
    this._respuestaQuizzService.getRespuestaUsuario(this.id).subscribe(doc=>{
      if(!doc.exists){
        this.retornar();
        return;
      }
    this.respuestaCuestionario=doc.data();
      this.loading=false;
    },error=>{
      console.log(error);
      this.loading=false; 
    })
  }
  retornar(){
    this.router.navigate(['/']);
  }
}
