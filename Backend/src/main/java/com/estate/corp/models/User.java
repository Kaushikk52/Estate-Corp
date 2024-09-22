package com.estate.corp.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class User implements UserDetails {

    @Id
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    @Size(min = 5, max = 30, message = "Full name must be between 5 and 30 characters.")
    @Column(name = "full_name", nullable = false, length = 30)  // Set length to 30
    private String fullName;

    @NotNull(message = "Password cannot be null.")
    @Size(min = 7, message = "Password must be at least 7 characters long.")
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull(message = "Email cannot be null.")
    @Email(message = "Email should be valid.")
    @Column(name = "email", nullable = false, unique = true, length = 100)  // Set max length to 100
    private String email;

    @NotNull(message = "Phone number cannot be null.")
    @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 digits.")
    @Column(name = "phone", nullable = false, unique = true, length = 15)  // Set length to 15
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 10)
    private UserRole role;

    public enum UserRole {
        ROLE_USER, ROLE_RESALER, ROLE_AGENT, ROLE_ADMIN;
    }

    @PrePersist
    private void prePersist() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();  // Generate UUID for ID
        }
        if (this.role == null) {
            this.role = UserRole.ROLE_USER;  // Default role to USER
        }
    }

    // Override methods from UserDetails interface
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.fullName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
