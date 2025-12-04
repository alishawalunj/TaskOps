package com.nzefler.auth.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class OAuthRedirectUrlResponse {
    private String url;

    public OAuthRedirectUrlResponse(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
