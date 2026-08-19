package com.example.ekart.repository;

import com.example.ekart.dto.OrderDetailsResponse;
import com.example.ekart.dto.OrderResponse;
import com.example.ekart.dto.OrderItemResponse;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderRepository {

    void insertOrder(@Param("userId") int userId,
                     @Param("addressId") int addressId,
                     @Param("address") String address,
                     @Param("fullName") String fullName,
                     @Param("phone") String phone,
                     @Param("city") String city,
                     @Param("pincode") String pincode,
                     @Param("totalAmount") double totalAmount);

    int getLastOrderId();

    void insertOrderItem(@Param("orderId") int orderId,
                         @Param("productId") int productId,
                         @Param("quantity") int quantity,
                         @Param("price") double price,
                         @Param("totalAmount") double totalAmount);

    // Existing method
    List<OrderResponse> getOrdersByUserId(@Param("userId") int userId);

    // New methods for detailed order history
    List<OrderDetailsResponse> getOrderHeadersByUserId(
            @Param("userId") int userId);

    List<OrderItemResponse> getOrderItemsByOrderId(
            @Param("orderId") int orderId);
    List<OrderDetailsResponse> getAllOrders();

    void updateOrderStatus(
            int orderId,
            String status);

    String getOrderStatus(int orderId);

    int countOrdersByAddressId(
            @Param("addressId") int addressId);

    OrderDetailsResponse getOrderHeaderByOrderId(
            @Param("orderId") int orderId);

}