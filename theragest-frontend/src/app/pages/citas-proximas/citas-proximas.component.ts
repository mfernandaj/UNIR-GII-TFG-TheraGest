import { Component, OnInit } from '@angular/core';
import { Cita, CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-citas-proximas',
  templateUrl: './citas-proximas.component.html',
  styleUrl: './citas-proximas.component.css'
})
export class CitasProximasComponent implements OnInit{
  citasProximas: Cita[] = [];

  constructor(private citaService: CitaService) {
  
    }
  ngOnInit(): void {
    this.citaService.obtenerCitasProximas().subscribe({
      next: (data) => {
                this.citasProximas = data.sort((a, b)=>new Date(a.fechaCita).getTime()-new Date(b.fechaCita).getTime());

      }, error: (err) => console.error('Error al obtener citas próximas', err)
    });
  }

}
