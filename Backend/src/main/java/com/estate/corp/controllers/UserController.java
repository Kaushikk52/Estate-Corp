package com.estate.corp.controllers;

import com.estate.corp.models.User;
import com.estate.corp.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/users")
public class UserController {

    @Autowired
    private UserService userServ;

    @PostMapping(value = "/add")
    public ResponseEntity<?> addUser(@RequestBody User user){
        try{
            userServ.addUser(user);
            log.info("User added Successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered succesfully");
        }catch(Exception e){
            log.error("Error adding user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping(value = "/all")
    public  ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userServ.getAllUsers();
        if(users.isEmpty()){
            log.warn("User repository is Empty");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(users);
        }
        log.info("Retrieved all users :{}",users);
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @GetMapping(value = "/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id){
        try {
            userServ.getUserById(id);
            log.info("Retrieved user by ID:{}",id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (RuntimeException e) {
            log.warn("An Error occurred : {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping(value = "/update-username")
    public ResponseEntity<User>  updateUsername(@RequestBody String username , @PathVariable String id){
        try {
            User updatedUser = userServ.updateUsername(username,id);
            log.info("Username updated successfully: {}", updatedUser);
            return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
        } catch (IllegalArgumentException e) {
            log.warn("An Error occurred : {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null);
        }
    }

    @PutMapping(value = "/update-phone")
    public ResponseEntity<User> updatePhone(@RequestBody long phone,@PathVariable String id){
        try {
            User updatedUser = userServ.updatePhone(phone,id);
            log.info("User Phone No. updated successfully: {}", updatedUser);
            return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
        } catch (IllegalArgumentException e) {
            log.warn("An Error occurred : {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null);
        }
    }

    @PutMapping(value = "/update-email")
    public ResponseEntity<User> updateEmail(@RequestBody String email,@PathVariable String id){
        try {
            User updatedUser = userServ.updateUsername(email,id);
            log.info("User Email updated successfully: {}", updatedUser);
            return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
        } catch (IllegalArgumentException e) {
            log.warn("An Error occurred : {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(null);
        }
    }

    @DeleteMapping (value = "")
    public ResponseEntity<String> deleteUser(@PathVariable String name){
        try {
            userServ.deleteUser(name);
            log.info("User deleted successfully: {}", name);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User deleted successfully");
        } catch(Exception e) {
            log.warn("An Error occurred : {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


}
