package com.example.dashboardmanagement.repository;

import com.example.dashboardmanagement.model.Authority;
import com.example.dashboardmanagement.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorityRepo extends JpaRepository<Authority,Long> {
    boolean existsByName(String name);
    List<Authority> findAllByNameIn(List<String> names);
}
