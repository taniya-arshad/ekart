package com.example.ekart.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ekart.model.Cart;
import com.example.ekart.model.CartResponse;
import com.example.ekart.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // ✅ Add to cart
    @PostMapping("/add")
    public String addToCart(@RequestBody Cart cart) {
        cartService.addToCart(
                cart.getUserId(),
                cart.getProductId(),
                cart.getQuantity()
        );
        return "Item added to cart";
        
    }

    @GetMapping("user/{userId}")
    public List<CartResponse> getCart(@PathVariable int userId) {
        return cartService.getCart(userId);
    }

    // ✅ Remove item (userId + productId)
    @DeleteMapping("/remove")
    public String removeFromCart(@RequestParam int userId,
                                @RequestParam int productId) {
        cartService.removeFromCart(userId, productId);
        return "Item removed";
    }

    // ✅ Clear cart
    @DeleteMapping("/clear/{userId}")
    public String clearCart(@PathVariable int userId) {
        cartService.clearCart(userId);
        return "Cart cleared";
    }
    



}