package com.example.ekart.dto;

import lombok.Data;

@Data
public class AddReviewRequest {

    private int userId;
    private int productId;
    private int rating;
    private String comment;
}