package com.estate.corp.services;

import com.estate.corp.models.*;
import com.estate.corp.repositories.AddressRepo;
import com.estate.corp.repositories.FloorPlanRepo;
import com.estate.corp.repositories.ProjectRepo;
import com.estate.corp.repositories.UserRepo;
import com.estate.corp.specifications.ProjectSpecification;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Map;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private FloorPlanRepo floorPlanRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ImageService imageServ;

    @Autowired
    private UserService userServ;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Value("${imgUrl.source.path}")
    private String sourceUrl;
    @Value("${imgUrl.destination.path}")
    private String destinationUrl;

    @Transactional
    public Project saveProject(Project project, Principal principal) {
        try {
            Address savedAddress = addressRepo.save(project.getAddress());
            User currentUser = (User) userServ.loadUserByUsername(principal.getName());
            List<FloorPlan> savedPlans = floorPlanRepo.saveAll(project.getFloorPlans());
            project.setOwner(currentUser);
            project.setCreatedAt(new Date());
            project.setUpdatedAt(new Date());
            project.setAddress(savedAddress);
            project.setFloorPlans(savedPlans);
            Project savedProject= projectRepo.save(project);
            return savedProject;
        } catch (Exception e) {
            System.out.println("Error occurred during transaction: "+ e);
            throw new RuntimeException("Transaction failed", e);
        }
    }

    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    public Project getProjectById(String id){
        return projectRepo.findById(id).orElseThrow(()-> new RuntimeException("Project not found"));
    }

    public Project getProjectByName(String name){
        return projectRepo.findByName(name);
    }

    public List<Project> getFilteredProjects(Map<String,Object> filters) {
        Specification<Project> spec = ProjectSpecification.filterByCriteria(filters);
        List<Project> filteredProjects =  projectRepo.findAll(spec);
        return filteredProjects;
    }

    public void deleteProject(String id){
        Project project = projectRepo.findById(id).orElseThrow(() -> new RuntimeException("Project not found : "+id));
        List<FloorPlan> floorPlanList = project.getFloorPlans();
        floorPlanList.forEach((floorPlan -> {
            try {
               String result =  cloudinaryService.deleteFile(floorPlan.getImage(), "Projects");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }));
        List<String> results =  cloudinaryService.deleteFiles(List.of(project.getImages()),"Projects");


        projectRepo.delete(project);
    }

}