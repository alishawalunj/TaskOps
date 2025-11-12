package com.nzefler.auth.security;

import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class ResettableStreamHttpServletRequest extends HttpServletRequestWrapper {

    private byte[] rawData;

    public ResettableStreamHttpServletRequest(HttpServletRequest request) throws IOException {
        super(request);
        try (InputStream is = request.getInputStream()) {
            this.rawData = is.readAllBytes();
        }
    }

    @Override
    public ServletInputStream getInputStream() {
        final ByteArrayInputStream bais = new ByteArrayInputStream(rawData);
        return new ServletInputStream() {
            @Override
            public int read() throws IOException {
                return bais.read();
            }

            @Override
            public boolean isFinished() {
                return bais.available() == 0;
            }

            @Override
            public boolean isReady() {
                return true;
            }

            @Override
            public void setReadListener(ReadListener readListener) { }
        };
    }

    public byte[] getBody() {
        return this.rawData;
    }
}
