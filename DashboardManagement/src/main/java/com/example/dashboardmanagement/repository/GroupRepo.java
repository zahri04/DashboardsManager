package com.example.dashboardmanagement.repository;

import com.example.dashboardmanagement.dto.GroupDto;
import com.example.dashboardmanagement.model.Authority;
import com.example.dashboardmanagement.model.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface GroupRepo extends JpaRepository<Group,Long> {

    Group findByName(String name);
    Boolean existsByName(String name);

    List<Group> findAllByNameIn(List<String> names);

    // searching,filtering,pagination


    @Query(
            "SELECT DISTINCT g FROM Group g LEFT JOIN g.authorities authorities WHERE"+
             "(:name IS Null OR g.name LIKE %:name%  ) AND"+
            "(:description IS Null OR g.description LIKE %:description% )AND "+
            "(:createdAfter IS Null OR :createdAfter <= g.createdAt )AND "+
            "(:createdBefore IS Null OR :createdBefore >= g.createdAt  )AND"+
            "(:updatedAfter IS Null OR :updatedAfter <= g.updatedAt  )AND"+
            "(:updatedBefore IS Null OR :updatedBefore <= g.updatedAt  )AND"+
                    "(:authority is Null OR authorities.name  In :authority )"



    )
    Page<Group> searchGroups(
            @Param("name") String name,
            @Param("description") String description,
            @Param("createdAfter") LocalDateTime createdAfter,
            @Param("createdBefore") LocalDateTime createdBefore,
            @Param("updatedAfter") LocalDateTime updatedAfter,
            @Param("updatedBefore") LocalDateTime updatedBefore,
            @Param("authority") String authority,
            Pageable pageable
    );

}
