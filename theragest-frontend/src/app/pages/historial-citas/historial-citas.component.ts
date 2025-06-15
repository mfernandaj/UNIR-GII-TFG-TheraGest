import { Component, OnInit } from '@angular/core';
import { Cita, CitaService } from '../../services/cita.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historial-citas',
  templateUrl: './historial-citas.component.html',
  styleUrls: ['./historial-citas.component.css']
})
export class HistorialCitasComponent implements OnInit {
  
  citas: Cita[]=[];
  pacienteId!:number;

  constructor(
    private route: ActivatedRoute,
    private citaService: CitaService
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
      },
      error: (err)=>console.error('No se puudieron cargar las citas del paciente', err)
      
    });
  }

  
  

}
