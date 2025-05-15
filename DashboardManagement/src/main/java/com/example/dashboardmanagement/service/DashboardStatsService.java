package com.example.dashboardmanagement.service;

import com.example.dashboardmanagement.dto.DashboardStatsDto;
import com.example.dashboardmanagement.dto.UserDto;
import com.example.dashboardmanagement.model.User;
import com.example.dashboardmanagement.repository.DashboardRepo;
import com.example.dashboardmanagement.repository.GroupRepo;
import com.example.dashboardmanagement.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DashboardStatsService {

    private final GroupRepo groupRepo;
    private final DashboardRepo dashboardRepo;
    private final UserRepo userRepo;
    private final UserService userService;

    public DashboardStatsService(GroupRepo groupRepo, DashboardRepo dashboardRepo, UserRepo userRepo,UserService userService) {
        this.groupRepo = groupRepo;
        this.dashboardRepo = dashboardRepo;
        this.userRepo = userRepo;
        this.userService = userService;

    }

    // returns Stats As A DashboardStatsDto Object

    public DashboardStatsDto getDashboardStats(){
        DashboardStatsDto dashboardStatsDto = new DashboardStatsDto();
         // calculating Total Users
        Long totalUsers= userRepo.count();
        // calculating Registered Users This Week
        LocalDateTime oneWeekAgo=LocalDateTime.now().minusWeeks(1);
        Long usersThisWeek= userRepo.countByCreatedAtAfter(oneWeekAgo);

        // calculating number of groups
        long totalGroups=groupRepo.count();

        // calculating number of Dashboards

        Long totalDashboards=dashboardRepo.count();

        // Setting Values
        dashboardStatsDto.setTotalUsers(totalUsers);
        dashboardStatsDto.setUsersThisWeek(usersThisWeek);
        dashboardStatsDto.setTotalGroups(totalGroups);
        dashboardStatsDto.setTotalDashboards(totalDashboards);
        return dashboardStatsDto;

    }


}
