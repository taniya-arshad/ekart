package com.example.ekart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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

    @PostMapping("/add")
    public String addToCart(
            @RequestBody Cart cart,
            Authentication authentication) {

        verifyUser(
                cart.getUserId(),
                authentication
        );

        cartService.addToCart(
                cart.getUserId(),
                cart.getProductId(),
                cart.getQuantity()
        );

        return "Item added to cart";
    }

    @GetMapping("user/{userId}")
    public List<CartResponse> getCart(
            @PathVariable int userId,
            Authentication authentication) {

        verifyUser(userId, authentication);

        return cartService.getCart(userId);
    }

    @DeleteMapping("/remove")
    public String removeFromCart(
            @RequestParam int userId,
            @RequestParam int productId,
            Authentication authentication) {

        verifyUser(userId, authentication);

        cartService.removeFromCart(
                userId,
                productId
        );

        return "Item removed";
    }

    @DeleteMapping("/clear/{userId}")
    public String clearCart(
            @PathVariable int userId,
            Authentication authentication) {

        verifyUser(userId, authentication);

        cartService.clearCart(userId);

        return "Cart cleared";
    }

    private void verifyUser(
            int userId,
            Authentication authentication) {

        if (authentication == null
                || !cartService.isUserOwner(
                userId,
                authentication.getName())) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Authorization required"
            );
        }
    }
}