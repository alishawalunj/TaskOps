package com.nzefler.auth.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class JwtAuthResponse {
    private String accessToken;

    public JwtAuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
