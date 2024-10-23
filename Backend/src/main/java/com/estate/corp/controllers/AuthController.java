package com.estate.corp.controllers;

import com.estate.corp.models.JwtRequest;
import com.estate.corp.models.JwtResponse;
import com.estate.corp.models.User;
import com.estate.corp.security.JwtHelper;
import com.estate.corp.services.EmailService;
import com.estate.corp.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "https://estatecorp.in")
@RequestMapping(value = "/v1/api/auth")
public class AuthController {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    // Store OTPs temporarily
    private Map<String, String> otpStorage = new HashMap<>();

    private void doAuthenticate(String email,String password){
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,password);
        try{
            manager.authenticate(authentication);
        }catch (Exception e){
            throw new RuntimeException("Invalid email or password...");
        }
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        try {
            User savedUser = userService.addUser(user);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("user", savedUser);
            log.info("User added Successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("Error adding user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request){
        try{
            this.doAuthenticate(request.getEmail(), request.getPassword());
            User userDetails = (User)userDetailsService.loadUserByUsername(request.getEmail());
            String token = userService.checkAndRenewToken(userDetails);
            JwtResponse response = JwtResponse.builder()
                    .jwtToken(token)
                    .name(userDetails.getUsername()).build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOTP(@RequestParam String email) {
        try{
            String otp = emailService.sendOTP(email);
            otpStorage.put(email, otp); // Store OTP with email as key
            log.info("OTP sent Succesfully");
            return ResponseEntity.ok("OTP sent successfully!");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOTP(@RequestParam String email, @RequestParam String otp, @RequestParam String newPass) {
        if (otpStorage.containsKey(email) && otpStorage.get(email).equals(otp)) {
            log.info("OTP verified Successfully");
            otpStorage.remove(email,otp);
            User updatedUser = userService.resetPassword(email, newPass);
            return ResponseEntity.ok().body(updatedUser.getUsername());
        } else {
            log.warn("Invalid OTP");
            return ResponseEntity.badRequest().body("Invalid OTP!");
        }
    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }
}