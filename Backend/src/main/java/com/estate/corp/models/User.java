package com.estate.corp.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class User implements UserDetails {

    @Id
    private String id;
    @Size(min=3, max=30)
    private String firstName;
    @Size(min=3, max=30)
    private String lastName;
    @NotNull
    @Min(7)
    private String password;
    @NotNull
    @Min(7)
    private String email;
    @Size(min=10)
    private long phone;
    @Enumerated(EnumType.STRING)
    private UserRole role;

    public enum UserRole{
        USER,ADMIN
    }

    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
        if(this.role == null){
            this.role = UserRole.USER;
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return this.firstName +" "+ this.lastName;
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
