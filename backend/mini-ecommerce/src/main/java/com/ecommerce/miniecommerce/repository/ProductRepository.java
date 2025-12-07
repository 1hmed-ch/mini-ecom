package com.ecommerce.miniecommerce.repository;


import com.ecommerce.miniecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find all products by owner ID
    List<Product> findByOwnerId(String ownerId);

    // Find products by title containing (case insensitive)
    List<Product> findByTitleContainingIgnoreCase(String title);
}
