package com.example.ekart.model;

import lombok.Data;

@Data
public class Product {
    private Integer id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String brand;
    private Double rating;
    private Integer quantity;
    private String image;
    private Boolean active;
}