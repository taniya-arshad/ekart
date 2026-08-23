package com.example.ekart.service;

import com.example.ekart.dto.ChangePasswordRequest;
import com.example.ekart.dto.LoginResponse;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ekart.model.User;
import com.example.ekart.repository.UserRepository;
import com.example.ekart.security.JwtUtil;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder encoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }
    @Transactional
    public void register(User user) {

        System.out.println("EMAIL: " + user.getEmail());

        User existing = userRepository.findByEmail(user.getEmail());

        System.out.println("FOUND USER: " + existing);

        if (existing != null) {
            throw new RuntimeException("Email already exists");
        }

        System.out.println("GOING TO INSERT");

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("USER");

        userRepository.insertUser(user);

        System.out.println("INSERT DONE");
}

    public LoginResponse login(String email, String password) {

        User user = userRepository.findByEmail(email);
        System.out.println("LOGIN ROLE = " + user.getRole());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        userRepository.updateLastLogin(email);

        String token = jwtUtil.generateToken(email);

        return new LoginResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),user.getRole()
        );
    }
    @Transactional
    public void updateProfile(User user) {

        User existing =
                userRepository.findByEmailAndNotId(
                        user.getEmail(),
                        user.getId()
                );

        if (existing != null) {
            throw new RuntimeException(
                    "Email already exists"
            );
        }

        userRepository.updateProfile(user);
    }
    @Transactional
    public void changePassword(
            int userId,
            ChangePasswordRequest request) {

        User user =
                userRepository.findById(userId);

        if (user == null) {
            throw new RuntimeException(
                    "User not found"
            );
        }

        if (!encoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Current password is incorrect"
            );
        }

        if (request.getNewPassword() == null
                || request.getNewPassword().trim().isEmpty()) {

            throw new RuntimeException(
                    "New password cannot be empty"
            );
        }

        String encodedPassword =
                encoder.encode(
                        request.getNewPassword()
                );

        userRepository.updatePassword(
                userId,
                encodedPassword
        );
    }

}