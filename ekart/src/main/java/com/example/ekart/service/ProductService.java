package com.example.ekart.service;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import com.example.ekart.model.Product;
import com.example.ekart.repository.ProductRepository;

@Service
@Transactional
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public void addProduct(Product product) {
        repo.insertProduct(product);
    }

    public List<Product> getProducts() {
        return repo.getAllProducts();
    }

    public void deactivateProduct(int id) {
        repo.deactivateProduct(id);
    }
    public void updateProduct(Product product) {
        repo.updateProduct(product);
    }
    public Product getProductById(int id) {
        return repo.getProductById(id);
    }
}