import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { pregunta } from '../models/pregunta';
import { Cuestionario } from '../models/cuestionario';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  tituloCuestionario: string = '';
  descripcionCuestionario: string = '';
  private preguntas = new Subject<pregunta>();

  constructor(private _firestore: AngularFirestore) { }

  agregarPregunta(pregunta: pregunta) {
    this.preguntas.next(pregunta);
  }
  getPreguntas(): Observable<pregunta> {
    return this.preguntas.asObservable();
  }
  crearCuestionario(cuestionario: Cuestionario): Promise<any> {
    return this._firestore.collection('cuestionarios').add(cuestionario);
  }
  getCuestionarioByUser(uid: string):Observable<any> {
    return this._firestore.collection('cuestionarios', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }
  deleteCuestionario(id:string): Promise<any>{
    return this._firestore.collection('cuestionarios').doc(id).delete();
  }
  //Cuando se hace un get retorna un Observable y cuando se elimina una Promesa;
  getCuestionario(id:string): Observable<any> {
   return this._firestore.collection('cuestionarios').doc(id).get();
  }
}
