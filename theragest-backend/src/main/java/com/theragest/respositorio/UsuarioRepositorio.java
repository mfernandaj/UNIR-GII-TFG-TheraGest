package com.theragest.respositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.theragest.modelo.Usuario;
import java.util.Optional;




public interface UsuarioRepositorio extends  JpaRepository<Usuario, Long> {
	
	//Metodo personalizado para buscar usuario por nombre de usuario
	Optional<Usuario> findByNombreUsuario(String nombreUsuario);

}
