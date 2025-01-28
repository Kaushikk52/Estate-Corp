package com.estate.corp.controllers;

import com.estate.corp.services.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/v1/api/images")
public class ImageController {

    private final CloudinaryService cloudinaryService;

    public ImageController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/upload/multiple")
    public ResponseEntity<List<String>> uploadMultiple(@RequestParam("files") List<MultipartFile> files,
                                                       @RequestParam("type") String type) {
        try {
            List<String> urls = cloudinaryService.multipleUpload(files, type);
            return ResponseEntity.ok(urls);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(List.of("File upload failed: " + e.getMessage()));
        }
    }

    @PostMapping("/upload/single")
    public ResponseEntity<String> uploadSingle(@RequestParam("file") MultipartFile file,
                                               @RequestParam("type") String type) {
        try {
            String url = cloudinaryService.uploadFile(file, type);
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }


    @DeleteMapping("/delete/single")
    public ResponseEntity<?> deleteSingleImage(@RequestBody String publicId, @RequestBody String type){
        try{
            String result = cloudinaryService.deleteFile(publicId,type);
            if(!Objects.equals(result,"ok")){
             throw new RuntimeException("An Runtime Exception occurred");
            }
            return ResponseEntity.ok("Image deleted : "+publicId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error Occured : "+e.getMessage());
        }
    }



}
