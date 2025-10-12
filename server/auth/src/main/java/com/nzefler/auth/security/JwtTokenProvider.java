package com.nzefler.auth.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private String jwtSecret;
    private long jwtExpirationDate;

    public String generateToken(Authentication authentication){
        String userName = authentication.name();
        Date cureentDate = new Date();
        Date expirationDate = new Date(cureentDate.getTime() + jwtExpirationDate);
        String token = Jwts.builder().subject(userName).issuedAt(new Date()).expiration(expirationDate).signWith(key()).compact();
        return token;
    }
    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
    public String getUserName(String token){
        return Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedclaims(token).getPayload().getSubject();
    }
    public boolean validateToken(String token){
        Jwts.parser().verifyWith((SecretKey) key()).build().parse(token);
        return true;
    }
}
