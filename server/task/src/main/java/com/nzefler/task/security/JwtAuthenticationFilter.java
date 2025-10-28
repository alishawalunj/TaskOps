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
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthClient authClient;

    public JwtAuthenticationFilter(AuthClient authClient) {
        this.authClient = authClient;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("[JWT Filter] Incoming headers:");
        request.getHeaderNames().asIterator().forEachRemaining(name -> {
            System.out.println(name + " : " + request.getHeader(name));
        });

        System.out.println("[JWT Filter] Path: " + request.getServletPath());
        System.out.println("[JWT Filter] Method: " + request.getMethod());

        request.getHeaderNames().asIterator()
                .forEachRemaining(name -> System.out.println("[JWT Filter] Header: " + name + " = " + request.getHeader(name)));


        String path = request.getServletPath();


        if ("/graphql".equals(path) && "POST".equalsIgnoreCase(request.getMethod())) {
            ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);
            String body = new String(wrappedRequest.getContentAsByteArray());
            if (body.contains("__schema")) {
                filterChain.doFilter(wrappedRequest, response);
                return;
            }

            String authHeader = request.getHeader("Authorization");
            System.out.println("[JWT Filter] authHeader: " + authHeader);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                try{
                    System.out.println("[JWT Filter] Validating token via Auth service: " + token);

                    UserTokenDTO user = authClient.validateToken(token);

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(user.getId(), null, Collections.emptyList());
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(wrappedRequest));
                    SecurityContextHolder.getContext().setAuthentication(auth);

                }catch (Exception e) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
                    return;
                }
            }

            filterChain.doFilter(wrappedRequest, response);
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
