package com.estate.corp.controllers;

import com.estate.corp.models.User;
import com.estate.corp.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/users")
public class UserController {

    @Autowired
    private UserService userServ;

    @GetMapping(value = "/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userServ.getAllUsers();
        if (users.isEmpty()) {
            log.warn("User repository is Empty");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(users);
        }
        log.info("Retrieved all users :{}", users);
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        try {
            User user = userServ.getUserById(id);
            log.info("Retrieved user by ID:{}", id);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (RuntimeException e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping(value = "/update-username")
    public ResponseEntity<User> updateUsername(@RequestBody String id,@RequestBody String fullName) {
        try {
            User updatedUser = userServ.updateUsername(fullName, id);
            log.info("Username updated successfully: {}", updatedUser);
            return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
        } catch (IllegalArgumentException e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null);
        }
    }

    @PutMapping(value = "/update-phone")
    public ResponseEntity<User> updatePhone(@RequestBody String phone, @PathVariable String id) {
        try {
            User updatedUser = userServ.updatePhone(phone, id);
            log.info("User Phone No. updated successfully: {}", updatedUser);
            return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
        } catch (IllegalArgumentException e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null);
        }
    }

    @PutMapping(value = "/update-email")
    public ResponseEntity<User> updateEmail(@RequestBody String email, @PathVariable String id) {
        try {
            User updatedUser = userServ.updateEmail(email, id);
            log.info("User Email updated successfully: {}", updatedUser);
            return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
        } catch (IllegalArgumentException e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null);
        }
    }

    @DeleteMapping(value = "/remove/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable String email) {
        try {
            userServ.deleteUser(email);
            log.info("User deleted successfully: {}", email);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User deleted successfully");
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


}
