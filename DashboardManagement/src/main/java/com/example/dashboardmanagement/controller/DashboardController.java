package com.example.dashboardmanagement.controller;


import com.example.dashboardmanagement.dto.DashboardDto;
import com.example.dashboardmanagement.dto.GroupDto;
import com.example.dashboardmanagement.dto.UserDto;
import com.example.dashboardmanagement.service.DashboardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@PreAuthorize("hasAnyAuthority('PERM_GROUP_MANAGEMENT','PERM_DASHBOARD_MANAGEMENT')")
@RequestMapping("api/dashboard")
public class DashboardController {

    @Autowired
    DashboardService  dashboardService;


    @ResponseStatus(value=HttpStatus.OK)
    @GetMapping("all")
    public ResponseEntity< List<DashboardDto>>  getAllDashboards(){
        List<DashboardDto> dtos= dashboardService.getAllDashboards();
        System.out.println(dtos);
        return ResponseEntity.ok().body(dtos);

    }

    @ResponseStatus(value=HttpStatus.OK)
    @GetMapping("/{id}")

    public ResponseEntity< DashboardDto> getDashboard(@PathVariable Long id){

        DashboardDto dto =dashboardService.getDashboardById(id);

        return new ResponseEntity<>(dto, HttpStatus.OK);

    }

    @GetMapping()

    public Page<DashboardDto> searchDashboards(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String base_url,
            @RequestParam(required=false)  String secret_key,
            @RequestParam(required = false)  Long resourceValue,
            @RequestParam(required = false) LocalDateTime createdAfter,
            @RequestParam(required = false) LocalDateTime createdBefore,
            @RequestParam(required = false) LocalDateTime updatedAfter,
            @RequestParam(required = false) LocalDateTime updatedBefore,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(name="sort",required = false) List<String> sort



    ){

        Page<DashboardDto> dashboards= dashboardService.searchDashboards(name,description,base_url,secret_key,resourceValue,createdAfter,createdBefore,updatedAfter,updatedBefore,pageNumber,pageSize,
                sort ==null ? List.of("name,asc"):sort

        );

        return dashboards;

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity< DashboardDto> addDashboard( @RequestBody DashboardDto dashboardDto){

        DashboardDto saved=dashboardService.addDashboard(dashboardDto);
        return ResponseEntity.ok().body(saved);

    }


    @ResponseStatus(value = HttpStatus.ACCEPTED)
    @PutMapping("/{id}")
    public ResponseEntity<DashboardDto> updateDashboard(@Valid @RequestBody DashboardDto dto, @PathVariable Long id){

        dto.setId(id);
        DashboardDto updated= dashboardService.updateDashboard(dto);
        return ResponseEntity.ok().body(updated);

    }


    @ResponseStatus(value=HttpStatus.OK)
    @DeleteMapping("/{id}")

    public ResponseEntity<String> deleteDashboard(@PathVariable Long id){

        dashboardService.deleteDashboardById(id);
        return  ResponseEntity.ok("Dashboard Deleted Successfully");
    }





}
