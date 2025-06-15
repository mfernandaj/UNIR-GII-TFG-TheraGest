import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  //title = 'theragest-frontend';
  autenticado = false;
  usuarioLogueado: string | null = null;
  mostrarMenu = true;
  
  

  constructor(private authService: AuthService, private router: Router) { 
    this.router.events.subscribe(()=>{
    const rutaActual = this.router.url;
    this.autenticado=this.authService.estaAutenticado();
    this.usuarioLogueado=this.authService.obtenerUsuario();
    
    //se oculta el menú si estamos en /login
      this.mostrarMenu = this.autenticado && !rutaActual.includes('login')&&!rutaActual.includes('dashboard');
    });
  }

  ngOnInit(): void {
    this.autenticado=this.authService.estaAutenticado();
    this.usuarioLogueado = this.authService.obtenerUsuario();
   
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
    //this.autenticado=false;
  }
  

  
}
