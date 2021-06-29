import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
;
import { Cuestionario } from '../../../models/cuestionario';
import { QuizzService } from '../../../services/quizz.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit, OnDestroy {
  sucriptionUser: Subscription = new Subscription();
  sucriptionQuizz: Subscription = new Subscription();
  listCuestionario: Cuestionario[] = [];
loading=true;
  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private quizzService:QuizzService,
              private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.sucriptionUser = this.afAuth.user.subscribe(user => {
      if (user && user.emailVerified) {
        this.getCuestionarios(user.uid);
      } else {
        this.router.navigate(['/']);
      }
    })
  }
  ngOnDestroy(): void {
    this.sucriptionUser.unsubscribe();
    this.sucriptionQuizz.unsubscribe();
  }
  getCuestionarios(user: string) {
   
   this.sucriptionQuizz= this.quizzService.getCuestionarioByUser(user).subscribe(data=>{
      this.listCuestionario =[];
      this.loading=false;
      data.forEach((element:any) => {
        this.listCuestionario.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
    }, error=>{
      this.loading=false;
    });
    
  }
eliminarCuestionario(id:string){
  this.loading=true;
  this.quizzService.deleteCuestionario(id).then(data=>{
  this.toastr.success('El cuestionario fue eliminado con exito','Cuestionario eliminado');
  this.loading=false;
  }).catch(()=>{
    this.toastr.error('No se pudo eliminar el cuestionario','Error');
    this.loading=false;
  })
}

}
