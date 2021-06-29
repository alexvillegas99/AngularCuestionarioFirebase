import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cuestionario } from '../models/cuestionario';

@Injectable({
  providedIn: 'root'
})
export class RespuestaQuizzService {
cuestionario!:Cuestionario;
nombre:string='';
  constructor(private firestore:AngularFirestore) { }
  BuscarCodigo(code:string):Observable<any>{
    return this.firestore.collection('cuestionarios',ref=>ref.where('codigo','==',code)).get(); 
  }
  GuardarRespuestas(respuestas:any):Promise<any>{
   return this.firestore.collection('respuestas').add(respuestas);
  }
  getRespuestaUsuario(id:string):Observable<any>{
    return this.firestore.collection('respuestas').doc(id).get();
  }
}
