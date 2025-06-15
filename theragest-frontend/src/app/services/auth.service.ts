import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:8080/api/auth";


  constructor(private http: HttpClient) { }

  login(nombreUsuario: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      nombreUsuario,
      contrasena
    }, { responseType: 'text' });

  }
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  cerrarSesion(): void{
    localStorage.removeItem('token');

  }
  guardarUsuario(nombreUsuario: string): void {
    localStorage.setItem('usuario', nombreUsuario);
  }
  
  obtenerUsuario(): string | null {
    return localStorage.getItem('usuario'); 
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }

}
