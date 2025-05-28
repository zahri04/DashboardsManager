package com.example.dashboardmanagement.controller;

import com.example.dashboardmanagement.dto.BatchAccessDto;
import com.example.dashboardmanagement.dto.DashboardAccessDto;
import com.example.dashboardmanagement.service.DashboardAccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboardAccess")
@PreAuthorize("hasAnyAuthority('PERM_GROUP_MANAGEMENT','PERM_DASHBOARD_MANAGEMENT','PERM_DASHBOARDS_VIEW')")
public class DashboardAccessController {

    private final DashboardAccessService dashboardAccessService;

    @Autowired
    public DashboardAccessController(DashboardAccessService dashboardAccessService) {
        this.dashboardAccessService = dashboardAccessService;
    }

    // Create a new Dashboard Access
    @PostMapping
    public DashboardAccessDto createDashboardAccess(@RequestBody DashboardAccessDto dto) {
        return dashboardAccessService.addDashboardAccess(dto);
    }

    // Get DashboardAccess by groupId and dashboardId
    @GetMapping("/{groupId}/{dashboardId}")
    public DashboardAccessDto getDashboardAccess(
            @PathVariable Long groupId,
            @PathVariable Long dashboardId) {
        return dashboardAccessService.getDashboardAccessById(groupId, dashboardId);
    }

    @PostMapping("/batch")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> assignBatch(@RequestBody BatchAccessDto batch) {
        dashboardAccessService.assignBatch(batch);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Update DashboardAccess
    @PutMapping
    public DashboardAccessDto updateDashboardAccess(@RequestBody DashboardAccessDto dto) {
        return dashboardAccessService.updateDashboardAccess(dto);
    }

    // Delete DashboardAccess
    @DeleteMapping("/{groupId}/{dashboardId}")
    public void deleteDashboardAccess(
            @PathVariable Long groupId,
            @PathVariable Long dashboardId) {
        dashboardAccessService.deleteDashboardAccess(groupId, dashboardId);
    }

    // Get all dashboard accesses
    @GetMapping
    public List<DashboardAccessDto> getAllDashboardAccesses() {
        return dashboardAccessService.getAllDashboardAccesses();
    }

    // Get all accesses for a specific dashboard
    @GetMapping("/dashboard/{dashboardId}")
    public List<DashboardAccessDto> getAllByDashboard(@PathVariable Long dashboardId) {
        return dashboardAccessService.getAllDashboardAccessesByDashboardId(dashboardId);
    }

    // Get all accesses for a specific group
    @GetMapping("/group/{groupId}")
    public List<DashboardAccessDto> getAllByGroup(@PathVariable Long groupId) {
        return dashboardAccessService.getAllDashboardAccessesByGroupId(groupId);
    }
}
