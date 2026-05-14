package com.Ecomproject.contoller;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.multipart.MultipartFile;

import com.Ecomproject.exception.ResourceNotFoundException;
import com.Ecomproject.model.Product;
import com.Ecomproject.service.ProductService;



@RestController
@RequestMapping("/api")

public class ProductController {
	
	@Autowired
	public ProductService service;
	
	
	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts(){
		return new ResponseEntity<>(service.getAllProducts(),HttpStatus.OK);
		
	}
	@GetMapping("/product/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable int id){
		return new ResponseEntity<>(service.getProductById(id), HttpStatus.OK);
		
	}
	
	
	
	 @PreAuthorize("hasRole('ADMIN')")
	 @PostMapping("/product")
	    public ResponseEntity<?> addProduct(@RequestPart Product product,
	                                        @RequestPart MultipartFile imageFile) throws IOException {
	        Product product1 = service.addProduct(product, imageFile);
	        return new ResponseEntity<>(product1, HttpStatus.CREATED);
	    }

	    @GetMapping("/product/{productId}/image")
	    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId){

	        Product product = service.getProductById(productId);
	        byte[] imageFile = product.getImageData();
	        if (imageFile == null || product.getImageType() == null) {
	            throw new ResourceNotFoundException("Image not found for product id: " + productId);
	        }

	        return ResponseEntity.ok()
	                .contentType(MediaType.valueOf(product.getImageType()))
	                .body(imageFile);

	    }
	    
	    @PreAuthorize("hasRole('ADMIN')")
	    @PutMapping("/product/{id}")
	    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestPart Product product,
	                                                @RequestPart(required = false) MultipartFile imageFile) throws IOException {
	        service.updateProduct(id, product, imageFile);
	        return new ResponseEntity<>("Updated", HttpStatus.OK);
	    }


	    @PreAuthorize("hasRole('ADMIN')")
	    @DeleteMapping("/product/{id}")
	    public ResponseEntity<String> deleteProduct(@PathVariable int id){
	        service.deleteProduct(id);
	        return new ResponseEntity<>("Deleted", HttpStatus.OK);

	    }
	

}
