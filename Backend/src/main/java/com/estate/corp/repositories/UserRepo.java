package com.estate.corp.repositories;

import com.estate.corp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,String> {

    User findByFullName(String fullName);

    User findByEmail(String email);

    User findByRole(User.UserRole role);
}