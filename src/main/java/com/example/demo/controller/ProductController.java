package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.response.ProductResponse;
import com.example.demo.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @RequestBody Product product) {

        ProductResponse savedProduct =
                productService.createProduct(product);

        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {

        List<ProductResponse> products =
                productService.getAllProducts();

        return ResponseEntity.ok(products);
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<ProductResponse>> getProductsBySeller(
            @PathVariable Long sellerId) {

        List<ProductResponse> products =
                productService.getProductsBySeller(sellerId);

        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id) {

        ProductResponse product =
                productService.getProductById(id);

        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        ProductResponse updatedProduct =
                productService.updateProduct(id, product);

        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<ProductResponse> uploadProductImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file)
            throws IOException {

        ProductResponse product =
                productService.uploadProductImage(id, file);

        return ResponseEntity.ok(product);
    }
}