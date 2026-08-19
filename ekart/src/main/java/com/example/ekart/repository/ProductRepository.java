package com.example.ekart.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.ekart.model.Product;
import org.apache.ibatis.annotations.Param;
@Mapper
public interface ProductRepository {
    void insertProduct(Product product);
    List<Product> getAllProducts();

    Product getProductById(int id);

    void updateQuantity(int id, int quantity);
    void deactivateProduct(int id);
    void updateProduct(Product product);
}