package com.theragest.dto;

public class LoginRequestDTO {
	
	 private String nombreUsuario;
	    private String contrasena;

	    public LoginRequestDTO() {
	    }

	    public LoginRequestDTO(String nombreUsuario, String contrasena) {
	        this.nombreUsuario = nombreUsuario;
	        this.contrasena = contrasena;
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

}
