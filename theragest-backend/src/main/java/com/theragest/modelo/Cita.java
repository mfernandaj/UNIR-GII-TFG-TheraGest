package com.theragest.modelo;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "citas")

public class Cita {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne
	@JoinColumn(name = "paciente_id", nullable = false)
	private Paciente paciente;
	

	@Column (name = "fechaCita", nullable = false )
    private LocalDateTime fechaCita;
	
	@Column (name = "motivo", length = 255 )
    private String motivo;

	@Column(name = "telefono", length = 20)
	private String telefono;
	
	@Column(name = "email", length = 100)
	private String email;
	
	@Column(name = "observaciones", length = 200)
    private String observaciones;
	
	@Column(name = "estado", nullable = false )
    private String estado = "ACTIVA";

    // Constructores
    public Cita() {
    }

    public Cita(Paciente paciente, LocalDateTime fechaCita,String motivo, String telefono, String email, String observaciones, String estado) {
        this.paciente = paciente;
        this.fechaCita = fechaCita;
        this.motivo = motivo;
        this.telefono=telefono;
        this.email=email;
        this.observaciones = observaciones;
        this.estado=estado;
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public LocalDateTime getFechaCita() {
        return fechaCita;
    }

    public void setFechaCita(LocalDateTime fechaHora) {
        this.fechaCita = fechaHora;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
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

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
}
	


