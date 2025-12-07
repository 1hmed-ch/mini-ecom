package com.ecommerce.miniecommerce.controller;


import com.ecommerce.miniecommerce.dto.ProductDTO;
import com.ecommerce.miniecommerce.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/my-products")
    public ResponseEntity<List<ProductDTO>> getMyProducts(@AuthenticationPrincipal Jwt jwt) {
        String ownerId = jwt.getSubject();
        List<ProductDTO> products = productService.getProductsByOwner(ownerId);
        return ResponseEntity.ok(products);
    }


    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(
            @Valid @RequestBody ProductDTO productDTO,
            @AuthenticationPrincipal Jwt jwt) {

        String ownerId = jwt.getSubject();
        ProductDTO createdProduct = productService.createProduct(productDTO, ownerId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {

        String ownerId = jwt.getSubject();
        boolean deleted = productService.deleteProduct(id, ownerId);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
