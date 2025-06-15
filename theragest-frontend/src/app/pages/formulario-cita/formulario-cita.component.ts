import { Component, OnInit } from '@angular/core';
import { Cita, CitaService } from '../../services/cita.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente, PacienteService } from '../../services/paciente.service';
import { AlertaService } from '../../services/alerta.service';
import Swal from 'sweetalert2';

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
    private router: Router,
    private alertaService: AlertaService

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
          this.alertaService.mostrarError("No se pudo cargar la cita");
          this.router.navigate(['/citas']);
        }

      });

    }
  }

  private crearCita(): void {
    this.citaService.crearCita(this.cita).subscribe({
      next: () => {
        this.alertaService.mostrarExito("Cita registrada correctamente");
        this.router.navigate(['/citas']);
      },
      error: (err) => {
        console.error("Error al guardar la cita", err);
        this.alertaService.mostrarError("Hubo un error al guardar la cita");

      }
    });

  }

  private enviarActualizacion(): void {
    this.citaService.actualizarCita(this.cita.id, this.cita).subscribe({
      next: () => {
        this.alertaService.mostrarExito("Cita actualizada correctamente");
        this.router.navigate(['/citas']);
      },
      error: (err) => {
        console.error("Error al actualizar la cita", err);
        this.alertaService.mostrarError("Hubo un error al actualizar la cita");
      }
    });
  }                       

  private actualizarCita(): void {
    this.citaService.obtenerCitas().subscribe({
      next: (citasExistentes) => {
        const fechaNueva = new Date(this.cita.fechaCita).toISOString().slice(0, 16);
  
        const conflicto = citasExistentes.find(citaExistente => {
          const mismaFecha = new Date(citaExistente.fechaCita).toISOString().slice(0, 16) === fechaNueva;
          const distintaCita = citaExistente.id !== this.cita.id;
          return mismaFecha && distintaCita;
        });
  
        if (conflicto) {
          const fechaFormateada = new Date(conflicto.fechaCita).toLocaleString('es-ES', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          });
  
          this.alertaService.mostrarConfirmacion(
            `Ya tienes una cita registrada para el <b>${fechaFormateada}</b> con <b>${conflicto.paciente.nombre}</b>.<br><br>¿Deseas continuar?`,
            'Sí, actualizar',
            'Cancelar',
            'Ya hay una cita a esa hora',
            'warning',
            true
          ).then(confirmado => {
            if (confirmado) {
              this.enviarActualizacion();
            }
          });
  
        } else {
          this.enviarActualizacion();
        }
      },
      error: (err) => {
        console.error("Error al comprobar citas existentes", err);
        this.alertaService.mostrarError("Hubo un error al verificar las citas");
      }
    });
  }

  guardarCita(): void {
    if (this.esEdicion) {
      this.actualizarCita();
    } else {
      this.citaService.obtenerCitas().subscribe({
        next: (citasExistentes) => {
          const conflicto = citasExistentes.find(citaExistente =>{
            const fechaNueva = new Date(this.cita.fechaCita).toISOString().slice(0,16);
            const fechaExistente=new Date(citaExistente.fechaCita).toISOString().slice(0,16);
            return fechaNueva===fechaExistente;
            
          }
         
           
          );
  
          if (conflicto) {
            const fechaFormateada = new Date(conflicto.fechaCita).toLocaleString('es-ES', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            });
  
            this.alertaService.mostrarConfirmacion(
              `Ya tienes una cita registrada para el <b>${fechaFormateada}</b> con <b>${conflicto.paciente.nombre}</b>.<br><br>¿Deseas continuar?`,
              'Sí, continuar',
              'Cancelar',
              'Ya hay una cita a esa hora',
              'warning',
              true // usar HTML
            ).then(confirmado => {
              if (confirmado) {
                this.crearCita();
              }
            });
  
          } else {
            this.crearCita();
          }
        },
        error: (err) => {
          console.error("Error al comprobar citas existentes", err);
          this.alertaService.mostrarError("Hubo un error al verificar las citas");
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
