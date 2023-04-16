package com.bridgelabz.bookstore.controller;

import com.bridgelabz.bookstore.repository.IUserRepository;
import com.bridgelabz.bookstore.repository.UserRepository;
import com.bridgelabz.bookstore.response.BookResponse;
import com.bridgelabz.bookstore.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.bridgelabz.bookstore.dto.UserDto;
import com.bridgelabz.bookstore.entity.Users;
import com.bridgelabz.bookstore.exception.UserException;
import com.bridgelabz.bookstore.request.LoginInformation;
import com.bridgelabz.bookstore.request.PasswordReset;
import com.bridgelabz.bookstore.request.PasswordUpdate;
import com.bridgelabz.bookstore.response.Response;
import com.bridgelabz.bookstore.response.UsersDetailRes;
import com.bridgelabz.bookstore.service.UserServices;
import com.bridgelabz.bookstore.util.JwtGenerator;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserServices service;

    @Autowired
    private UserRepository repository;
    @Autowired
    private JwtGenerator generate;
    @Autowired
    private IUserRepository urepository;
    @Autowired
    private BCryptPasswordEncoder encryption;

    @PostMapping("/registration")
    @ResponseBody
    public ResponseEntity<Response> registration(@RequestBody UserDto information) {
        System.out.println("user info" + information.toString());
        boolean result = service.register(information);
        if (result) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new Response("registration successfull", 200, information));
        } else {
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED)
                    .body(new Response("User Already Exist", 400, information));
        }
    }


    @PostMapping("/user/login")
    public ResponseEntity<UsersDetailRes> login(@RequestBody LoginInformation information) {

        Users users = service.login(information);
        if (users != null && users.getActive() == 1&&users.getIsdelete()==null) {
            String token = generate.jwtToken(users.getUserId());
            return ResponseEntity.status(HttpStatus.ACCEPTED).header("login successfull", information.getEmail())
                    .body(new UsersDetailRes(token, 200, users));
        } else {
            throw new UserException(" Invalide credentials");
        }
    }

    /**
     * This is for the user verify.......
     *
     * @param token
     * @return response as success and fail
     * @throws Exception
     */
    @GetMapping("/user/verify/{token}")
    public ResponseEntity<Response> userVerification(@PathVariable("token") String token) throws Exception {
        System.out.println("token for verification" + token);
        boolean update = service.verify(token);
        if (update) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("verified", 200));
        } else {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("not verified", 400));
        }
    }

    /**
     * This is used for the get one user based on there token
     *
     * @param token
     * @return response
     */
    @PostMapping("user/forgotpassword")
    public ResponseEntity<Response> forgogPassword(@RequestBody PasswordReset passwordReset) {

        boolean result = service.isUserExist(passwordReset.getEmail());
        if (result) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("Check your email: Email sent", 200));
        } else {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Response("user does not exist with given email id", 400));
        }
    }

    @PutMapping("user/update/{token}")
    public ResponseEntity<Response> update(@PathVariable("token") String token, @RequestBody PasswordUpdate update) {
        System.out.println("inside controller  " + token);
        boolean result = service.update(update, token);
        if (result) {
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(new Response("password updated successfully", 200));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new Response("password doesn't match", 401));
        }

    }

    @GetMapping("user/getOneUser")
    public ResponseEntity<Response> getOneUsers(@RequestHeader("token") String token) {
        Users user = service.getSingleUser(token);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new Response("user is", 200, user));
    }

    @GetMapping("user/getUsers")
    public ResponseEntity<UserResponse> getUsers(@RequestParam(value = "keyword", required = false) String searchName,
                                                 @RequestParam(defaultValue = "0") int currentPage, @RequestParam(defaultValue = "10") int perPage
    ) {
        Pageable paging = PageRequest.of(currentPage, perPage);
        Page<Users> users = repository.GetAll(searchName, paging);
        List<Users> user = users.getContent();
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new UserResponse("status", users.getContent(), users.getTotalPages()));
    }

    @GetMapping("DeleteUser/{userId}")
    public ResponseEntity<Response> deleteUser(@PathVariable long userId) {
        Users user = service.findById(userId);
        user.setIsdelete(1);
        repository.save(user);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new Response("delete", 200, user));
    }

    @GetMapping("ActiveUser/{userId}")
    public ResponseEntity<Response> activeUser(@PathVariable long userId) {
        Users user = service.findById(userId);
        if(user.getActive()==0) {
            user.setActive(1);
        }
        else {
            user.setActive(0);
        }
        repository.save(user);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new Response("delete", 200, user));
    }
    @GetMapping("DetailUser/{userId}")
    public ResponseEntity<Response> detailUser(@PathVariable long userId) {
        Users user = service.findById(userId);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new Response("delete", 200, user));
    }
    @PutMapping("updateInfo")
    public ResponseEntity<Response> updateInfo(@RequestBody UserDto info){
        //ko đổi đc info email
        Users user = urepository.getUser(info.getEmail());
        user.setName(info.getName());
        user.setMobileNumber(info.getMobileNumber());
        repository.save(user);
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(new Response("cập nhật thông tin thành công", 200));
    }
    @PutMapping("updatePassword/{id}")
    public ResponseEntity<Response> updatePassword(@PathVariable Long id,@RequestBody UserDto info){
        //ko đổi đc info email

       Users users=repository.findUserById(id).get();
        String epassword = encryption.encode(info.getPassword());
        users.setPassword(epassword);
        repository.save(users);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new Response("Đổi mật khẩu thành công", 200));
    }


    @GetMapping("user/getUsersDeleted")
    public ResponseEntity<UserResponse> getAllUsersDeleted(@RequestParam(value = "keyword", required = false) String searchName,
                                                           @RequestParam(defaultValue = "0") int currentPage, @RequestParam(defaultValue = "10") int perPage
    ) {
        Pageable paging = PageRequest.of(currentPage, perPage);
        Page<Users> users = repository.GetAllDeleted(searchName, paging);
        List<Users> user = users.getContent();
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new UserResponse("status", users.getContent(), users.getTotalPages()));
    }


    @PostMapping("user/SearchData")
    public  ResponseEntity<UserResponse>search(@RequestBody Users users) {
        List<Users> u= service.searchData(users.getName());
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new UserResponse("status", service.searchData(users.getName()),u.size()));
    }
}
