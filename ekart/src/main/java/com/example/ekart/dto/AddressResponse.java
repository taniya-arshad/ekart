package com.example.ekart.dto;

import lombok.Data;

@Data
public class AddressResponse {

    private int id;

    private String fullName;
    private String phone;

    private String addressLine;
    private String city;
    private String pincode;
}