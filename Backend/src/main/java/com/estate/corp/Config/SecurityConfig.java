package com.estate.corp.Config;

import com.estate.corp.security.JwtAuthenticationEntryPoint;
import com.estate.corp.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthenticationEntryPoint point;
    private final JwtAuthenticationFilter filter;

    public SecurityConfig(JwtAuthenticationEntryPoint point, JwtAuthenticationFilter filter) {
        this.point = point;
        this.filter = filter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/v1/api/auth/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/v1/api/users/all").hasRole("ADMIN")
                        .requestMatchers("/v1/api/users/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/v1/api/users/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/v1/api/users/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE,
                                "/v1/api/users/removeProject/*").hasAnyRole("ADMIN", "AGENT")
                        .requestMatchers(HttpMethod.DELETE,
                                "/v1/api/users/removeProperty/*").hasAnyRole("ADMIN", "AGENT", "RESALER")
                        .requestMatchers("/v1/api/projects/add").hasAnyRole("ADMIN", "AGENT")
                        .requestMatchers(HttpMethod.GET, "/v1/api/projects/all",
                                "/v1/api/projects/id/*",
                                "/v1/api/projects/name/*").authenticated()
                        .requestMatchers(HttpMethod.GET, "/v1/api/properties/filter",
                                "/v1/api/properties/all",
                                "/v1/api/properties/isApproved",
                                "/v1/api/properties/id/*",
                                "/v1/api/properties/name/*").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/v1/api/properties/approvalStatus/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,
                                "/v1/api/properties/post").hasAnyRole("ADMIN", "AGENT", "RESALER")
                )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(AbstractAuthenticationFilterConfigurer::permitAll)
                .logout(LogoutConfigurer::permitAll)
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "https://estate-corp.netlify.app")); // Adjust allowed origins as needed
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type")); // Add allowed headers if needed
        configuration.setAllowCredentials(true); // Allow credentials if needed

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
