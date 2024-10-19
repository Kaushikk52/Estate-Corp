package com.estate.corp.controllers;

import com.estate.corp.models.JwtResponse;
import com.estate.corp.models.Property;
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
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/users")
public class UserController {

    @Autowired
    private UserService userServ;

    @GetMapping(value = "/all")
    public ResponseEntity<Map<String,Object>> getAllUsers() {
        List<User> usersData = userServ.getAllUsers();
        Map<String,Object> response = new HashMap<>();
        if (usersData.isEmpty()) {
            log.warn("User repository is Empty");
            response.put("message","User repository is Empty");
            response.put("users",usersData);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        List<User> users = usersData.stream()
                        .map(user -> User.builder()
                                .id(user.getId())
                                .token(user.getToken())
                                .fullName(user.getFullName())
                                .email(user.getEmail())
                                .phone(user.getPhone())
                                .role(user.getRole())
                                .properties(user.getProperties())
                                .projects(user.getProjects())
                                .build())
                .collect(Collectors.toList());

        log.info("Retrieved all users :{}", users.size());

        response.put("message","Retrieved all users");
        response.put("users",users);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value = "/getCurrentUser")
    public ResponseEntity<?> getCurrentUser(Principal principal){
        try{
            User currentUser = userServ.getCurrentUserRole(principal);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Current User details retrieved");
            response.put("userId",currentUser.getId());
            response.put("role",currentUser.getRole());
            log.info("Retrieved current user : {}",currentUser.getId());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch(Exception e){
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    @GetMapping(value ="/properties")
    public ResponseEntity<?> getUserProperties(Principal principal){
        try{
            List<Property> propertyList = userServ.getUserProperties(principal);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User properties retrieved");
            response.put("properties",propertyList);
            log.info("Retrieved user properties");
            return ResponseEntity.status(HttpStatus.OK).body(response);

        }catch(Exception e){
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping(value = "/adminProperties")
    public ResponseEntity<?> getAdminProperties(){
        try{
            List<Property> propertyList = userServ.getAdminProperties();
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Admin properties retrieved");
            response.put("properties",propertyList);
            log.info("Retrieved user properties");
            return ResponseEntity.status(HttpStatus.OK).body(response);

        }catch(Exception e){
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
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
