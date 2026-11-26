
package com.example.ekart.service;

import com.example.ekart.model.OrderEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderEventConsumer {

    @KafkaListener(
            topics = "order-events",
            groupId = "ekart-group"
    )
    public void consumeOrderEvent(OrderEvent event) {

        System.out.println(
                "Received Kafka Event: " + event
        );

        System.out.println(
                "Order ID: " + event.getOrderId()
        );

        System.out.println(
                "Event Type: " + event.getEventType()
        );
    }
}
