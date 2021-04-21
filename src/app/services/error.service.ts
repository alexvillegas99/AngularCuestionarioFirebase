import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  error(code: string): string {
    switch (code) {
      //Email ya registrado
      case 'auth/email-already-in-use':
        return 'El correo ya esta registrado.';
      case 'auth/invalid-email':
        return 'El correo es invalido.';
      case 'auth/weak-password':
        return 'La contraseña es muy debil.';
      case 'auth/user-not-found':
        return 'El usuario es invalido.'
      case 'auth/wrong-password':
        return 'El usuario o la contraseña no son validos.'
      default:
        return 'Error desconocido';

    }

  }
}
