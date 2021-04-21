import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading=false;
  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private route: Router,
    private toastr: ToastrService,
    private _errorService:ErrorService) {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', [Validators.required]]
    },
      { validators: this.checkPassword })
  }

  ngOnInit(): void {
  }
  registrar() {
    const usuario = this.registerForm.get('usuario')?.value;
    const password = this.registerForm.get('password')?.value;
    this.loading=true;
    this.afAuth.createUserWithEmailAndPassword(usuario, password)
      .then(rta => {
      rta.user?.sendEmailVerification();
        this.toastr.success('Enviamos un correo para verificar su cuenta!.', 'Usuario registrado.');
        this.route.navigate(['/usuario']);
      }).catch(error => {
        this.loading=false;
        this.toastr.error(this._errorService.error(error.code), 'Opss ocurrio un error.');
      })
  }
  /* error(code: string): string {
    switch (code) {
      //Email ya registrado
      case 'auth/email-already-in-use':
        return 'El correo ya esta registrado.';
      case 'auth/invalid-email':
        return 'El correo es invalido.';
      case 'auth/weak-password':
        return 'La contraseña es muy debil.'
      default:
        return 'Error desconocido';

    }

  } */
  checkPassword(group: FormGroup): any {
    const pass = group.controls.password?.value;
    const confirmarPass = group.controls.repetirPassword?.value;
    return pass === confirmarPass ? null : { notSame: true }
  }

}
