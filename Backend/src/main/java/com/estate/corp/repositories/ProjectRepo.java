package com.estate.corp.repositories;

import com.estate.corp.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepo extends JpaRepository<Project,String> {

    Project findByName(String name);

}
