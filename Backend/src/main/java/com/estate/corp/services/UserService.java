package com.estate.corp.services;

import com.estate.corp.models.Project;
import com.estate.corp.models.Property;
import com.estate.corp.models.User;
import com.estate.corp.repositories.ProjectRepo;
import com.estate.corp.repositories.PropertyRepo;
import com.estate.corp.repositories.UserRepo;
import com.estate.corp.security.JwtHelper;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import static com.estate.corp.models.User.UserRole.ROLE_ADMIN;

@Service
public class UserService implements UserDetailsService {


    private final ProjectRepo projectRepo;
    private final PropertyRepo propertyRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtHelper helper;

    @Autowired
    public UserService(UserRepo userRepo,ProjectRepo projectRepo,PropertyRepo propertyRepo, PasswordEncoder passwordEncoder,JwtHelper helper) {
        this.userRepo = userRepo;
        this.projectRepo = projectRepo;
        this.propertyRepo = propertyRepo;
        this.passwordEncoder = passwordEncoder;
        this.helper = helper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user;
    }

    public String checkAndRenewToken(User user){
        String token = user.getToken();
        try{
            boolean isExpired = this.helper.isTokenExpired(token);
        }catch(ExpiredJwtException e){
            String newToken = this.helper.generateToken(user);
            user.setToken(newToken);
            userRepo.save(user);
            return newToken;
        }
        return token;
    }


    public User addUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String token = this.helper.generateToken(user);
        user.setToken(token);
        User savedUser =  userRepo.save(user);
        return savedUser;
    }

    public List<User> getAllUsers(){
        List<User> users = userRepo.findAll();
        return users;
    }

    public User getCurrentUserRole(Principal principal){
        User currentUser = (User) this.loadUserByUsername(principal.getName());
        return  currentUser;
    }

    public User getUserById(String id){
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return user;
    }

    public List<Property> getUserProperties(Principal principal){
        User currentUser = (User) this.loadUserByUsername(principal.getName());
        List<Property> propertyList = currentUser.getProperties();
        return propertyList;
    }

    public List<Property> getAdminProperties(){
        User admin = userRepo.findByRole(ROLE_ADMIN);
        List<Property> propertyList = admin.getProperties();
        return propertyList;
    }


    public User updateUser(Map<String, String> updates){
        String id = updates.get("id");
        User user = userRepo.findById(id).orElseThrow(()-> new RuntimeException("User not Found with ID : "+id));
        updates.forEach((key,value) -> {
            switch (key){
                case "id":
                    break;
                case "fullName":
                    user.setFullName(value);
                    user.setToken(this.helper.generateToken(user));
                    break;
                case "phone":
                    user.setPhone(value);
                    break;
                case "email":
                    user.setEmail(value);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid field : " +key);
            }
        });
        return userRepo.save(user);
    }

    public User resetPassword(String email,String newPass){
        User existingUser = userRepo.findByEmail(email);
        existingUser.setPassword(passwordEncoder.encode(newPass));
        return userRepo.save(existingUser);
    }

    public String deleteUser(String email){
        User existingUser = userRepo.findByEmail(email);
        userRepo.delete(existingUser);
        return "User deleted successfully...";
    }

    public void deleteProject(String id, Principal principal){
        User currentUser = (User) this.loadUserByUsername(principal.getName());
        List<Project> projectList = currentUser.getProjects();
        Project project = projectRepo.findById(id).orElseThrow(()-> new RuntimeException("Project not found"));
        if(projectList.contains(project)) {
            projectList.remove(project);
            currentUser.setProjects(projectList);
            userRepo.save(currentUser);
        }else{
            throw new RuntimeException("Project does not belong to the current user");
        }
    }

    public void deleteProperty(String id, Principal principal){
        User currentUser = (User) this.loadUserByUsername(principal.getName());
        List<Property> propertyList = currentUser.getProperties();
        Property property = propertyRepo.findById(id).orElseThrow(()-> new RuntimeException("Property not found"));
        if(propertyList.contains(property)) {
            propertyList.remove(property);
            currentUser.setProperties(propertyList);
            userRepo.save(currentUser);
        }else{
            throw new RuntimeException("Property does not belong to the current user");
        }
    }

}