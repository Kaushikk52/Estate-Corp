package com.estate.corp.services;

import com.estate.corp.models.Project;
import com.estate.corp.repositories.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    public Project saveProject(Project project) {
        
        return projectRepo.save(project);
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
