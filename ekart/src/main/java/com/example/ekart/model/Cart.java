
package com.example.ekart.model;

import lombok.Data;

@Data
public class Cart {
    private int id;
    private int userId;
    private int productId;
    private int quantity;

    // getters + setters
}