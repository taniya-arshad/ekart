package com.example.ekart.service;

import com.example.ekart.dto.OrderDetailsResponse;
import com.example.ekart.dto.OrderItem;
import com.example.ekart.dto.OrderItemResponse;
import com.example.ekart.dto.OrderRequest;
import com.example.ekart.dto.OrderResponse;
import com.example.ekart.model.Product;
import com.example.ekart.model.User;
import com.example.ekart.repository.OrderRepository;

import com.example.ekart.repository.ProductRepository;
import com.example.ekart.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    public OrderService(
            OrderRepository orderRepository,
            ProductRepository productRepository,UserRepository userRepository) {

        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public void placeOrder(OrderRequest request) {

        orderRepository.insertOrder(
                request.getUserId(),
                request.getAddressId(),
                request.getAddress(),
                request.getFullName(),
                request.getPhone(),
                request.getCity(),
                request.getPincode(),
                request.getTotalAmount()
        );

        int orderId = orderRepository.getLastOrderId();

        for (OrderItem item : request.getItems()) {

            orderRepository.insertOrderItem(
                    orderId,
                    item.getProductId(),
                    item.getQuantity(),
                    item.getPrice(),
                    item.getQuantity() * item.getPrice()
            );

            Product product =
                    productRepository.getProductById(
                            item.getProductId()
                    );

            int remainingStock =
                    product.getQuantity()
                            - item.getQuantity();

            productRepository.updateQuantity(
                    product.getId(),
                    remainingStock
            );
        }
    }
    public List<OrderResponse> getOrdersByUserId(int userId) {
        return orderRepository.getOrdersByUserId(userId);
    }

    public List<OrderDetailsResponse> getOrderDetailsByUserId(int userId) {

        List<OrderDetailsResponse> orders =
                orderRepository.getOrderHeadersByUserId(userId);

        for (OrderDetailsResponse order : orders) {

            List<OrderItemResponse> items =
                    orderRepository.getOrderItemsByOrderId(
                            order.getOrderId()
                    );

            order.setItems(items);
        }

        return orders;
    }
    public List<OrderDetailsResponse> getAllOrders() {

        List<OrderDetailsResponse> orders =
                orderRepository.getAllOrders();

        for (OrderDetailsResponse order : orders) {

            List<OrderItemResponse> items =
                    orderRepository
                            .getOrderItemsByOrderId(
                                    order.getOrderId()
                            );

            order.setItems(items);
        }

        return orders;
    }
    public void updateOrderStatus(
            int orderId) {

        String currentStatus =
                orderRepository
                        .getOrderStatus(
                                orderId
                        );

        String nextStatus =
                currentStatus;

        if ("PLACED".equals(
                currentStatus)) {

            nextStatus =
                    "SHIPPED";

        } else if (
                "SHIPPED".equals(
                        currentStatus)) {

            nextStatus =
                    "DELIVERED";
        }

        orderRepository
                .updateOrderStatus(
                        orderId,
                        nextStatus
                );
    }

    public void cancelOrder(int orderId) {

        String currentStatus =
                orderRepository.getOrderStatus(
                        orderId
                );

        if ("PLACED".equals(currentStatus)
                || "SHIPPED".equals(currentStatus)) {

            List<OrderItemResponse> items =
                    orderRepository.getOrderItemsByOrderId(
                            orderId
                    );

            for (OrderItemResponse item : items) {

                Product product =
                        productRepository.getProductById(
                                item.getProductId()
                        );

                int newQuantity =
                        product.getQuantity()
                                + item.getQuantity();

                productRepository.updateQuantity(
                        product.getId(),
                        newQuantity
                );
            }

            orderRepository.updateOrderStatus(
                    orderId,
                    "CANCELLED"
            );

        } else {

            throw new RuntimeException(
                    "Order cannot be cancelled"
            );
        }
    }
    public void returnOrder(int orderId) {

        String currentStatus =
                orderRepository.getOrderStatus(
                        orderId
                );

        if ("DELIVERED".equals(currentStatus)) {

            orderRepository.updateOrderStatus(
                    orderId,"RETURN_REQUESTED"
            );

        } else {

            throw new RuntimeException(
                    "Order cannot be returned"
            );
        }
    }
    public void completeReturn(int orderId) {

        String currentStatus =
                orderRepository.getOrderStatus(
                        orderId
                );

        if (!"RETURN_REQUESTED".equals(
                currentStatus)) {

            throw new RuntimeException(
                    "Order is not ready for return"
            );
        }

        List<OrderItemResponse> items =
                orderRepository.getOrderItemsByOrderId(
                        orderId
                );

        for (OrderItemResponse item : items) {

            Product product =
                    productRepository.getProductById(
                            item.getProductId()
                    );

            int newQuantity =
                    product.getQuantity()
                            + item.getQuantity();

            productRepository.updateQuantity(
                    product.getId(),
                    newQuantity
            );
        }

        orderRepository.updateOrderStatus(
                orderId,"RETURNED"
        );

    }
    public OrderDetailsResponse getOrderDetailsByOrderId(
            int orderId) {

        OrderDetailsResponse order =
                orderRepository.getOrderHeaderByOrderId(
                        orderId
                );

        if (order != null) {

            List<OrderItemResponse> items =
                    orderRepository.getOrderItemsByOrderId(
                            orderId
                    );

            order.setItems(items);
        }

        return order;
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