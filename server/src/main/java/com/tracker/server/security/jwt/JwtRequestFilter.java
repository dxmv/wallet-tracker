package com.tracker.server.security.jwt;

import com.tracker.server.models.User;
import com.tracker.server.repositories.UserRepository;
import com.tracker.server.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");


        String id = null; // id is saved in the jwt
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            id = jwtUtil.extractId(jwt);
        }

        // check if there isn't a user already authenticated for this session
        if (id != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User u = this.userRepo.findById(Long.parseLong(id)).orElse(null);


            if (u!= null && jwtUtil.validateToken(jwt, String.valueOf(u.getId()))) {
                // Create a new UsernamePasswordAuthenticationToken using the validated UserDetails object
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        u, null, List.of(new GrantedAuthority() {
                    @Override
                    public String getAuthority() {
                        return "USER";
                    }
                }));

                // Set additional details for the authentication token from the HTTP request
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set the authentication information in the SecurityContextHolder, which is used by Spring Security to manage authentication state
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
