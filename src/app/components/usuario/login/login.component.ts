import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private route: Router) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
  }

  login() {
    const usaurio = this.loginForm.get('usuario')?.value;
    const pass = this.loginForm.get('password')?.value;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(usaurio, pass)
      .then((respuesta) => {
        if (!respuesta.user?.emailVerified) {
          this.route.navigate(['/usuario/verificarCorreo']);
        } else {
          this.setLocalStorage(respuesta.user);
         this.route.navigate(['/dashboard']);
        }
        this.loading = false;

      }, error => {
        this.loading = false;
        this.toastr.error(this._errorService.error(error.code), 'Opss ocurrio un error.');
      })
  }
  setLocalStorage(user:any){
    const usuario:User={
      uid:user.uid,
      email:user.email
    }
    localStorage.setItem('usuario',JSON.stringify(usuario));
  }
}
