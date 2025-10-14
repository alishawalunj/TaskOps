package com.nzefler.auth.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;


    public String generateToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
   }

    public String generateToken(Authentication authentication) {
        String email = authentication.getName();
        return generateToken(email);
    }

   public String extractEmail(String token){
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token)
                .getBody().getSubject();
   }

   public boolean validateToken(String token){
       try{
           Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
           return true;
       }catch(Exception e){
           return false;
       }
   }
}
