package com.theragest.respositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.theragest.modelo.Paciente;

@Repository

public interface PacienteRepositorio extends JpaRepository<Paciente, Long>{
	
	
	

}
