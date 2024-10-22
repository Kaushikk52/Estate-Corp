package com.estate.corp.services;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URL;
import java.util.Base64;

@Service
public class ImageService {


    //Save image from client to server
    public void saveImageToUrl(String originalPath, String serverPath, String imageName) throws IOException {
        File sourceFile = new File(originalPath,imageName+".png");
        File destinationDir = new File(serverPath);

        // Check if the source file exists
        if (!sourceFile.exists()) {
            throw new FileNotFoundException("Source image file not found: " + originalPath);
        }

        // Check if the destination directory exists; if not, create it
        if (!destinationDir.exists()) {
            boolean dirExists =  destinationDir.mkdirs(); // This will create parent directories if they don't exist
        }

        BufferedImage image = ImageIO.read(sourceFile);
        File destinationFile = new File(destinationDir, imageName + ".png");
        ImageIO.write(image, "png", destinationFile);

    }

    //get Base64String by retrieving image from Url provided
    public String getImage(String destinationUrl,String cardName){
        try{
            File savedImage = new File(destinationUrl,cardName);
            if (!savedImage.exists()) {
                throw new FileNotFoundException("Image file not found: " + savedImage.getPath());
            }
            URL imageUrl = savedImage.toURI().toURL();
            BufferedImage bufferedImage = ImageIO.read(imageUrl);
            return this.bufferedImageToBase64(bufferedImage);
        }catch(Exception e){
            throw new RuntimeException("An Error occurred : "+e.getMessage());
        }
    }

    //delete image from server
    public boolean deleteImage(String imageUrl) {
        File file = new File(imageUrl);
        return file.delete();
    }

    //convert Buffered image to Base64 to send to frontend
    public String bufferedImageToBase64(BufferedImage image) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        byte[] imageBytes = baos.toByteArray();
        return Base64.getEncoder().encodeToString(imageBytes);
    }

    //get Base64 string from frontend and convert it to Buffered image
    public BufferedImage base64ToBufferedImage(String base64) throws IOException {
        byte[] decodedBytes = Base64.getDecoder().decode(base64);
        ByteArrayInputStream bais = new ByteArrayInputStream(decodedBytes);
        return ImageIO.read(bais);
    }

}