import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertaService } from './services/alerta.service';

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
  
  

  constructor(private authService: AuthService, private router: Router, private alertaService: AlertaService) { 
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
    this.alertaService.confirmarCerrarSesion().then(confirmado => {
    if (confirmado) {
      this.authService.cerrarSesion();
      this.alertaService.mostrarMensajeDespedida().then(() => {
        this.router.navigate(['/login']);
      });
    }
  });
  }
  

  
}
