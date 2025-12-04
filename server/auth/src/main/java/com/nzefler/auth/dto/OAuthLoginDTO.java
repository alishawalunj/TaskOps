package com.nzefler.auth.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class OAuthLoginDTO {

    private String provider;
    private String providerId;
    private String email;
    private String userName;

    public OAuthLoginDTO(String provider, String providerId, String email, String userName) {
        this.provider = provider;
        this.providerId = providerId;
        this.email = email;
        this.userName = userName;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
