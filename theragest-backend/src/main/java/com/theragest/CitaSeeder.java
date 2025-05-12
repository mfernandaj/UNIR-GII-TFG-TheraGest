package com.theragest;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.theragest.modelo.Cita;
import com.theragest.modelo.Paciente;
import com.theragest.respositorio.CitaRepositorio;
import com.theragest.respositorio.PacienteRepositorio;

//Cargador de datos de prueba (seeder) para inicializar la base de datos con citas ejemplo

@Component
public class CitaSeeder implements CommandLineRunner {
	
	private final CitaRepositorio citaRepositorio;
	private final  PacienteRepositorio pacienteRepositorio;
	
	public CitaSeeder(CitaRepositorio citaRepositorio, PacienteRepositorio pacienteRepositorio) {
		this.citaRepositorio=citaRepositorio;
		this.pacienteRepositorio=pacienteRepositorio;
	}
	
	public void run(String...args) {
		if(citaRepositorio.count()==0) {
			
			Paciente paciente1 = new Paciente();
            paciente1.setNombre("Laura");
            paciente1.setApellidos("Pérez");
            paciente1.setTelefono("666777555");
            paciente1.setEmail("laura@example.com");
            paciente1.setObservacionesClinicas("Sin observaciones");
            
            pacienteRepositorio.save(paciente1);
			
			Cita cita1 =new Cita();
			cita1.setPaciente(paciente1);
			cita1.setFechaCita(LocalDateTime.of(2025,5,5,10,30));
			cita1.setMotivo("Dolor lumbar");
			cita1.setEmail("laura@example.com");
			cita1.setTelefono("666777555");
			cita1.setObservaciones("primera sesión");
			citaRepositorio.save(cita1);
			System.out.println("Cita de prueba insertada");
			
			
			Paciente paciente2 = new Paciente();
			paciente2.setNombre("Carlos");
			paciente2.setApellidos("Rodruiguez");
			paciente2.setTelefono("666777555");
			paciente2.setEmail("Carlos@example.com");
			paciente2.setObservacionesClinicas("Reumatimos");
            pacienteRepositorio.save(paciente2);
			
			Cita cita2 = new Cita();
            cita2.setPaciente(paciente2);
            cita2.setFechaCita(LocalDateTime.of(2025, 4, 1, 12, 0));
            cita2.setMotivo("Revisión post-operatoria");
            cita2.setTelefono("699654321");
            cita2.setEmail("carlos@example.com");
            cita2.setObservaciones("Ya ha acudido antes");
            citaRepositorio.save(cita2);
			System.out.println("Cita de prueba insertada");
		}
		
	}
	

}
