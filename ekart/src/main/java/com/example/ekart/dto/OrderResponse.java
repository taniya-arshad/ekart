package com.example.ekart.dto;

import lombok.Data;

@Data
public class OrderResponse {

    private int id;
    private String address;
    private double totalAmount;
}