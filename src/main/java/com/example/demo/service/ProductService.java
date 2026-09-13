package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final S3Service s3Service;
    public ProductService(ProductRepository productRepository, S3Service s3Service)
    {
        this.productRepository = productRepository;
        this.s3Service = s3Service;
    }
    public Product createProduct(Product product)
    {
       return productRepository.save(product);
    }

    public List<Product> getAllProducts()
    {
        return productRepository.findAll();
    }
    public Product getProductById(Long id)
    {
        return productRepository.findById(id).orElseThrow(()->
                new RuntimeException("Product not found"));
    }

    public Product updateProduct(Long id, Product updatedProduct)
    {
        Product existingProduct=productRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Product not found"));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setQuantity(updatedProduct.getQuantity());
        existingProduct.setMinimumOrderQuantity(
                updatedProduct.getMinimumOrderQuantity()
        );
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setImageUrl(updatedProduct.getImageUrl());

        return productRepository.save(existingProduct);



    }
    public void deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }

        productRepository.deleteById(id);
    }

    public Product uploadProductImage(Long productId, MultipartFile file)
            throws IOException {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));


        String imageKey = s3Service.uploadFile(file);

        product.setImageUrl(imageKey);

        return productRepository.save(product);
    }
}
