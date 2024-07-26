package com.tracker.server.controllers;


import com.tracker.server.utils.ImageUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;

import java.io.File;

@RestController
@RequestMapping("/uploads/")
public class ImageController {
    @Autowired
    private ImageUploadService imageUploadService;

    /**
     * Returns the image
     */
    @GetMapping("/wallet-icons/{filename:.+}")
    //  The :.+ part ensures that the file extension is included in the captured filename
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Resource> serveWalletImage(@PathVariable String filename) {
        Resource resource = imageUploadService.serveWalletImage(filename);
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(MediaType.IMAGE_PNG_VALUE))
                .body(resource);
    }
}
