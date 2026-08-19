package com.example.ekart.dto;

import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class OrderDetailsResponse {

    private int orderId;

    private String status;

    private Timestamp createdAt;
    private double totalAmount;
    private String customerName;
    private String customerEmail;
    private String fullName;
    private String phone;
    private String address;
    private String city;
    private String pincode;
    private List<OrderItemResponse> items;
}