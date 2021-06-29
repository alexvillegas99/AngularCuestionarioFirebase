import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contador-inicial',
  templateUrl: './contador-inicial.component.html',
  styleUrls: ['./contador-inicial.component.css']
})
export class ContadorInicialComponent implements OnInit,OnDestroy {
setInterval:any;
  constructor(private router:Router) { }
contador=3;
  ngOnInit(): void {
    this.playContador();
  }
  playContador(){
this.setInterval = setInterval(()=>{
  if(this.contador===1){
this.router.navigate(['/jugar/realizarQuizz'])
  }
this.contador=this.contador-1;
},1000)
  }
  ngOnDestroy():void{
clearInterval(this.setInterval);
  }
}
