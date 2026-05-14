package com.Ecomproject.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Ecomproject.exception.ResourceNotFoundException;
import com.Ecomproject.model.Product;
import com.Ecomproject.repo.ProductRepo;

@Service
public class ProductService {
	
	
	@Autowired
	private ProductRepo repo;
	

	public List<Product> getAllProducts() {
		
		return repo.findAll();
	}


	public Product getProductById(int id) {
		
		return repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
	}
	
	 public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
	        if (imageFile == null || imageFile.isEmpty()) {
	            throw new IllegalArgumentException("Product image is required");
	        }
	        product.setImageName(imageFile.getOriginalFilename());
	        product.setImageType(imageFile.getContentType());
	        product.setImageData(imageFile.getBytes());
	        return repo.save(product);
	    }
	 
	  public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
	        Product existingProduct = getProductById(id);
	        
	        product.setId(id); // Ensure we are updating the existing product
	        
	        if (imageFile != null && !imageFile.isEmpty()) {
	            product.setImageData(imageFile.getBytes());
	            product.setImageName(imageFile.getOriginalFilename());
	            product.setImageType(imageFile.getContentType());
	        } else {
	            product.setImageData(existingProduct.getImageData());
	            product.setImageName(existingProduct.getImageName());
	            product.setImageType(existingProduct.getImageType());
	        }
	        
	        return repo.save(product);
	    }

	    public void deleteProduct(int id) {
	    	if (!repo.existsById(id)) {
	    		throw new ResourceNotFoundException("Product not found with id: " + id);
	    	}
	        repo.deleteById(id);
	    }

}
