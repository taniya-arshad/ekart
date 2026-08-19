package com.example.ekart.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.ekart.model.Product;
import com.example.ekart.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public String addProduct(@RequestBody Product product) {
        service.addProduct(product);
        return "Product added";
    }

    @GetMapping
    public List<Product> getProducts() {
        return service.getProducts();
    }

    @PutMapping("/deactivate/{id}")
    public String deactivateProduct(
            @PathVariable int id) {
        service.deactivateProduct(id);
        return "Product deactivated";
    }
    @PutMapping("/{id}")
    public String updateProduct(
            @PathVariable int id,
            @RequestBody Product product) {

        product.setId(id);

        service.updateProduct(product);

        return "Product updated";
    }
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id) {
        return service.getProductById(id);
    }
}