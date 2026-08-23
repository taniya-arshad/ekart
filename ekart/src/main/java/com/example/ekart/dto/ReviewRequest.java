package com.example.ekart.dto;

import lombok.Data;

@Data
public class ReviewRequest {

    private Integer userId;
    private Integer productId;
    private Integer rating;
    private String comment;
}