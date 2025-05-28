package com.example.dashboardmanagement.service;


import com.example.dashboardmanagement.dto.DashboardAccessDto;
import com.example.dashboardmanagement.dto.DashboardViewDto;
import com.example.dashboardmanagement.exception.DashboardNotFoundException;
import com.example.dashboardmanagement.model.*;
import com.example.dashboardmanagement.repository.DashboardAccessRepo;
import com.example.dashboardmanagement.repository.DashboardRepo;
import com.example.dashboardmanagement.repository.UserRepo;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
// service which handles fetching dashboards to visualize them for normal users(Non-admins)
public class DashboardViewService {


    public final DashboardRepo dashboardRepo;
    public final DashboardService dashboardService;
    public final UserRepo userRepo;
    public final DashboardAccessRepo  dashboardAccessRepo;
    public final DashboardAccessService dashboardAccessService;

    public DashboardViewService(DashboardRepo dashboardRepo, DashboardService dashboardService,UserRepo userRepo,DashboardAccessRepo dashboardAccessRepo, DashboardAccessService dashboardAccessService) {
        this.dashboardRepo = dashboardRepo;
        this.dashboardService = dashboardService;
        this.userRepo = userRepo;
        this.dashboardAccessRepo = dashboardAccessRepo;
        this.dashboardAccessService = dashboardAccessService;
    }


    // dashboardView Object of authentificated User
    // it returns dashboards according to the groups which user is linked to ,group=>its Dashboards
    @Transactional(readOnly = true)
    public Map<String,List<DashboardViewDto>> getDashboardView(UserPrincipal up) {
        Map<String,List<DashboardViewDto>> map = new HashMap<>();
        User user=userRepo.findByUsername(up.getUsername())
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
        System.out.println("user: " + user.getUsername());

        List<Group > groups=user.getGroups().stream().collect(Collectors.toList());
        System.out.println("groups: " + groups);

        for(Group group:groups){
            System.out.println("group: " + group.getName());
            List<DashboardAccessDto> accesses=dashboardAccessService.getAllDashboardAccessesByGroupId(group.getId());
            System.out.println("accesses: " + accesses);

            List<DashboardViewDto> dashboardViewDtos=new ArrayList<>();
            for(DashboardAccessDto dashboardAccess:accesses){
                System.out.println("dashboardAccess: " + dashboardAccess);
                // fetching dashboard
                Dashboard dashboard=dashboardRepo.findById(dashboardAccess.getDashboardId())
                        .orElseThrow(()->new DashboardNotFoundException(dashboardAccess.getDashboardId()));

                dashboardViewDtos.add(
                        new DashboardViewDto(
                                dashboard.getId(),
                                dashboard.getName(),
                                dashboard.getDescription()
                        )
                );

            }
            map.put(group.getName(),dashboardViewDtos);
        }

        return map;






    }

//    public boolean isAccessible(Long id){
//
//
//
//

}
