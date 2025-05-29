package com.example.dashboardmanagement.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.dashboardmanagement.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepo extends JpaRepository<User,Long> {



    Boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);

    // return users which are not enabled yet
    List<User> findByEnabled(boolean enabled);


    Long countByCreatedAtAfter(LocalDateTime date);



        @Query("""
    select distinct u
      from User u
      left join fetch u.groups g
      left join fetch g.dashboardAccesses da
      left join fetch da.dashboard dash
     where u.username = :username
  """)
        Optional<User> findUserByUsernameWithAccesses(@Param("username") String username);




    // advanced Search with multiple properties

    @Query(
            "SELECT DISTINCT user FROM User user Left JOIN user.groups g  WHERE "
            +"(:username is NULL or user.username Like %:username% ) AND "
            +"(:fullName is NULL or user.fullName like %:fullName%) AND " +
             "(:enabled IS NULL OR user.enabled = :enabled) AND " +
              "(:createdAfter IS NULL OR user.createdAt >= :createdAfter) AND " +
              "(:createdBefore IS NULL OR user.createdAt <= :createdBefore) AND " +
              "(:updatedAfter IS NULL OR user.updatedAt >= :updatedAfter) AND " +
               "(:updatedBefore IS NULL OR user.updatedAt <= :updatedBefore) AND "
            +"(:groupNames is NULL or g.name IN :groupNames)"
    )
    Page<User> searchUsers(
            @Param("username") String username,
            @Param("fullName") String fullName,
            @Param("enabled") Boolean enabled,
            @Param("createdAfter") LocalDateTime createdAfter,
            @Param("createdBefore") LocalDateTime createdBefore,
            @Param("updatedAfter") LocalDateTime updatedAfter,
            @Param("updatedBefore") LocalDateTime updatedBefore,
            @Param("groupNames") List<String> groupNames,
            Pageable pageable
    );




}
