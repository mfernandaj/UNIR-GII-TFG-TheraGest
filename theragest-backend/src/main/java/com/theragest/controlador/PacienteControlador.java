package com.theragest.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.theragest.excepciones.ResourceNotFoundException;
import com.theragest.modelo.Paciente;
import com.theragest.respositorio.PacienteRepositorio;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "http://localhost:4200") // Para permitir peticiones desde Angular

public class PacienteControlador {
	
	@Autowired
	private PacienteRepositorio pacienteRepositorio;

	//Obtener todos los pacientes
	@GetMapping
	public List<Paciente> obtenerTodos(){
		return pacienteRepositorio.findAll();
	}
	
	//Registrar nuevo paciente 
	@PostMapping
	public Paciente crearPaciente(@RequestBody Paciente paciente) {
		return pacienteRepositorio.save(paciente);
		
	}
	//Obtener paciente por ID
	@GetMapping("/{id}")
	public ResponseEntity<Paciente> obtenerPorId(@PathVariable Long id) {
		Paciente paciente = pacienteRepositorio.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("No existe el paciente con el ID: " + id) );
		return ResponseEntity.ok(paciente);
		
		
	}
	
	// Actualizar una cita
    @PutMapping("/{id}")
    public ResponseEntity<Paciente> actualizarPaciente(@PathVariable Long id, @RequestBody Paciente detalles) {
        Paciente paciente = pacienteRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe el paciente con el ID: " + id));

        paciente.setNombre(detalles.getNombre());
        paciente.setApellidos(detalles.getApellidos());
        paciente.setTelefono(detalles.getTelefono());
        paciente.setEmail(detalles.getEmail());
        paciente.setObservacionesClinicas(detalles.getObservacionesClinicas());
        

        Paciente actualizado = pacienteRepositorio.save(paciente);
        return ResponseEntity.ok(actualizado);
    }
    // Eliminar paciente
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Paciente paciente = pacienteRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe el paciente con el ID: " + id));
        try {
        	  pacienteRepositorio.delete(paciente);
              return ResponseEntity.noContent().build();  	
        
        }
        catch(DataIntegrityViolationException e) {
        	return ResponseEntity.status(HttpStatus.CONFLICT)
        			.body("No se puede eliminar el paciente porque tiene citas asociadas activas");
        	
        }
      
    }
	
	
	
}
