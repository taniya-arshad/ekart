package com.example.ekart.service;

import java.util.List;

import com.example.ekart.dto.ReviewResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import com.example.ekart.model.Review;
import com.example.ekart.repository.ReviewRepository;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository repo;

    public ReviewService(ReviewRepository repo) {
        this.repo = repo;
    }

    public void addReview(Review review) {

        int count = repo.countReviewByUserAndProduct(
                review.getUserId(),
                review.getProductId()
        );

        if (count > 0) {
            throw new IllegalStateException(
                    "You have already reviewed this product."
            );
        }

        repo.insertReview(review);
    }

    public List<ReviewResponse> getReviewsByProductId(int productId) {
        return repo.getReviewsByProductId(productId);
    }
}