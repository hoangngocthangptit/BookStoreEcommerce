package com.bridgelabz.bookstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import com.bridgelabz.bookstore.entity.Users;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<Users, Long>{

//	@Query(value = "select * from user where user_id=?", nativeQuery = true)
//    String login();
//
////	@Query(value = "insert into user (user_id,user_name,user_email, password, create_time, user_number) values (?, ?, ?, ?, ?, ?, ?)", nativeQuery = true)
////	User register(User user);
//
//	@Query(value = "update user set password=? where email=?", nativeQuery = true)
//	Users forgotPassword(String password, String email);
//
//	@Query(value = "select * from user where user_id=?", nativeQuery = true)
//	Optional<Users> findUserById(Long id);
//
//	@Query(value = "select * from user where email=?", nativeQuery = true)
//    Optional<Users> findUserByEmail(String email);
//
//	@Query(value = "update user set verify_status=true where user_id=?", nativeQuery = true)
//	boolean verify(long id);

//   @Query(value="delete from cart_details where cart_id=?;",nativeQuery=true)
//   CartDetails deleteCart(Long id);
@Query(value = "select * from users where user_id=?", nativeQuery = true)
Optional<Users> findUserById(Long id);
    @Query(value = "select * from users u where active=1 and (?1 is null or name like %?1%)", nativeQuery = true)
    Page<Users> GetAll(String name, Pageable pageable);
    @Query(value = "select * from users where ?1 is null or active=0 and name like %?1%", nativeQuery = true)
    Page<Users> GetAllDeleted(String name, Pageable pageable);
   @Query("select u from  Users u where u.email =:name and u.isdelete is null")
    List<Users> getdata(String name);
    @Query("select u from  Users u where u.isdelete is null ")
    List<Users>getAll();
    @Query("select u from  Users u where u.isdelete is null and u.role='user'")
    List<Users>getAllUser();

}
