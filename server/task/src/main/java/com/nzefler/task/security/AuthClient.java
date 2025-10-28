package com.nzefler.task.security;

import com.nzefler.task.dto.UserTokenDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Component
public class AuthClient {

    private final RestTemplate restTemplate;
    private final String authServiceUrl = "http://localhost:8081/auth/validate-token";

    public AuthClient() {
        this.restTemplate = new RestTemplate();
    }

    public UserTokenDTO validateToken(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);
        System.out.println("[AuthClient] Calling " + authServiceUrl);

        try {
            ResponseEntity<UserTokenDTO> response = restTemplate.exchange(
                    authServiceUrl, HttpMethod.POST, entity, UserTokenDTO.class
            );
            System.out.println("[AuthClient] Response: " + response);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("[AuthClient] Exception while validating token: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

}
