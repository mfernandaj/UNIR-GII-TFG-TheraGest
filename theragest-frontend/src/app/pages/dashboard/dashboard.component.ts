import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  nombreUsuario: string | null= '';

  constructor(private authService: AuthService, private router: Router, private alertaService: AlertaService ){

  }

  ngOnInit(): void {
    this.nombreUsuario= this.authService.obtenerUsuario();
    
  }

  cerrarSesion():void{
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
