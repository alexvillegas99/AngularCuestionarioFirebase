import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }
error=false;
pin='';
  ngOnInit(): void {
  }
  ingresar(){
   //Validad si el usuario ingreso un PIN
   if(this.pin===''){
     this.error=true;
     setTimeout(() => {
       this.error=false;
     }, 3000);
   } 
  }
}
