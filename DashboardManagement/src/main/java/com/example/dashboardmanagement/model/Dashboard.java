package com.example.dashboardmanagement.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="`dashboards`")

public class Dashboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "dashboard_id")
    private long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    @Column(nullable = false)

    private String base_url;

    @Column(nullable = false)

    private String secret_key;

//    // the resource key is required for metabase token signature for example:
//    // payload{
////    dashboard:1
////} dashboard represent the type of the
//    @Column
//    private String resourceKey;
//    // the resource value

    // resourceValue represents the id of the dashboard to render using metabase
    @Column
    private Long resourceValue;

    @CreationTimestamp
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;



    @ManyToOne
    @JoinColumn(name = "created_by")
    @OnDelete(action= OnDeleteAction.SET_NULL)

    private User created_by;

    @OneToMany(mappedBy = "dashboard", cascade = CascadeType.ALL,orphanRemoval = true)

    private Set<DashboardAccess> dashboard_accesses;





}
