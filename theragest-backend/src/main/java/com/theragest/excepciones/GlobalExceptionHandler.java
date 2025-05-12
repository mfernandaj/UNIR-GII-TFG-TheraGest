package com.theragest.excepciones;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
public class GlobalExceptionHandler {
	
@ExceptionHandler(ResourceNotFoundException.class)
	
	public ResponseEntity<Object> manejarRecursoNoEncontrado(ResourceNotFoundException ex){
		Map<String, Object> respuesta = new HashMap<>();
		respuesta.put("timestamp", LocalDateTime.now());
		respuesta.put("status", HttpStatus.NOT_FOUND.value());
		respuesta.put("error", "Recurso no encontrado");
		respuesta.put("message", ex.getMessage());
		
		return new ResponseEntity<>(respuesta,HttpStatus.NOT_FOUND);
		
	}
	

}

