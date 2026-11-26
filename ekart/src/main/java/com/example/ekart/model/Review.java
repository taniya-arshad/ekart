package com.example.ekart.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Review {

    private Integer id;

    private Integer userId;

    private Integer productId;

    private Integer rating;

    private String comment;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}