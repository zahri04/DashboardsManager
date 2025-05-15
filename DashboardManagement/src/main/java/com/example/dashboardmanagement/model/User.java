package com.example.dashboardmanagement.model;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="`users`")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)

    @Column(name="user_id")
    private Long id;


    @Column(unique = true,nullable = false,updatable = false)
    private String username;

    @Column(unique = false)
    private String password;

    @Column(unique = false)
    private String fullName;

    private Boolean enabled=false;


    @CreationTimestamp
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;






    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})

    @JoinTable(
            name="UserGroup",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="group_id")
    )


    private Set<Group> groups=new HashSet<>();





    @Override
    public String toString() {
        return "User{id=" + id + ", username='" + username + "'}";
    }



}
