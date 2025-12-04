package com.nzefler.auth.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class JwtAuthResponseDTO {

    private String accessToken;
    private long id;

    public JwtAuthResponseDTO(String accessToken, long id) {
        this.accessToken = accessToken;
        this.id = id;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
