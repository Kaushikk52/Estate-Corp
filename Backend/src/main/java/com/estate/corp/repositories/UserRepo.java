package com.estate.corp.repositories;

import com.estate.corp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,String> {

    User findByName(String name);

    User findByEmail(String email);
}
