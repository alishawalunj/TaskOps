package com.nzefler.auth.security;

import com.nzefler.auth.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import java.io.IOException;

@Component

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, CustomUserDetailsService customUserDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.customUserDetailsService = customUserDetailsService;
    }

//working below for postmsn
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if ("/graphql".equals(request.getServletPath()) && "POST".equalsIgnoreCase(request.getMethod())) {
            ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);
            String body = new String(wrappedRequest.getContentAsByteArray());
            System.out.println("🔹 Incoming Request Debug Info:");
            System.out.println("   ➤ Method: " + wrappedRequest.getMethod());
            System.out.println("   ➤ URI: " + wrappedRequest.getRequestURI());
            System.out.println("   ➤ Content-Type: " + wrappedRequest.getContentType());
            System.out.println("   ➤ Headers:");
            wrappedRequest.getHeaderNames().asIterator().forEachRemaining(
                   name -> System.out.println("      - " + name + ": " + wrappedRequest.getHeader(name))
            );
    System.out.println("   ➤ Raw Body: " + body);
            // Skip JWT auth for login/register/introspection
            if (body.contains("loginUser") || body.contains("registerUser") || body.contains("__schema")) {
                filterChain.doFilter(wrappedRequest, response);
                return;
           }

            String authHeader = request.getHeader("Authorization");
           System.out.println("AuthHeader: " + authHeader);

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String jwtToken = authHeader.substring(7);
                System.out.println("JWT Token: " + jwtToken);
                try {
                    if (jwtTokenProvider.validateToken(jwtToken)) {
                        String userEmail = jwtTokenProvider.extractEmail(jwtToken);
                        var userDetails = customUserDetailsService.loadUserByUsername(userEmail);
                        var authToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                       );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                       SecurityContextHolder.getContext().setAuthentication(authToken);
                        System.out.println("JWT validated and user authenticated");
                    }
                } catch (Exception e) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                    return;
                }
            }
        System.out.println("🔸 SecurityContext after filter: " +
                (SecurityContextHolder.getContext().getAuthentication() != null ?
            SecurityContextHolder.getContext().getAuthentication().getName() : "null"));


            filterChain.doFilter(wrappedRequest, response);
        } else {
           filterChain.doFilter(request, response);
        }
    }
}