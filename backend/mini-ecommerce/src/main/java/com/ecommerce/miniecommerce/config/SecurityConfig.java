package com.ecommerce.miniecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http)) // Enable CORS
                .csrf(csrf -> csrf.disable()) // Disable CSRF for REST API
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless sessions
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/api/products", "/api/products/**").permitAll()
                        // Protected endpoints
                        .requestMatchers("/api/products/my-products").authenticated()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(new CustomJwtAuthenticationConverter()))
                );

        return http.build();
    }
}