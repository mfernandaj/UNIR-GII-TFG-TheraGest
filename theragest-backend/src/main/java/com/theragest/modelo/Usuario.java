package com.theragest.modelo;

import java.time.LocalDateTime;

import jakarta.persistence.*;


@Entity
@Table(name="usuarios")

public class Usuario {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column (name = "nombre_usuario")
	private String nombreUsuario;
	
	@Column (name = "contraseña")
	private String contrasena;
	
	private String rol;
	
	@Column (name= "fecha_alta")
	private LocalDateTime fechaAlta;
	
	@Column (name= "fecha_modificacion")
	private LocalDateTime fechaModificacion;
	
	//Constructor
	public Usuario() {
		
	}
	
	public Usuario(Long id, String nombreUsuario, String contrasena, String rol, LocalDateTime fechaAlta,
			LocalDateTime fechaModificacion) {
		super();
		this.id = id;
		this.nombreUsuario = nombreUsuario;
		this.contrasena = contrasena;
		this.rol = rol;
		this.fechaAlta = fechaAlta;
		this.fechaModificacion = fechaModificacion;
	}

	//Getters y Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public LocalDateTime getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(LocalDateTime fechaAlta) {
		this.fechaAlta = fechaAlta;
	}

	public LocalDateTime getFechaModificacion() {
		return fechaModificacion;
	}

	public void setFechaModificacion(LocalDateTime fechaModificacion) {
		this.fechaModificacion = fechaModificacion;
	}
	
	
	
	
	
}


