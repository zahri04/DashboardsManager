package com.example.dashboardmanagement.controller;


import com.example.dashboardmanagement.dto.MetabaseDto;
import com.example.dashboardmanagement.service.MetabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/metabase")
@PreAuthorize("hasAnyAuthority('PERM_GROUP_MANAGEMENT','PERM_DASHBOARD_MANAGEMENT','PERM_DASHBOARDS_VIEW')")
public class MetabaseController {

    @Autowired
    private MetabaseService metabaseService;


// returning Metabase Dto containing iframe Url and more details of dashboard
@GetMapping("/dashboard/{id}")
public MetabaseDto getDto(@PathVariable Long id){

    return metabaseService.getDto(id);

}
}
