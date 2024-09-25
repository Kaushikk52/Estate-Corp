package com.estate.corp.services;

import com.estate.corp.models.Address;
import com.estate.corp.models.Project;
import com.estate.corp.repositories.AddressRepo;
import com.estate.corp.repositories.ProjectRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private ImageService imageServ;

    @Value("${imgUrl.source.path}")
    private String sourceUrl;
    @Value("${imgUrl.destination.path}")
    private String destinationUrl;

    @Transactional
    public Project saveProject(Project project) {
        try {
            Address savedAddress = addressRepo.save(project.getAddress());
            project.setAddress(savedAddress);
            imageServ.saveImageToUrl(sourceUrl, destinationUrl, project.getImageName());
            return projectRepo.save(project);
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
