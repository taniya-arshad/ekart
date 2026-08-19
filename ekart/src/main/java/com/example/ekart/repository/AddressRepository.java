package com.example.ekart.repository;

import com.example.ekart.dto.AddressResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AddressRepository {

    void saveAddress(
            @Param("userId") int userId,
            @Param("fullName") String fullName,
            @Param("phone") String phone,
            @Param("addressLine") String addressLine,
            @Param("city") String city,
            @Param("pincode") String pincode
    );

    List<AddressResponse> getAddressesByUserId(
            @Param("userId") int userId
    );

    void updateAddress(
            @Param("id") int id,
            @Param("fullName") String fullName,
            @Param("phone") String phone,
            @Param("addressLine") String addressLine,
            @Param("city") String city,
            @Param("pincode") String pincode
    );
    void deleteAddress(@Param("id")  int id);
    void deactivateAddress(@Param("id")  int id);

    int countDuplicateAddress(
            @Param("userId") int userId,
            @Param("fullName") String fullName,
            @Param("phone") String phone,
            @Param("addressLine") String addressLine,
            @Param("city") String city,
            @Param("pincode") String pincode
    );
}