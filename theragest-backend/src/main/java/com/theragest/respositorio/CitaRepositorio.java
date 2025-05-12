package com.theragest.respositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.theragest.modelo.Cita;

@Repository
public interface CitaRepositorio extends JpaRepository<Cita, Long>{

}
