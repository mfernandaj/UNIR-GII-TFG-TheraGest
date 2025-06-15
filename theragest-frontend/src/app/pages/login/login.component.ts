import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombreUsuario='';
  contrasena='';
  mensajeError='';

  constructor(private authService: AuthService, private router:Router){}

iniciarSesion(): void{
  this.authService.login(this.nombreUsuario, this.contrasena).subscribe({
    next: (token: string) => {
      this.authService.guardarToken(token);
      this.authService.guardarUsuario(this.nombreUsuario);
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload(); // Esto refresca el AppComponent
      });
    },
    error: (err)=>{
      console.error(err);
      this.mensajeError = "Credenciales incorrectas"
    }
  });

}

}
