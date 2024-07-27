package com.estate.corp.services;

import com.estate.corp.models.User;
import com.estate.corp.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {


    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user;
    }

    public void addUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
         userRepo.save(user);
    }

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    public User getUserById(String id){
        return userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUsername(String username , String id){
        User existingUser = userRepo.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
        existingUser.setName(username);
        return userRepo.save(existingUser);
    }

    public User updatePhone(long phone, String id){
        User existingUser = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setPhone(phone);
        return userRepo.save(existingUser);
    }

    public User updateEmail(String email, String id){
        User existingUser = userRepo.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
        existingUser.setEmail(email);
        return userRepo.save(existingUser);
    }

    public User resetPassword(String email,String newPass){
        User existingUser = userRepo.findByEmail(email);
        existingUser.setPassword(passwordEncoder.encode(newPass));
        return userRepo.save(existingUser);
    }

    public String deleteUser(String name){
        User existingUser = userRepo.findByName(name);
        userRepo.delete(existingUser);
        return "User deleted successfully...";
    }




}
