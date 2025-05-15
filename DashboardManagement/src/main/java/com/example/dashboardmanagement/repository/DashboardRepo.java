package com.example.dashboardmanagement.repository;

import com.example.dashboardmanagement.model.Dashboard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface DashboardRepo extends JpaRepository<Dashboard,Long> {


    Boolean existsByName(String name);


    @Query(
            "SELECT DISTINCT d FROM Dashboard d  WHERE"+
                    "(:name IS Null OR d.name LIKE %:name%  ) AND"+
                    "(:description IS Null OR d.description LIKE %:description% )AND "+
                    "(:base_url IS Null OR d.base_url LIKE %:base_url% )AND "+
                    "(:secret_key IS Null OR d.secret_key LIKE %:secret_key% )AND "+
                    "(:createdAfter IS Null OR :createdAfter <= d.createdAt )AND "+
                    "(:createdBefore IS Null OR :createdBefore >= d.createdAt  )AND"+
                    "(:updatedAfter IS Null OR :updatedAfter <= d.updatedAt  )AND"+
                    "(:updatedBefore IS Null OR :updatedBefore <= d.updatedAt  )"




    )
    Page<Dashboard> searchDashboards(
            @Param("name") String name,
            @Param("description") String description,
            @Param("base_url") String baseUrl,
            @Param("secret_key") String secret_key,
            @Param("createdAfter") LocalDateTime createdAfter,
            @Param("createdBefore") LocalDateTime createdBefore,
            @Param("updatedAfter") LocalDateTime updatedAfter,
            @Param("updatedBefore") LocalDateTime updatedBefore,
            Pageable pageable);

}

