package com.example.ekart.service;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.example.ekart.model.Product;
import com.example.ekart.repository.ProductRepository;
import org.springframework.cache.annotation.Cacheable;
@Service
@Transactional

public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }
    @CacheEvict(value = "products", allEntries = true)
    public void addProduct(Product product) {
        repo.insertProduct(product);
    }
    @Cacheable("products")
    public List<Product> getProducts() {
        return repo.getAllProducts();
    }
    @CacheEvict(value = "products", allEntries = true)
    public void deactivateProduct(int id) {
        repo.deactivateProduct(id);
    }
    @CacheEvict(value = "products", allEntries = true)
    public void updateProduct(Product product) {
        repo.updateProduct(product);
    }
    public Product getProductById(int id) {
        return repo.getProductById(id);
    }
}