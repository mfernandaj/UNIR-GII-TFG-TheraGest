import { Component, OnInit } from '@angular/core';
import { Cita, CitaService } from '../../services/cita.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent implements OnInit {

  citas: Cita[] = [];


  constructor(
    private citaService: CitaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas(): void {
    this.citaService.obtenerCitas().subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error('Error al obtener citas', err)
    });
  }

  cancelarCita(id: number): void {
    if (confirm('¿Estás seguro que deseas cancelar esta cita?')) {
      this.citaService.cancelarCita(id).subscribe({
        next: (citaActualizada) => {
          //Actualizamos solo el estado de la cita afectada
          this.citas = this.citas.map(cita => cita.id === id ? { ...cita, estado: 'CANCELADA' } : cita);
          alert('Cita cancelada correctamente');
        },
        error: (err) => {
          console.error('Error al cancelar la cita', err);
          alert(err.error?.message || "Ocurrió un error al cancelar la cita");
        }
      });

    }

  }
  editarCita(id: number): void {
    this.router.navigate(['/editar-cita', id]);


  }

}
