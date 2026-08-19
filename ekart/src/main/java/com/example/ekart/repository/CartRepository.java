package com.example.ekart.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.ekart.model.Cart;
import com.example.ekart.model.CartResponse;

@Mapper
public interface CartRepository {

    void addToCart(Cart cart);

    Cart findByUserAndProduct(@Param("userId") int userId,
                             @Param("productId") int productId);

    void updateQuantity(Cart cart);

    List<CartResponse> getCartWithProducts(@Param("userId") int userId);
    void removeFromCart(@Param("userId") int userId,
                        @Param("productId") int productId);

    void clearCart(@Param("userId") int userId);
}