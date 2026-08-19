package com.example.ekart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class OrderRequest {

    private int userId;
    private String address;
    private double totalAmount;
    private List<OrderItem> items;
    private int addressId;
    private String fullName;
    private String phone;
    private String city;
    private String pincode;
}