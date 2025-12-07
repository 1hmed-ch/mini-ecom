package com.ecommerce.miniecommerce.dto;


import jakarta.validation.constraints.*;

public class ProductDTO {

    private Long id;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000)
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private Double price;

    @NotBlank(message = "Condition is required")
    private String condition;

    private String imageBase64;

    private String ownerId;

    private String createdAt;

    // Constructors
    public ProductDTO() {}

    public ProductDTO(Long id, String title, String description, Double price, String condition,
                      String imageBase64, String ownerId, String createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.condition = condition;
        this.imageBase64 = imageBase64;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
