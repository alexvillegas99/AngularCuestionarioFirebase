import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarForm: FormGroup;
  loading=false;
  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private route: Router,
    private toastr: ToastrService,
    private _errorService: ErrorService) {
    this.recuperarForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }
  recuperarPassword() {
    const usuario = this.recuperarForm.get('usuario')?.value;
    this.loading=true;
    this.afAuth.sendPasswordResetEmail(usuario).
      then(() => {
        this.toastr.info('Enviamos un correo electrónico para restablecer su contraseña.', 'Restablecer contraseña.')
        this.route.navigate(['/usuario']);
      }).catch(error => {
        this.toastr.error(this._errorService.error(error.code), 'Opss ocurrio un error.');
        this.loading=false;
        this.recuperarForm.reset();
      })
  }
}
