import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from './paciente.service';


export interface Cita  {

  id:number;
  paciente:  Paciente;
  fechaCita: string;
  motivo: string;
  telefono: string;
  email: string;
  observaciones: string;
  estado: string;
}

@Injectable ({
providedIn: 'root'
})

export class CitaService{

  //Esta URL obtiene el listado de todas las citas en el backend
  private apiUrl = "http://localhost:8080/api/citas";

  constructor(private http: HttpClient) { }

  obtenerCitas(): Observable<Cita[]>{
    return this.http.get<Cita[]>(this.apiUrl);
  }

  obtenerCitasPorId(id: number): Observable<Cita>{
    return this.http.get<Cita>(`${this.apiUrl}/${id}`);
  }

  crearCita(cita: Cita): Observable<Cita>{
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  actualizarCita(id: number, cita: Cita): Observable<Cita>{
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, cita);
  }
  cancelarCita(id: number): Observable<Cita>{
    return this.http.put<Cita>(`${this.apiUrl}/${id}/cancelar`,{});
  }

}
