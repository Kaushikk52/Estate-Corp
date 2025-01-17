package com.estate.corp.controllers;

import com.estate.corp.models.Blog;
import com.estate.corp.services.BlogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/blogs")
public class BlogController {

    private final BlogService blogServ;

    @Autowired
    public BlogController(BlogService blogServ){
        this.blogServ = blogServ;
    }

    @PostMapping(value = "/post")
    public ResponseEntity<Blog> postBlog(@RequestBody Blog blog, Principal principal){
        try {
            Blog savedBlog = blogServ.post(blog, principal);
            log.info("Blog posted successfully : {}", savedBlog.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBlog);
        } catch (RuntimeException e) {
            log.warn("An Runtime Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }catch (Exception e){
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Map<String,Object>> getAllBlogs(){
        try{
            List<Blog> blogs = blogServ.getAllBlogs();
            Map<String, Object> response = new HashMap<>();
            if(blogs.size() < 1 ){
                response.put("message", "Blogs repo is empty");
                response.put("blogs",blogs);
            }else {
                response.put("message", "All blogs retrieved");
                response.put("blogs",blogs);
            }
            log.info("Retrieved all blogs :{}",blogs.size());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Map<String,Object>> getBlogById(@PathVariable String id){
        try{
            Blog blog = blogServ.getBlogById(id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Requested blog retrieved");
            response.put("blog",blog);
            log.info("Retrieved blog with ID :{}", id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping(value = "/edit")
    public ResponseEntity<Map<String,Object>> edit(@RequestBody Blog blog,Principal principal){
        try{
            Blog updatedBlog = blogServ.updateBlog(blog,principal);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Blog updated");
            response.put("blog",updatedBlog);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        try{
            blogServ.deleteBlog(id);
            log.info("Blog with ID : {} Deleted successfully",id);
            return  ResponseEntity.status(HttpStatus.OK).body("Blog deleted successfully");
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

}
