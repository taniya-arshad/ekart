package com.example.ekart.repository;

import org.apache.ibatis.annotations.Mapper;

import com.example.ekart.model.User;

@Mapper
public interface UserRepository {
    void insertUser(User user);
    User findByEmail(String email);
    void updateLastLogin(String email);
}