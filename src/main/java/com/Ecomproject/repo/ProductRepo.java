package com.Ecomproject.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Ecomproject.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer>{
	
	

}
