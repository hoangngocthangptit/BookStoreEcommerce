/**
 * 
 */
package com.bridgelabz.bookstore.repository.implementation;

import java.util.List;

import javax.persistence.EntityManager;

import com.bridgelabz.bookstore.entity.Book;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.bridgelabz.bookstore.entity.Users;
import com.bridgelabz.bookstore.repository.IUserRepository;
import com.bridgelabz.bookstore.request.PasswordUpdate;


@Repository
public class UserRepositoryImplementation implements IUserRepository {
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public Users save(Users users) {
		System.out.println("repository implementation called save" );
		Session session = entityManager.unwrap(Session.class);
		session.saveOrUpdate(users);
		return users;
	}

	@Override
	public Users getUser(String email) {
		Session session = entityManager.unwrap(Session.class);
		@SuppressWarnings("rawtypes")
		Query q = session.createQuery(" FROM Users where email=:email");
		q.setParameter("email", email);
		return (Users) q.uniqueResult();
	}


	@Override
	public boolean verify(Long id) {
		Session session = entityManager.unwrap(Session.class);
		Query q = session.createQuery("update Users set is_verified=:p" + " " + " " + "where id=:i");
		q.setParameter("p", true);
		q.setParameter("i", id);

		int status = q.executeUpdate();
		if (status > 0) {
			return true;
		} else {
			return false;
		}

	}


	/**
	 *  Here updating password
	 *  @param password and id
	 *  @return true and false
	 */

	@Override
	public boolean upDate(PasswordUpdate information, Long id) {
		Session session = entityManager.unwrap(Session.class);
		Query q = session.createQuery("update Users set password=:p" + " " + " " + "where id=:i");
		q.setParameter("p", information.getConfirmPassword());
		q.setParameter("i", id);

		int status = q.executeUpdate();
		if (status > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Getting the userInformation based on there Id
	 * @return user details
	 * @param id of the user
	 */
	@Override
	public Users getUserById(Long id) {
		Session session = entityManager.unwrap(Session.class);
		Query q = session.createQuery(" FROM Users where id=:id");
		q.setParameter("id", id);
		return (Users) q.uniqueResult();

	}

	@Override
	public List<Users> getUsers() {
		Session currentsession = entityManager.unwrap(Session.class);
		List<Users> usersList = currentsession.createQuery("from Users where active=1").getResultList();
		return  usersList;
	}

	@Override
	public List<Users> GetAllDeleted() {
		Session currentsession = entityManager.unwrap(Session.class);
		List<Users> usersList = currentsession.createQuery("from Users where active=0").getResultList();
		return  usersList;
	}

	@Override
	public Page<Users> findByBookName(String name, Pageable pageable) {
		Session currentsession = entityManager.unwrap(Session.class);
		Page<Users> usersList = (Page<Users>) currentsession.createQuery("from Users where active=1 and name like %?1% ").getResultList();
		return  usersList;
//		@org.springframework.data.jpa.repository.Query( value = "select * from bookinfo where book_name like %?1% AND status='approved'", nativeQuery = true)
	}

}
