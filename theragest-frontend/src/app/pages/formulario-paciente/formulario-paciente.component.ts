import { Component } from '@angular/core';
import { Paciente, PacienteService } from '../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css'
})
export class FormularioPacienteComponent {

  paciente: Paciente = {
    id: 0,
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    observacionesClinicas: ''
  }
  esEdicion = false;
  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router,
    private alertaService: AlertaService) { }



  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.pacienteService.obtenerPacientePorId(+id).subscribe({
        next: (data) => this.paciente = data,
        error: (err) => {
          console.error('No se pudo cargar el paciente', err);
          this.alertaService.mostrarError('Error al cargar el paciente');
          this.router.navigate(['/pacientes']);
        }
      });
    }
  }

  guardarPaciente(): void {
    if (this.esEdicion) {
      this.pacienteService.actualizarPaciente(this.paciente.id, this.paciente).subscribe({
        next: () => {
          this.alertaService.mostrarExito("Paciente actualizado correctamente");
          this.router.navigate(['/pacientes']);
        },
        error: (err) => {
          console.error("Error al actualizar los datos del paciente", err);
          this.alertaService.mostrarError("Hubo un error al actualizar los datos del paciente");
        }
      });

    } else {
      this.pacienteService.crearPaciente(this.paciente).subscribe({
        next: () => {
         this.alertaService.mostrarExito('Paciente registrado correctamente');
          this.router.navigate(['/pacientes']); // ajusta según tu ruta
        },
        error: (err) => {
          console.error('Error al registrar el paciente', err);
          this.alertaService.mostrarError('Error al registrar el paciente');
        }
      });

    }

  }

}
