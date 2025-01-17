package com.estate.corp.services;

import com.estate.corp.models.Blog;
import com.estate.corp.models.User;
import com.estate.corp.repositories.BlogRepo;
import com.estate.corp.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@Service
public class BlogService {

    private final BlogRepo blogRepo;
    private final UserService userServ;
    private final UserRepo userRepo;

    @Autowired
    public BlogService(BlogRepo blogRepo,UserService userServ, UserRepo userRepo){
        this.blogRepo = blogRepo;
        this.userServ = userServ;
        this.userRepo = userRepo;
    }

    public Blog post(Blog blog, Principal principal){
        User currentUser = (User) userServ.loadUserByUsername(principal.getName());
        if(!currentUser.getRole().equals(User.UserRole.ROLE_ADMIN)){
            throw new RuntimeException("Not Authorized to post Blogs...");
        }
        blog.setAuthor(currentUser);
        blog.setCreatedAt(new Date());
        blog.setUpdatedAt(new Date());
        Blog savedBlog = blogRepo.save(blog);
        return savedBlog;
    }

    public List<Blog> getAllBlogs(){
        List<Blog> blogsList = blogRepo.findAll();
        return blogsList;
    }

    public Blog getBlogById(String id){
        Blog blog = blogRepo.findById(id).orElseThrow(() -> new RuntimeException("Blog not found"));
        return blog;
    }

    public Blog updateBlog(Blog blog,Principal principal){
        Blog existingBlog = getBlogById(blog.getId());
        existingBlog.setUpdatedAt(new Date());
        existingBlog.setDate(blog.getDate());
        existingBlog.setHeading(blog.getHeading());
        existingBlog.setSubtitle(blog.getSubtitle());
        existingBlog.setContent(blog.getContent());
        existingBlog.setImages(blog.getImages());
        Blog updatedBlog = blogRepo.save(existingBlog);
        return updatedBlog;
    }

    public void deleteBlog(String id){
        Blog existingBlog = getBlogById(id);
        blogRepo.delete(existingBlog);
    }
}
