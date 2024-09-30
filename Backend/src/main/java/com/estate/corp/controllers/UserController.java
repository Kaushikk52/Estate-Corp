package com.estate.corp.controllers;

import com.estate.corp.models.User;
import com.estate.corp.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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


    @PutMapping(value="/update")
    public ResponseEntity<?> updateUser(@RequestBody Map<String, String> updates){
        try{
            User updatedUser = userServ.updateUser(updates);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User updated successfully");
            response.put("user", updatedUser);
            log.info("User updated successfully: {}", updatedUser);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch(IllegalArgumentException e){
            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            log.warn("An error occurred: {}", response);
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(response);
        } catch (RuntimeException e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
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

    @DeleteMapping(value = "/removeProject/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable String id, Principal principal){
        try {
            userServ.deleteProject(id,principal);
            log.info("Project deleted successfully: {}", id);
            return ResponseEntity.status(HttpStatus.OK).body("Project deleted successfully");
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping(value = "/removeProperty/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable String id,Principal principal){
        try {
            userServ.deleteProperty(id,principal);
            log.info("Property deleted successfully: {}", id);
            return ResponseEntity.status(HttpStatus.OK).body("Property deleted successfully");
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
}
