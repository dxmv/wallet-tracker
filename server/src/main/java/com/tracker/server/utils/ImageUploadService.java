package com.tracker.server.utils;

import com.tracker.server.exceptions.BadRequestException;
import com.tracker.server.exceptions.InternalServerException;
import com.tracker.server.exceptions.NotFoundException;
import com.tracker.server.models.User;
import jdk.jfr.ContentType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageUploadService {

    @Value("${app.base-url}")
    private String baseUrl;

    private final String uploadDir = "src/main/resources/static/uploads/wallet-icons/"; // the images will be saved here

    public String uploadImage(MultipartFile file) {
        try{
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename(); // generates a unique filename
            Path filePath = Paths.get(uploadDir + fileName); // creates the path where the file will be saved
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
            return baseUrl + "/uploads/wallet-icons/" + fileName;
        }
        catch (IOException e){
            throw new InternalServerException("Error while uploading an image");
        }

    }

    // delete the image with the given url
    public void deleteImage(String imageUrl) {
        try{
            if (imageUrl != null && imageUrl.contains("/uploads/wallet-icons/")) {
                // images are stored like this "http://localhost:8080/uploads/wallet-icons/2a53c4c8-3ef7-4804-8fe2-a570b9f78d7b_meta.png"
                // the last part is the file name of the image
                String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
                Path filePath = Paths.get(uploadDir + fileName);
                Files.deleteIfExists(filePath);
            }
        }
        catch(IOException e){
            throw new InternalServerException("Error while deleting the image");
        }

    }

    public Resource serveWalletImage(String filename) {
        try{
            Path file = Paths.get(uploadDir).resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            // Check if the file exists and is readable
            if (resource.exists() || resource.isReadable()) {
                // If the file is valid, return it with OK status
                return resource;
            } else {
                // If the file doesn't exist or isn't readable, throw Not Found
                throw new NotFoundException("Image not found");
            }
        } catch (MalformedURLException e) {
            throw new BadRequestException(e.getMessage());
        }
    }
}
