package com.example.ekart.service;

import java.util.List;

import com.example.ekart.model.User;
import com.example.ekart.repository.UserRepository;
import org.springframework.stereotype.Service;

import com.example.ekart.model.Cart;
import com.example.ekart.model.CartResponse;
import com.example.ekart.repository.CartRepository;

@Service
public class CartService {

    private final CartRepository cartRepository;

    private final UserRepository userRepository;

    public CartService(
            CartRepository cartRepository,
            UserRepository userRepository) {

        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }
    // ✅ Add to cart (merge if exists)
    public void addToCart(int userId, int productId, int quantity) {
        Cart existing = cartRepository.findByUserAndProduct(userId, productId);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + quantity);
            cartRepository.updateQuantity(existing);
        } else {
            Cart cart = new Cart();
            cart.setUserId(userId);
            cart.setProductId(productId);
            cart.setQuantity(quantity);
            cartRepository.addToCart(cart);
        }
    }

    public List<CartResponse> getCart(int userId) {
    return cartRepository.getCartWithProducts(userId);
    }

    public void removeFromCart(int userId, int productId) {
        cartRepository.removeFromCart(userId, productId);
    }

    public void clearCart(int userId) {
        cartRepository.clearCart(userId);
    }
    public boolean isUserOwner(
            int userId,
            String email) {

        User user =
                userRepository.findByEmail(email);

        return user != null
                && user.getId() == userId;
    }
}