package com.estate.corp.Config;

import com.estate.corp.security.JwtAuthenticationEntryPoint;
import com.estate.corp.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${frontendUrl.path}")
    private String frontendUrl;

    public SecurityConfig(JwtAuthenticationEntryPoint point, JwtAuthenticationFilter filter) {
        this.point = point;
        this.filter = filter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .authorizeHttpRequests(auth -> auth
                        // Allow OPTIONS requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Authentication endpoints
                        .requestMatchers(HttpMethod.POST, "/v1/api/auth/**").permitAll()

                        // Images endpoints
                        .requestMatchers(HttpMethod.POST,"/v1/api/images/**").permitAll()

                        // Users endpoints
                        .requestMatchers(HttpMethod.GET, "/v1/api/users/all").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/v1/api/users/adminProperties").permitAll()
                        .requestMatchers("/v1/api/users/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/v1/api/users/removeProject/*").hasAnyRole("ADMIN", "AGENT")
                        .requestMatchers(HttpMethod.DELETE, "/v1/api/users/removeProperty/*").hasAnyRole("ADMIN", "AGENT", "RESALER")

                        // Projects endpoints
                        .requestMatchers(HttpMethod.POST,"/v1/api/projects/add").authenticated()
                        .requestMatchers(HttpMethod.GET, "/v1/api/projects/all","/v1/api/projects/filter", "/v1/api/projects/id/*", "/v1/api/projects/name/*").permitAll()
                        .requestMatchers(HttpMethod.POST, "/v1/api/projects/delete/**").authenticated()

                        // Properties endpoints
                        .requestMatchers(HttpMethod.GET, "/v1/api/properties/filter", "/v1/api/properties/all", "/v1/api/properties/isApproved", "/v1/api/properties/id/*", "/v1/api/properties/name/*").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/v1/api/properties/approvalStatus/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/v1/api/properties/post","/v1/api/properties/delete/**").authenticated()

                        //Notifications endpoints
                        .requestMatchers("/v1/api/enquiry/email","/v1/api/enquiry/all").permitAll()

                        //Blogs endpoints
                        .requestMatchers(HttpMethod.GET,"/v1/api/blogs/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/v1/api/blogs/**").hasRole("ADMIN")

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
        configuration.setAllowedOrigins(Arrays.asList(frontendUrl));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}