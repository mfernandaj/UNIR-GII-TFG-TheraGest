import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  nombreUsuario: string | null= '';
  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.nombreUsuario= this.authService.obtenerUsuario();
    
  }

  cerrarSesion():void{
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
  

}
