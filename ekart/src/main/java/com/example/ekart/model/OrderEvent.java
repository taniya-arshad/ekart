
package com.example.ekart.model;

import lombok.Data;

@Data
public class OrderEvent {

    private int orderId;
    private int userId;
    private double totalAmount;
    private String eventType;

    public OrderEvent() {
    }

    public OrderEvent(
            int orderId,
            int userId,
            double totalAmount,
            String eventType) {
        this.orderId = orderId;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.eventType = eventType;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }
}
