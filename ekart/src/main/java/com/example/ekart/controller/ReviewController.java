package com.example.ekart.controller;

import com.example.ekart.dto.ReviewResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.example.ekart.dto.AddReviewRequest;
import com.example.ekart.model.Review;
import com.example.ekart.service.ReviewService;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin("*")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    @PostMapping
    public String addReview(
            @RequestBody AddReviewRequest request) {

        Review review = new Review();

        review.setUserId(request.getUserId());
        review.setProductId(request.getProductId());
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        try {

            service.addReview(review);

            return "Review added";

        } catch (IllegalStateException e) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    e.getMessage()
            );
        }
    }

    @GetMapping("/product/{productId}")
    public List<ReviewResponse> getReviewsByProductId(
            @PathVariable int productId) {

        return service.getReviewsByProductId(productId);
    }
}