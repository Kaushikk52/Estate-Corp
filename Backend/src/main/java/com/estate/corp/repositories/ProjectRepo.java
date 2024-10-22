package com.estate.corp.repositories;

import com.estate.corp.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepo extends JpaRepository<Project,String>, JpaSpecificationExecutor<Project> {

    Project findByName(String name);

}