import { Component, OnInit } from '@angular/core';
import { Cita, CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-notificaciones-citas',
  templateUrl: './notificaciones-citas.component.html',
  styleUrl: './notificaciones-citas.component.css'
})
export class NotificacionesCitasComponent implements OnInit {

  citasProximas: Cita[] = [];

  constructor(private citaService: CitaService) {

  }

  ngOnInit(): void {
    this.citaService.obtenerCitasProximas().subscribe({

      next: (data) => this.citasProximas = data,
      error: (err) => console.error('Error al obtener citas próximas', err)
    });
  }


}
