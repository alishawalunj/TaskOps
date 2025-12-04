package com.nzefler.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class AuthApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		System.setProperty("APP_JWT_SECRET", dotenv.get("APP_JWT_SECRET"));
		System.setProperty("APP_JWT_EXPIRATION_MS", dotenv.get("APP_JWT_EXPIRATION_MS"));
		System.setProperty("DB_URL", dotenv.get("DB_URL"));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		System.setProperty("GOOGLE_CLIENT_ID", dotenv.get("GOOGLE_CLIENT_ID"));
		System.setProperty("GOOGLE_CLIENT_SECRET", dotenv.get("GOOGLE_CLIENT_SECRET"));
		System.setProperty("GOOGLE_SCOPE", dotenv.get("GOOGLE_SCOPE"));
		System.setProperty("GITHUB_CLIENT_ID", dotenv.get("GITHUB_CLIENT_ID"));
		System.setProperty("GITHUB_CLIENT_SECRET", dotenv.get("GITHUB_CLIENT_SECRET"));
		System.setProperty("GITHUB_SCOPE", dotenv.get("GITHUB_SCOPE"));
		SpringApplication.run(AuthApplication.class, args);
	}
}
