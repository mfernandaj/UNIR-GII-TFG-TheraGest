import { Component, OnInit } from '@angular/core';
import { Paciente, PacienteService } from '../../services/paciente.service';
import { Router } from '@angular/router';
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrl: './lista-pacientes.component.css'
})
export class ListaPacientesComponent implements OnInit {

  pacientes: Paciente[] = [];
  terminoBusqueda: string = '';
  currentPage: number=1;
  itemsPage: number=5;//Ajusta páginación


  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private alertaService: AlertaService
  ) { }


  ngOnInit(): void {
    this.cargarPacientes();

    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) =>{
        //ordenar por ID descendente
        this.pacientes = data.sort((a,b)=>b.id - a.id);
        this.pacientesFiltrados.splice(0,this.pacientesFiltrados.length, ...this.pacientes);
      },
      error: (err) => {console.error('Error al obtener pacientes', err);}
    });
  }

  editarPaciente(id: number): void {
    this.router.navigate(['/editar-paciente', id]);
  }

  eliminarPaciente(id: number): void {
    this.alertaService.confirmarAccion('¿Estás segur&#64; de que deseas eliminar este paciente?', 'Esta acción no se puede deshacer.')
      .then(confirmado => {
        if (confirmado) {
          this.pacienteService.eliminarPaciente(id).subscribe({
            next: () => {
              this.alertaService.mostrarExito('Paciente eliminado correctamente');
              this.cargarPacientes(); // método para refrescar la lista
            },
            error: (err) => {
              if (err.status === 409) {
                this.alertaService.mostrarError('No se puede eliminar el paciente porque tiene citas asociadas');

              } else {
                this.alertaService.mostrarError('Hubo un problema al eliminar el paciente');
              }
            }
          });
        }

      });


  }

  cargarPacientes(): void {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => {
        console.error('Error al cargar pacientes', err);
        this.alertaService.mostrarError('Hubo un error al obtener los pacientes');
      }
    });
  }

  //búsqueda de pacientes
  get pacientesFiltrados(): Paciente[] {
   const termino = this.terminoBusqueda.trim().toLowerCase();

    if (!termino) {
      return this.pacientes;

    }
    return this.pacientes.filter(p => {
      const nombreCompleto = `${p.nombre} ${p.apellidos}`.toLowerCase();
      return(
        nombreCompleto.includes(termino)||
      p.nombre.toLowerCase().includes(termino) ||
      p.apellidos.toLowerCase().includes(termino) ||
      p.telefono.toLowerCase().includes(termino));
    
    });
          
  }

  //pacientes paginación

  get pacientesPaginados(): Paciente[]{
    const inicio = (this.currentPage -1) * this.itemsPage;
    return this.pacientesFiltrados.slice(inicio, inicio+this.itemsPage);

  }

  get totalPages(): number {
    return Math.ceil(this.pacientesFiltrados.length / this.itemsPage);
  }


}
