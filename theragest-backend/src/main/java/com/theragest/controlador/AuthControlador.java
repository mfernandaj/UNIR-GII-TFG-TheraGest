package com.theragest.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.theragest.dto.LoginRequestDTO;
import com.theragest.respositorio.UsuarioRepositorio;

import com.theragest.seguridad.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:4200")

public class AuthControlador {
	
	@Autowired
	private UsuarioRepositorio usuarioRepositorio;
	
	@Autowired
    private JwtUtil jwtUtil;
	
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@PostMapping("/login")	
	public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        return usuarioRepositorio.findByNombreUsuario(loginRequest.getNombreUsuario())
            .map(usuario -> {
                boolean contrasenaCorrecta = passwordEncoder.matches(loginRequest.getContrasena(), usuario.getContrasena());
                if (contrasenaCorrecta) {
                	String token = jwtUtil.generarToken(usuario.getNombreUsuario());
                	//System.out.println("Usuario recibido: " + loginRequest.getNombreUsuario());
                    return ResponseEntity.ok().body(token);//devuelve solo el token
                } else {
                    return ResponseEntity.status(401).body("Credenciales incorrectas");
                }
            })
            .orElse(ResponseEntity.status(401).body("Usuario no encontrado"));
    }
	
	

}
