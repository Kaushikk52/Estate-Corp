package com.estate.corp.services;

import com.estate.corp.models.Address;
import com.estate.corp.models.Project;
import com.estate.corp.models.User;
import com.estate.corp.repositories.AddressRepo;
import com.estate.corp.repositories.ProjectRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private ImageService imageServ;

    @Autowired
    private UserService userServ;

    @Value("${imgUrl.source.path}")
    private String sourceUrl;
    @Value("${imgUrl.destination.path}")
    private String destinationUrl;

    @Transactional
    public Project saveProject(Project project, Principal principal) {
        try {
            Address savedAddress = addressRepo.save(project.getAddress());
            User currentUser = (User) userServ.loadUserByUsername(principal.getName());
            project.setOwner(currentUser);
            project.setCreatedAt(new Date());
            project.setUpdatedAt(new Date());
            project.setAddress(savedAddress);
            imageServ.saveImageToUrl(sourceUrl, destinationUrl, project.getImageName());
            Project savedProject= projectRepo.save(project);
            return savedProject;
        } catch (Exception e) {
            throw new RuntimeException("Transaction failed", e);
        }
    }

    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    public Project getProjectById(String id){
        return projectRepo.findById(id).orElseThrow(()-> new RuntimeException("Project not found"));
    }

    public Project getProject(String name){
        return projectRepo.findByName(name);
    }

    public void removeProject(String name){
        Project project = projectRepo.findByName(name);
        projectRepo.delete(project);
    }

}
