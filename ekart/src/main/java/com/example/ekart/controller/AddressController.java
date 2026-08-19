package com.example.ekart.controller;

import com.example.ekart.dto.AddressRequest;
import com.example.ekart.dto.AddressResponse;
import com.example.ekart.service.AddressService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public String saveAddress(
            @RequestBody AddressRequest request) {

        addressService.saveAddress(request);

        return "Address saved successfully";
    }

    @GetMapping("/user/{userId}")
    public List<AddressResponse> getAddressesByUserId(
            @PathVariable int userId) {

        return addressService.getAddressesByUserId(userId);
    }

    @PutMapping("/{id}")
    public String updateAddress(
            @PathVariable int id,
            @RequestBody AddressRequest request) {

        addressService.updateAddress(id, request);

        return "Address updated successfully";
    }

    @DeleteMapping("/{id}")
    public String deactivateAddress(@PathVariable int id) {

        addressService.deleteAddress(id);

        return "Address deactivated successfully";
    }
}