import { Component, OnInit } from '@angular/core';
import { Cita, CitaService } from '../../services/cita.service';
import { Router } from '@angular/router';
import { AlertaService } from '../../services/alerta.service';


@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent implements OnInit {

  citas: Cita[] = [];
  fechaInicio: string = '';
  fechaFin: string = '';
  estadoFiltro: string = '';
  currentPage: number = 1;
  itemsPage: number = 5;//Ajusta este valor según lo conveniente en la páginación
  busquedaPaciente: string = '';



  constructor(
    private citaService: CitaService,
    private router: Router,
    private alertaService: AlertaService
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
    this.alertaService.confirmarAccion('¿Cancelar cita?', 'Esta acción no se puede deshacer.')
      .then(confirmado => {
        if (confirmado) {
          this.citaService.cancelarCita(id).subscribe({
            next: (citaActualizada) => {
              this.citas = this.citas.map(cita =>
                cita.id === id ? { ...cita, estado: 'CANCELADA' } : cita
              );
              this.alertaService.mostrarExito('Cita cancelada correctamente');
            },
            error: (err) => {
              console.error('Error al cancelar la cita', err);
              this.alertaService.mostrarError(err.error?.message || 'Ocurrió un error al cancelar la cita');
            }
          });
        }
      });
  }
  editarCita(id: number): void {
    this.router.navigate(['/editar-cita', id]);


  }
  //finalizar cita
  finalizarCita(id: number): void {
    this.alertaService.confirmarAccion('¿Finalizar cita?', 'Esta acción no se puede deshacer.')
      .then(confirmado => {
        if (confirmado) {
          this.citaService.finalizarCita(id).subscribe({
            next: () => {
              this.citas = this.citas.map(cita =>
                cita.id === id ? { ...cita, estado: 'FINALIZADA' } : cita
              );
              this.alertaService.mostrarExito('Cita finalizada correctamente');
            },
            error: (err) => {
              console.error('Error al finalizar la cita', err);
              this.alertaService.mostrarError(err.error?.message || 'Ocurrió un error al finalizar la cita');
            }
          });
        }
      });
  }

  //Búsqueda de citas por fechas

  get citasFiltradas(): Cita[] {
    const filtradas = this.citas.filter(cita => {
      const fechaCita = new Date(cita.fechaCita);

      // Filtro por fechas
      const desde = this.fechaInicio ? new Date(this.fechaInicio) : null;
      const hasta = this.fechaFin ? new Date(this.fechaFin + 'T23:59:59') : null;
      const enRangoFecha =
        (!desde || fechaCita >= desde) &&
        (!hasta || fechaCita <= hasta);

      // Filtro por estado
      const coincideEstado =
        this.estadoFiltro === '' || cita.estado === this.estadoFiltro;
      //fitro por paciente
      const nombreCompleto = `${cita.paciente?.nombre || ''} ${cita.paciente?.apellidos || ''}`.toLowerCase();
      const coincidePaciente =
      !this.busquedaPaciente ||
      nombreCompleto.includes(this.busquedaPaciente.toLowerCase());


      return enRangoFecha && coincideEstado && coincidePaciente;
    });
    return filtradas.sort((a, b) => new Date(b.fechaCita).getTime() - new Date(a.fechaCita).getTime());
  }

  //busqueda por paciente


  //citas paginación
  get citasPaginadas(): Cita[] {
    const start = (this.currentPage - 1) * this.itemsPage;
    const end = start + this.itemsPage;

    return this.citasFiltradas.slice(start, end);

  }

  get totalPages(): number {
    return Math.ceil(this.citasFiltradas.length / this.itemsPage);
  }

  //Botón limpiar
  limpiar(): void {
    this.currentPage = 1;
    this.fechaInicio = '';
    this.fechaFin = '';
    this.estadoFiltro = '';
    this.busquedaPaciente='';
  }

}
