package com.estate.corp.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    @Value("${spring.profiles.active}")
    private String env;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadFile(MultipartFile file, String type) throws IOException {
        String environment = this.env != null ? this.env : "LOCAL";
        String folderPath = "estate_corp/" + environment.toUpperCase() + "/" + type;
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder",folderPath));
        return uploadResult.get("display_name").toString(); // Return file URL
    }

    public List<String> multipleUpload(List<MultipartFile> files, String type) throws IOException {
        String environment = this.env != null ? this.env : "LOCAL";
        String folderPath = "estate_corp/" + environment.toUpperCase() + "/" + type;
        return files.stream()
                .map(file -> {
                    try {
                        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                                "folder", folderPath
                        ));
                        return uploadResult.get("display_name").toString(); // Collect file URL
                    } catch (IOException e) {
                        e.printStackTrace();
                        return null;
                    }
                })
                .filter(url -> url != null) // Filter out nulls in case of errors
                .collect(Collectors.toList());
    }


    public String deleteFile(String publicId,String type) throws IOException {
        String environment = this.env != null ? this.env : "LOCAL";
        String folderPath = "estate_corp/" + environment.toUpperCase() + "/"+type+"/";
        String fullPublicId = folderPath + publicId;
        Map result = cloudinary.uploader().destroy(fullPublicId, ObjectUtils.emptyMap());
        return result.get("result").toString();
    }


    public List<String> deleteFiles(List<String> publicIds,String type) {
        String environment = this.env != null ? this.env : "LOCAL";
        String folderPath = "estate_corp/" + environment.toUpperCase() + "/"+type+"/";

        return publicIds.stream()
                .map(publicId -> {
                    try {
                        // Include folderPath in the publicId if the files are stored in a specific folder
                        String fullPublicId = folderPath + publicId;

                        Map result = cloudinary.uploader().destroy(fullPublicId, ObjectUtils.emptyMap());
                        String deletionResult = result.get("result").toString();

                        if ("ok".equals(deletionResult)) {
                            return fullPublicId + " deleted successfully.";
                        } else {
                            return fullPublicId + " deletion failed: " + deletionResult;
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                        return publicId + " deletion failed: " + e.getMessage();
                    }
                })
                .collect(Collectors.toList());
    }


}
