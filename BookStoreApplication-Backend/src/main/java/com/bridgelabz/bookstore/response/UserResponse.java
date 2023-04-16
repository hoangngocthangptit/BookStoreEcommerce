package com.bridgelabz.bookstore.response;

import com.bridgelabz.bookstore.entity.Users;
import io.swagger.models.auth.In;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.List;

public class UserResponse {

	private String Message;
	private HttpStatus status;
	private Object obj;
	private List<Users>users;
	private Integer total;

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public UserResponse(Integer total) {
		this.total = total;
	}

	public UserResponse(String message, Object obj, Integer total) {
		Message = message;
		this.obj = obj;
		this.total = total;
	}

	public UserResponse(String message, Object obj) {
		super();
		Message = message;
		this.obj = obj;
	}



	public UserResponse(String message, Object obj, HttpStatus status) {
		super();
		this.status = status;
		Message = message;
		this.obj = obj;
	}

	public List<Users> getUsers() {
		return users;
	}

	public UserResponse(String message, List<Users> users) {
		Message = message;
		this.users = users;
	}

	public void setUsers(List<Users> users) {
		this.users = users;
	}

	public String getMessage() {
		return Message;
	}


	public void setMessage(String message) {
		Message = message;
	}


	public HttpStatus getStatus() {
		return status;
	}


	public void setStatus(HttpStatus status) {
		this.status = status;
	}


	public Object getObj() {
		return obj;
	}


	public void setObj(Object obj) {
		this.obj = obj;
	}
	
	
}
