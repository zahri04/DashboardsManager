package com.example.dashboardmanagement.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Table(name="`groups`")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="group_id")
    private Long id;

    @Column(unique = true,nullable = false)
    private String name;

    @Column(unique = true,nullable=true)
    private String description;

    @CreationTimestamp
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    @ManyToMany(mappedBy = "groups")
    private Set<User> users;


    @ManyToMany(fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name="GroupAuthority"
    ,joinColumns = @JoinColumn(name = "group_id"),
     inverseJoinColumns = @JoinColumn(name="authority_id")

    )
    private Set<Authority> authorities;

    @OneToMany(mappedBy = "group",cascade=CascadeType.ALL,orphanRemoval = true)
    private Set<DashboardAccess> dashboardAccesses ;




    @Override
    public String toString() {
        return "Group{id=" + id + ", name='" + name + "'}";
    }


}
