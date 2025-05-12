import { Component, OnInit } from '@angular/core';
import { Paciente, PacienteService } from '../../services/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrl: './lista-pacientes.component.css'
})
export class ListaPacientesComponent implements OnInit {

  pacientes: Paciente[] = [];

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.cargarPacientes();

    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => console.error('Error al obtener pacientes', err)
    });


  }

  editarPaciente(id: number): void {
    this.router.navigate(['/editar-paciente', id]);
  }
  
  eliminarPaciente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacienteService.eliminarPaciente(id).subscribe({
        next: () => {
          alert('Paciente eliminado correctamente');
          this.cargarPacientes(); // método para refrescar la lista
        },
        error: (err) => {
          if(err.status === 409){
            alert('No se puede eliminar el paciente porque tiene citas asociadas');

          }else{

          }
        
          alert('Hubo un problema al eliminar el paciente');
        }
      });
    }
  }
  cargarPacientes(): void {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => {
        console.error('Error al cargar pacientes', err);
        alert('Hubo un error al obtener los pacientes');
      }
    });
  }

}
