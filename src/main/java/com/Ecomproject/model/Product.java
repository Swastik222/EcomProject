package com.Ecomproject.model;

import java.math.BigDecimal;
import java.util.Date;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Product {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;
	private String name;
	private String description;
	private String brand;
	private BigDecimal price;
	private String category;
	
	
	private Date releaseDate;
	private boolean productAvailable;
	private Integer stockQuantity;
	
	
	private String imageName;
	private String imageType;
	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private byte[] imageData;

}
