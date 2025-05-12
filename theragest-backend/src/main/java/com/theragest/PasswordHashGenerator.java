package com.theragest;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
	
	public static void main(String[] arg) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String rawPassword = "123456";
		String encodedPassword= encoder.encode(rawPassword);
		
		System.out.println("Hash generado para 123456:");
		System.out.println(encodedPassword);
		
		
	}
	
	

}
