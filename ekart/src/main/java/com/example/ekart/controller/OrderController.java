package com.example.ekart.controller;

import com.example.ekart.dto.OrderDetailsResponse;
import com.example.ekart.dto.OrderRequest;
import com.example.ekart.dto.OrderResponse;
import com.example.ekart.service.OrderService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public String placeOrder(@RequestBody OrderRequest request) {

        orderService.placeOrder(request);

        return "Order placed successfully";
    }

    @GetMapping("/user/{userId}")
    public List<OrderResponse> getOrdersByUserId(
            @PathVariable int userId) {

        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/details/user/{userId}")
    public List<OrderDetailsResponse> getOrderDetailsByUserId(
            @PathVariable int userId) {

        return orderService.getOrderDetailsByUserId(userId);
    }
    @GetMapping("/admin")
    public List<OrderDetailsResponse>
    getAllOrders() {

        return orderService.getAllOrders();
    }
    @PutMapping(
            "/admin/status/{orderId}")
    public String updateOrderStatus(
            @PathVariable int orderId) {

        orderService
                .updateOrderStatus(
                        orderId);

        return
                "Status Updated";
    }
    @PutMapping("/cancel/{orderId}")
    public String cancelOrder(
            @PathVariable int orderId) {

        orderService.cancelOrder(orderId);

        return "Order cancelled successfully";
    }
    @PutMapping("/return/{orderId}")
    public String returnOrder(
            @PathVariable int orderId) {

        orderService.returnOrder(orderId);

        return "Return request submitted successfully";
    }
    @PutMapping("/admin/return/{orderId}")
    public void completeReturn(
            @PathVariable int orderId) {

        orderService.completeReturn(orderId);
    }
    @GetMapping("/details/{orderId}")
    public OrderDetailsResponse getOrderDetailsByOrderId(
            @PathVariable int orderId) {

        return orderService.getOrderDetailsByOrderId(
                orderId
        );
    }
}