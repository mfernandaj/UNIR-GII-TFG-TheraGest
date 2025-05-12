package com.theragest.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "pacientes")

public class Paciente
{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre", nullable = false)
	private String nombre;

	@Column(name = "apellidos", nullable = false)
	private String apellidos;

	@Column(name = "telefono")
	private String telefono;

	@Column(name = "email")
	private String email;

	@Column(name = "observacionesClinicas")
	private String observacionesClinicas;

	// Constructores

	public Paciente() {}

	public Paciente(Long id, String nombre, String apellidos, String telefono, String email,
			String observacionesclinicas) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.telefono = telefono;
		this.email = email;
		this.observacionesClinicas = observacionesclinicas;
	}

	//Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getObservacionesClinicas() {
		return observacionesClinicas;
	}

	public void setObservacionesClinicas(String observacionesClinicas) {
		this.observacionesClinicas = observacionesClinicas;
	}
	
	
}


