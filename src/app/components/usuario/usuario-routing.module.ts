import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { RegisterComponent } from './register/register.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'recuperarPassword',component:RecuperarPasswordComponent},
  {path:'registro',component:RegisterComponent},
  {path:'verificarCorreo',component:VerificarCorreoComponent},
  {path:'registro',component:RegisterComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
