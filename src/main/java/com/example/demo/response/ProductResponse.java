package com.example.demo.response;

import com.example.demo.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private int quantity;

    private int minimumOrderQuantity;

    private String category;

    private Long sellerId;

    private String sellerName;

    private String sellerEmail;

    private Role sellerRole;

    private String imageUrl;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}