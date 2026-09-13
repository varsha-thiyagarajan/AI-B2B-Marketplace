package com.example.demo.bucket;
public enum BucketName {

    PRODUCT_IMAGE("ai-b2b-marketplace-product-images-01");
    private final String bucketName;
    BucketName(String bucketName)
    {
        this.bucketName=bucketName;
    }
    public String getBucketName()
    {
        return bucketName;
    }

}
