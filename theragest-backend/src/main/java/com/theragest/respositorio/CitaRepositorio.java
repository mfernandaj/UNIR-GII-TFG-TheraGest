package com.theragest.respositorio;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.theragest.modelo.Cita;

@Repository
public interface CitaRepositorio extends JpaRepository<Cita, Long>{
	
	List<Cita> findByPacienteId(Long pacienteId);

	List<Cita> findByFechaCitaBetween(LocalDateTime desde, LocalDateTime hasta); 
}
