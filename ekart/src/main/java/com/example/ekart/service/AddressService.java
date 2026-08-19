package com.example.ekart.service;

import com.example.ekart.dto.AddressRequest;
import com.example.ekart.dto.AddressResponse;
import com.example.ekart.repository.AddressRepository;

import com.example.ekart.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {


    private final AddressRepository addressRepository;
    private final OrderRepository orderRepository;

    public AddressService(AddressRepository addressRepository,
                          OrderRepository orderRepository) {

        this.addressRepository = addressRepository;
        this.orderRepository = orderRepository;
    }
    public void saveAddress(AddressRequest request) {

        int duplicateCount =
                addressRepository.countDuplicateAddress(
                        request.getUserId(),
                        request.getFullName(),
                        request.getPhone(),
                        request.getAddressLine(),
                        request.getCity(),
                        request.getPincode()
                );

        if (duplicateCount > 0) {

            throw new RuntimeException(
                    "This address already exists."
            );
        }

        addressRepository.saveAddress(
                request.getUserId(),
                request.getFullName(),
                request.getPhone(),
                request.getAddressLine(),
                request.getCity(),
                request.getPincode()
        );
    }

    public List<AddressResponse> getAddressesByUserId(
            int userId) {

        return addressRepository.getAddressesByUserId(userId);
    }

    public void updateAddress(
            int id,
            AddressRequest request) {

        addressRepository.updateAddress(
                id,
                request.getFullName(),
                request.getPhone(),
                request.getAddressLine(),
                request.getCity(),
                request.getPincode()
        );
    }

    public void deleteAddress(int id) {

        int orderCount =
                orderRepository
                        .countOrdersByAddressId(id);

        if (orderCount > 0) {

            addressRepository.deactivateAddress(id);
        }else{
            addressRepository.deleteAddress(id);
        }


    }
}