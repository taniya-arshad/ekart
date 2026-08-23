package com.example.ekart.repository;

import java.util.List;

import com.example.ekart.dto.ReviewSummary;
import org.apache.ibatis.annotations.Mapper;

import com.example.ekart.dto.ReviewResponse;
import com.example.ekart.model.Review;

@Mapper
public interface ReviewRepository {

    void insertReview(Review review);

    List<ReviewResponse> getReviewsByProductId(int productId);

    int countReviewByUserAndProduct(int userId, int productId);

    ReviewSummary getReviewSummaryByProductId(int productId);
}