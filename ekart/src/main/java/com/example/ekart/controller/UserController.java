package com.example.ekart.controller;

import com.example.ekart.dto.ChangePasswordRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.example.ekart.model.User;
import com.example.ekart.service.UserService;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PutMapping("/{id}")
    public String updateProfile(
            @PathVariable int id,
            @RequestBody User user) {

        user.setId(id);

        try {

            service.updateProfile(user);

            return "Profile updated";

        } catch (RuntimeException e) {

            if ("Email already exists"
                    .equals(e.getMessage())) {

                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        e.getMessage()
                );
            }

            throw e;
        }
    }
    @PutMapping("/{id}/password")
    public String changePassword(
            @PathVariable int id,
            @RequestBody ChangePasswordRequest request) {

        try {

            service.changePassword(
                    id,
                    request
            );

            return "Password changed successfully";

        } catch (RuntimeException e) {

            if ("Current password is incorrect"
                    .equals(e.getMessage())) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        e.getMessage()
                );
            }

            if ("User not found"
                    .equals(e.getMessage())) {

                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        e.getMessage()
                );
            }

            if ("New password cannot be empty"
                    .equals(e.getMessage())) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        e.getMessage()
                );
            }

            throw e;
        }
    }




}