package com.example.ekart;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan("com.example.ekart.repository")
@ComponentScan(basePackages = "com.example.ekart")
@EnableCaching
public class EkartApplication {

	public static void main(String[] args) {
		SpringApplication.run(EkartApplication.class, args);
	}

}
