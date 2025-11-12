package com.nzefler.task.security;

import com.nzefler.task.dto.UserTokenDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthClient authClient;

    public JwtAuthenticationFilter(AuthClient authClient) {
        this.authClient = authClient;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();
        ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);

        if ("/graphql".equals(path) && "POST".equalsIgnoreCase(request.getMethod())) {
            try {
                String body = new String(wrappedRequest.getContentAsByteArray(), StandardCharsets.UTF_8);
                if (body.contains("__schema")) {
                    filterChain.doFilter(wrappedRequest, response);
                    return;
                }
                String authHeader = wrappedRequest.getHeader("Authorization");
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    String token = authHeader.substring(7);
                    try {
                        UserTokenDTO user = authClient.validateToken(token);
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(user.getId(), null, Collections.emptyList());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(wrappedRequest));
                        SecurityContextHolder.getContext().setAuthentication(authentication);

                    } catch (Exception e) {
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
                        return;
                    }
                }
                filterChain.doFilter(wrappedRequest, response);
            } catch (Exception e) {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal Error");
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}

