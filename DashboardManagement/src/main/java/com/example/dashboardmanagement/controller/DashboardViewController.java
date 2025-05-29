package com.example.dashboardmanagement.controller;


import com.example.dashboardmanagement.dto.DashboardViewDto;
import com.example.dashboardmanagement.model.Group;
import com.example.dashboardmanagement.model.UserPrincipal;
import com.example.dashboardmanagement.service.DashboardViewService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("api/dashboardView")
@PreAuthorize("hasAnyAuthority('PERM_GROUP_MANAGEMENT','PERM_DASHBOARD_MANAGEMENT','PERM_DASHBOARDS_VIEW','PERM_USER_MANAGEMENT')")
public class DashboardViewController {

    public final DashboardViewService dashboardViewService;
    public DashboardViewController(DashboardViewService dashboardViewService) {
        this.dashboardViewService = dashboardViewService;
    }

    @GetMapping()

    public Map<String,List<DashboardViewDto>> getDashboardView(Authentication authentication){
       UserPrincipal authenticatedUser=(UserPrincipal) authentication.getPrincipal();


       return dashboardViewService.getDashboardView(authenticatedUser);



    }

}
