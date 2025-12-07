package com.ecommerce.miniecommerce.service;


import com.ecommerce.miniecommerce.dto.ProductDTO;
import com.ecommerce.miniecommerce.entity.Product;
import com.ecommerce.miniecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get product by ID
    public Optional<ProductDTO> getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDTO);
    }

    // Get products by owner
    public List<ProductDTO> getProductsByOwner(String ownerId) {
        return productRepository.findByOwnerId(ownerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Create product
    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO, String ownerId) {
        Product product = new Product();
        product.setTitle(productDTO.getTitle());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setCondition(productDTO.getCondition());
        product.setImageBase64(productDTO.getImageBase64());
        product.setOwnerId(ownerId);

        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    // Delete product (only if user is owner)
    @Transactional
    public boolean deleteProduct(Long id, String ownerId) {
        Optional<Product> productOpt = productRepository.findById(id);

        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            // Check if the user is the owner
            if (product.getOwnerId().equals(ownerId)) {
                productRepository.delete(product);
                return true;
            }
        }
        return false;
    }

    // Check if user owns product
    public boolean isOwner(Long productId, String ownerId) {
        Optional<Product> productOpt = productRepository.findById(productId);
        return productOpt.isPresent() && productOpt.get().getOwnerId().equals(ownerId);
    }

    // Convert Entity to DTO
    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setTitle(product.getTitle());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setCondition(product.getCondition());
        dto.setImageBase64(product.getImageBase64());
        dto.setOwnerId(product.getOwnerId());
        dto.setCreatedAt(product.getCreatedAt() != null ? product.getCreatedAt().toString() : null);
        return dto;
    }
}
