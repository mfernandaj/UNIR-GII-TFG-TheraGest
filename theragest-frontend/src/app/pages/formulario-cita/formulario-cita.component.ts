import { Component, OnInit } from '@angular/core';
import { Cita, CitaService } from '../../services/cita.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente, PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html',
  styleUrl: './formulario-cita.component.css'
})
export class FormularioCitaComponent implements OnInit {

  pacientes: Paciente[] = [];

  cita: Cita = {
    id: 0,
    paciente: {
      id: 0,
      nombre: '',
      apellidos: '',
      telefono: '',
      email: '',
      observacionesClinicas: ''
    },
    fechaCita: '',
    motivo: '',
    telefono: '',
    email: '',
    observaciones: '',
    estado: 'ACTIVA'
  };

  esEdicion = false;
  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.obtenerPacientes();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.citaService.obtenerCitasPorId(+id).subscribe({
        next: (data) => this.cita = data,
        error: (err) => {
          console.error("Error al obtener cita para su edición", err);
          alert("No se pudo cargar la cita");
          this.router.navigate(['/citas']);
        }

      });

    }
  }
 guardarCita(): void {
    if (this.esEdicion) {
      this.citaService.actualizarCita(this.cita.id, this.cita).subscribe({

        next: () => {
          alert("Cita actualizada correctamente");
          this.router.navigate(['/citas']);
        },
        error: (err) => {
          console.error("Error al actualizar la cita", err);
          alert("Hubo un error al actualizar la cita");
        }
      });
    } else {
      this.citaService.crearCita(this.cita).subscribe({
        next: () => {
          alert("Cita registrada correctamente");
          this.router.navigate(['/citas']); // redirige a la lista de citas
        },
        error: (err) => {
          console.error("Error al guardar la cita", err);
          alert("Hubo un error al guardar la cita");
        }

      });
    }
  }

  obtenerPacientes(): void {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => console.error("Error al cargar pacientes", err)
    });
  }
}
