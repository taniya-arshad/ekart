package com.example.ekart.dto;

import lombok.Data;

@Data
public class OrderItemResponse {

    private String productName;
    private int productId;
    private int quantity;

    private double price;
}