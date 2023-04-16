package com.bridgelabz.bookstore.dto;

import com.bridgelabz.bookstore.entity.Book;
import com.bridgelabz.bookstore.entity.Quantity;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {
	
	private Long orderId;
	
	private String orderStatus;
	private Double totalPrice;
	private String address;
	private List<Quantity> QuantityOfBooks;
	private List<Book> BooksList;
	private LocalDateTime orderPlacedTime;
	private String name;
	private Long mobileNumber;


	public String getName() {
		return name;
	}





	public OrderDto(Long orderId, String orderStatus, Double totalPrice, String address, LocalDateTime orderPlacedTime, String name, Long mobileNumber, String city) {
		this.orderId = orderId;
		this.orderStatus = orderStatus;
		this.totalPrice = totalPrice;
		this.address = address;
		this.orderPlacedTime = orderPlacedTime;
		this.name = name;
		this.mobileNumber = mobileNumber;
		this.city = city;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(Long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public List<Quantity> getQuantityOfBooks() {
		return QuantityOfBooks;
	}

	public LocalDateTime getOrderPlacedTime() {
		return orderPlacedTime;
	}

	public void setOrderPlacedTime(LocalDateTime orderPlacedTime) {
		this.orderPlacedTime = orderPlacedTime;
	}

	public OrderDto(Long orderId, String orderStatus, Double totalPrice, String address, List<Quantity> quantityOfBooks, List<Book> booksList, LocalDateTime orderPlacedTime, String city) {
		this.orderId = orderId;
		this.orderStatus = orderStatus;
		this.totalPrice = totalPrice;
		this.address = address;
		QuantityOfBooks = quantityOfBooks;
		BooksList = booksList;
		this.orderPlacedTime = orderPlacedTime;
		this.city = city;
	}

	public OrderDto(Long orderId, String orderStatus, Double totalPrice, String address, LocalDateTime orderPlacedTime, String city) {
		this.orderId = orderId;
		this.orderStatus = orderStatus;
		this.totalPrice = totalPrice;
		this.address = address;
		this.orderPlacedTime = orderPlacedTime;
		this.city = city;
	}

	public void setQuantityOfBooks(List<Quantity> quantityOfBooks) {
		QuantityOfBooks = quantityOfBooks;
	}

	public List<Book> getBooksList() {
		return BooksList;
	}

	public void setBooksList(List<Book> booksList) {
		BooksList = booksList;
	}

	public OrderDto(Long orderId, String orderStatus, Double totalPrice, String address, String city) {
		this.orderId = orderId;
		this.orderStatus = orderStatus;
		this.totalPrice = totalPrice;
		this.address = address;
		this.city = city;
	}

	private String city;

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public OrderDto(Long orderId, String orderStatus) {
		this.orderId = orderId;
		this.orderStatus = orderStatus;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
}
