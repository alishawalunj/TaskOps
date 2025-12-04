package com.nzefler.auth.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nzefler.auth.dto.OAuthLoginDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class GoogleOAuthClient {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String googleRedirectUri;

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String githubClientId;

    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String githubClientSecret;

    @Value("${spring.security.oauth2.client.registration.github.redirect-uri}")
    private String githubRedirectUri;

    private final RestTemplate rest = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();


    public OAuthLoginDTO exchangeCode(String code) {
        String tokenUrl = "https://oauth2.googleapis.com/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("code", code);
        form.add("client_id", googleClientId);
        form.add("client_secret", googleClientSecret);
        form.add("redirect_uri", googleRedirectUri);
        form.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(form, headers);

        ResponseEntity<JsonNode> response = rest.exchange(tokenUrl, HttpMethod.POST, request, JsonNode.class);
        JsonNode tokenNode = response.getBody();
        if (tokenNode == null || tokenNode.get("id_token") == null) {
            throw new RuntimeException("Failed to obtain id_token from Google token response");
        }

        String idToken = tokenNode.get("id_token").asText();

        try {
            String[] parts = idToken.split("\\.");
            String payloadJson = new String(java.util.Base64.getUrlDecoder().decode(parts[1]));
            JsonNode payload = mapper.readTree(payloadJson);

            String sub = payload.has("sub") ? payload.get("sub").asText() : null;
            String email = payload.has("email") ? payload.get("email").asText() : null;
            String name = payload.has("name") ? payload.get("name").asText() : null;

            return new OAuthLoginDTO("google", sub, email, name);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Google id_token payload", e);
        }
    }


    public OAuthLoginDTO exchangeGithubCode(String code) {
        String tokenUrl = "https://github.com/login/oauth/access_token";

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(java.util.List.of(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);

        java.util.Map<String, String> body = java.util.Map.of(
                "client_id", githubClientId,
                "client_secret", githubClientSecret,
                "code", code,
                "redirect_uri", githubRedirectUri
        );

        HttpEntity<java.util.Map<String, String>> tokenRequest = new HttpEntity<>(body, headers);

        ResponseEntity<JsonNode> tokenResponse = rest.postForEntity(tokenUrl, tokenRequest, JsonNode.class);
        JsonNode tokenBody = tokenResponse.getBody();
        if (tokenBody == null || tokenBody.get("access_token") == null) {
            throw new RuntimeException("Failed to fetch GitHub access token");
        }
        String accessToken = tokenBody.get("access_token").asText();

        HttpHeaders profileHeaders = new HttpHeaders();
        profileHeaders.setBearerAuth(accessToken);
        profileHeaders.setAccept(java.util.List.of(MediaType.APPLICATION_JSON));
        HttpEntity<Void> profileReq = new HttpEntity<>(profileHeaders);

        ResponseEntity<JsonNode> profileResp = rest.exchange("https://api.github.com/user", HttpMethod.GET, profileReq, JsonNode.class);
        JsonNode profile = profileResp.getBody();

        String email = null;
        if (profile != null && profile.has("email") && !profile.get("email").isNull()) {
            email = profile.get("email").asText();
        } else {
            ResponseEntity<JsonNode> emailsResp = rest.exchange("https://api.github.com/user/emails", HttpMethod.GET, profileReq, JsonNode.class);
            JsonNode emailsNode = emailsResp.getBody();
            if (emailsNode != null && emailsNode.isArray() && emailsNode.size() > 0) {
                for (JsonNode e : emailsNode) {
                    if (e.has("primary") && e.get("primary").asBoolean()) {
                        email = e.get("email").asText();
                        break;
                    }
                }
                if (email == null && emailsNode.size() > 0) email = emailsNode.get(0).get("email").asText();
            }
        }

        String id = profile != null && profile.has("id") ? profile.get("id").asText() : null;
        String name = profile != null && profile.has("name") && !profile.get("name").isNull() ? profile.get("name").asText()
                : (profile != null && profile.has("login") ? profile.get("login").asText() : null);

        return new OAuthLoginDTO("github", id, email, name);
    }
}
