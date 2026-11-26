
package com.example.ekart.service;

import com.example.ekart.model.OrderEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderEventProducer {

    private static final String TOPIC = "order-events";

    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public OrderEventProducer(
            KafkaTemplate<String, OrderEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishOrderEvent(OrderEvent event) {

        kafkaTemplate.send(
                TOPIC,
                String.valueOf(event.getOrderId()),
                event
        ).whenComplete((result, exception) -> {

            if (exception == null) {
                System.out.println(
                        "Kafka event published successfully. Order ID: "
                                + event.getOrderId()
                );
            } else {
                System.err.println(
                        "Kafka event publishing failed. Order ID: "
                                + event.getOrderId()
                );
                exception.printStackTrace();
            }
        });
    }
}
