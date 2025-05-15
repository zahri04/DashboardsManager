package com.example.dashboardmanagement.controller;


import com.example.dashboardmanagement.dto.DashboardStatsDto;
import com.example.dashboardmanagement.dto.UserDto;
import com.example.dashboardmanagement.model.User;
import com.example.dashboardmanagement.service.DashboardStatsService;
import com.example.dashboardmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard/stats")
@PreAuthorize("hasAuthority('PERM_USER_MANAGEMENT')")
public class DashboardStatsController {

    @Autowired
    private DashboardStatsService dashboardStatsService;




    @GetMapping
    public DashboardStatsDto getStats(){
        return dashboardStatsService.getDashboardStats();

    }







}
