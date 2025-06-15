package com.theragest.controlador;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import com.theragest.excepciones.ResourceNotFoundException;
import com.theragest.modelo.Cita;
import com.theragest.modelo.Paciente;
import com.theragest.respositorio.CitaRepositorio;
import com.theragest.respositorio.PacienteRepositorio;

@RestController
@RequestMapping("/api/citas")


@CrossOrigin(origins = "http://localhost:4200") // Para permitir peticiones desde Angular
public class CitaControlador {

    @Autowired
    private CitaRepositorio citaRepositorio;
    @Autowired
    private PacienteRepositorio pacienteRepositorio;

    // Obtener todas las citas
    @GetMapping
    public List<Cita> obtenerTodasLasCitas() {
    	return citaRepositorio.findAll();
    }

    // Crear una nueva cita
    @PostMapping
    public Cita crearCita(@RequestBody Cita cita) {
    	
    	cita.setEstado("ACTIVA");
    	Long pacienteId = cita.getPaciente().getId();
    	Paciente PacienteCompleto = pacienteRepositorio.findById(pacienteId)
    			.orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado con el ID: " + pacienteId));
    	
    	//asociar el objeto completo al campo paciente de la cita
    	cita.setPaciente(PacienteCompleto);
    	
    	return citaRepositorio.save(cita);
    	
    }

    // Obtener una cita por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cita> obtenerCitaPorId(@PathVariable Long id) {
        Cita cita = citaRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe la cita con el ID: " + id));
        return ResponseEntity.ok(cita);
    }

    // Actualizar una cita
    @PutMapping("/{id}")
    public ResponseEntity<Cita> actualizarCita(@PathVariable Long id, @RequestBody Cita detallesCita) {
        Cita cita = citaRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe la cita con el ID: " + id));
        
        Long pacienteId = detallesCita.getPaciente().getId();
        Paciente pacienteCompleto = pacienteRepositorio.findById(pacienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado con el ID: " + pacienteId));

        cita.setPaciente(pacienteCompleto);
        cita.setFechaCita(detallesCita.getFechaCita());
        cita.setMotivo(detallesCita.getMotivo());
        cita.setTelefono(detallesCita.getTelefono());
        cita.setEmail(detallesCita.getEmail());
        cita.setObservaciones(detallesCita.getObservaciones());
        cita.setEstado(detallesCita.getEstado());

        Cita citaActualizada = citaRepositorio.save(cita);
        return ResponseEntity.ok(citaActualizada);
    }

    // Eliminar una cita
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCita(@PathVariable Long id) {
        Cita cita = citaRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe la cita con el ID: " + id));

        citaRepositorio.delete(cita);
        return ResponseEntity.noContent().build();
    }
    
    // Cancelar una cita (cambia su estado a CANCELADA)
    @PutMapping("/{id}/cancelar")
    
    public ResponseEntity<Cita> cancelarCita(@PathVariable Long id){
    	Cita cita = citaRepositorio.findById(id)
    			.orElseThrow(()->new ResourceNotFoundException("No existe la cita con el ID:" + id));
    	cita.setEstado("CANCELADA");
    	Cita citaCancelada =citaRepositorio.save(cita);
    	return ResponseEntity.ok(citaCancelada);
    }
    
    
    //finalizar una cita

    @PutMapping("/{id}/finalizar")
    public ResponseEntity<Cita> finalizarCita(@PathVariable Long id) {
        Cita cita = citaRepositorio.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada con el ID: " + id));
        cita.setEstado("FINALIZADA");
        return ResponseEntity.ok(citaRepositorio.save(cita));
    }
    
    //Obtener una cita por id de paciente
    
    @GetMapping("/pacientes/{id}/citas")
    public ResponseEntity<List<Cita>> obtenerCitasPorPaciente(@PathVariable Long id){
    	List<Cita> citas=citaRepositorio.findByPacienteId(id);
    	return ResponseEntity.ok(citas);
    	   	
    }
    
    //notificaciones de citas
    
    @GetMapping("/proximas")
    public ResponseEntity<List<Cita>> obtenerCitasProximas(){
    	LocalDateTime ahora=LocalDateTime.now();
    	LocalDateTime limite=ahora.plusDays(1);
    	
    	List<Cita> citas=citaRepositorio.findByFechaCitaBetween(ahora, limite);
    	return ResponseEntity.ok(citas);
    }
    

    
}
