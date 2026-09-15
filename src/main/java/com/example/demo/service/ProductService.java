package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.response.ProductResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final S3Service s3Service;

    public ProductService(
            ProductRepository productRepository,
            S3Service s3Service) {

        this.productRepository = productRepository;
        this.s3Service = s3Service;
    }

    public ProductResponse createProduct(Product product) {

        Product savedProduct =
                productRepository.save(product);

        return toResponse(savedProduct);
    }

    public List<ProductResponse> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductResponse getProductById(Long id) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product not found"
                                ));

        return toResponse(product);
    }

    public ProductResponse updateProduct(
            Long id,
            Product updatedProduct) {

        Product existingProduct =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product not found"
                                ));

        existingProduct.setName(
                updatedProduct.getName()
        );

        existingProduct.setDescription(
                updatedProduct.getDescription()
        );

        existingProduct.setPrice(
                updatedProduct.getPrice()
        );

        existingProduct.setQuantity(
                updatedProduct.getQuantity()
        );

        existingProduct.setMinimumOrderQuantity(
                updatedProduct.getMinimumOrderQuantity()
        );

        existingProduct.setCategory(
                updatedProduct.getCategory()
        );

        existingProduct.setImageUrl(
                updatedProduct.getImageUrl()
        );

        Product savedProduct =
                productRepository.save(existingProduct);

        return toResponse(savedProduct);
    }

    public void deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {
            throw new RuntimeException(
                    "Product not found"
            );
        }

        productRepository.deleteById(id);
    }

    public ProductResponse uploadProductImage(
            Long productId,
            MultipartFile file)
            throws IOException {

        Product product =
                productRepository.findById(productId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product not found"
                                ));

        String imageKey =
                s3Service.uploadFile(file);

        product.setImageUrl(imageKey);

        Product savedProduct =
                productRepository.save(product);

        return toResponse(savedProduct);
    }

    public List<ProductResponse> getProductsBySeller(
            Long sellerId) {

        return productRepository
                .findBySellerId(sellerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ProductResponse toResponse(Product product) {

        String imageUrl = null;

        if (product.getImageUrl() != null
                && !product.getImageUrl().isBlank()) {

            imageUrl =
                    s3Service.generatePresignedUrl(
                            product.getImageUrl()
                    );
        }

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .minimumOrderQuantity(
                        product.getMinimumOrderQuantity()
                )
                .category(product.getCategory())
                .sellerId(
                        product.getSeller().getId()
                )
                .sellerName(
                        product.getSeller().getName()
                )
                .sellerEmail(
                        product.getSeller().getEmail()
                )
                .sellerRole(
                        product.getSeller().getRole()
                )
                .imageUrl(imageUrl)
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
}