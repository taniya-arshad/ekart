package com.example.ekart.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ReviewResponse {

    private int id;
    private int userId;
    private int productId;
    private String userName;
    private int rating;
    private String comment;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}