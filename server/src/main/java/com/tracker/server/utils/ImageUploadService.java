package com.tracker.server.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageUploadService {

    @Value("${app.base-url}")
    private String baseUrl;

    private final String uploadDir = "src/main/resources/static/uploads/wallet-icons/"; // the images will be saved here

    public String uploadImage(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename(); // generates a unique filename
        Path filePath = Paths.get(uploadDir + fileName); // creates the path where the file will be saved
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());
        return baseUrl + "/uploads/wallet-icons/" + fileName;
    }
}
