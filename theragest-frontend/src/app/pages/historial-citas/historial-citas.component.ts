import { Component, OnInit } from '@angular/core';
import { Cita, CitaService } from '../../services/cita.service';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-historial-citas',
  templateUrl: './historial-citas.component.html',
  styleUrls: ['./historial-citas.component.css']
})
export class HistorialCitasComponent implements OnInit {
  
  citas: Cita[]=[];
  pacienteId!:number;
  pacienteNombreCompleto: string = '';

  constructor(
    private route: ActivatedRoute,
    private citaService: CitaService,
    private pacienteService: PacienteService
  ){

  }

  
  ngOnInit(): void {
    this.pacienteId=+this.route.snapshot.paramMap.get('id')!;
    this.obtenerHistorial();
    
    
  }

  obtenerHistorial(): void{
    this.citaService.obtenerCitasPorPaciente(this.pacienteId).subscribe({
      next: (data)=>{
        
        this.citas=data.sort((a,b)=>new Date(b.fechaCita).getTime()-new Date(a.fechaCita).getTime());

        if (this.citas.length > 0 && this.citas[0].paciente) {
          const cita = this.citas[0];
          this.pacienteNombreCompleto = `${cita.paciente?.nombre || ''} ${cita.paciente?.apellidos || ''}`.trim();
        }else {
          // si no hay citas, obtenemos el nombre directamente
          this.pacienteService.obtenerPacientePorId(this.pacienteId).subscribe({
            next: (paciente) => {
              this.pacienteNombreCompleto = `${paciente.nombre} ${paciente.apellidos}`.trim();
            },
            error: (err) => console.error('No se pudo obtener el paciente', err)
          });
        }
      },
      error: (err)=>console.error('No se pudieron cargar las citas del paciente', err)
      
    });
  }

  
  

}
