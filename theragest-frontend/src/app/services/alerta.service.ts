import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  mostrarExito(mensaje: string): void {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: mensaje,
      confirmButtonColor: '#48b47e',
    });
  }

  mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonColor: '#48b47e',
    });
  }

  mostrarConfirmacion(
    mensaje: string,
    textoConfirmar: string = 'Sí',
    textoCancelar: string = 'No',
    titulo: string = '¿Estás segur@?',
    icono: 'question' | 'warning' | 'info' | 'error' = 'question',
    usarHtml: boolean = false
  ): Promise<boolean> {
    return Swal.fire({
      icon: icono,
      title: titulo,
      [usarHtml ? 'html' : 'text']: mensaje,
      showCancelButton: true,
      confirmButtonText: textoConfirmar,
      cancelButtonText: textoCancelar,
      confirmButtonColor: '#48b47e',
      cancelButtonColor: '#6c757d'
    }).then(resultado => resultado.isConfirmed);
  }

  confirmarAccion(titulo: string, texto: string): Promise<boolean> {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#48b47e',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Descartar'
    }).then(result => result.isConfirmed);
  }

  confirmarCerrarSesion(): Promise<boolean> {
    return Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Deseas salir de tu cuenta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#48b47e',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',  
      reverseButtons: true 
      
    }).then(result => result.isConfirmed);
  }

  mostrarMensajeDespedida(): Promise<void> {
    return Swal.fire({
      title: '¡Gracias por usar TheraGest!',
      text: 'Hasta pronto',
      icon: 'success',
      showConfirmButton: false,
      timer: 5000
    }).then();
  }

}

