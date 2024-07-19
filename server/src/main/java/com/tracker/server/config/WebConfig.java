package com.tracker.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow CORS for all endpoints
                .allowedOrigins("http://localhost:3000") // Allow requests from localhost:3000
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE") // Allow specified HTTP methods
                .allowedHeaders("*"); // Allow all headers
    }

    /**
     * Here we define how to handle static resources
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**") // Any URL that starts with "/uploads/" will be handled by this resource handler.
                .addResourceLocations("classpath:/static/uploads/"); // This specifies where Spring should look for the files.
    }
}