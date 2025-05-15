package com.example.dashboardmanagement.service;
import com.example.dashboardmanagement.dto.DashboardAccessDto;
import com.example.dashboardmanagement.exception.DashboardAccessAlreadyExistException;
import com.example.dashboardmanagement.exception.DashboardAccessNotFoundException;
import com.example.dashboardmanagement.exception.DashboardNotFoundException;
import com.example.dashboardmanagement.exception.GroupNotFoundException;
import com.example.dashboardmanagement.model.Dashboard;
import com.example.dashboardmanagement.model.DashboardAccess;
import com.example.dashboardmanagement.model.DashboardAccessId;
import com.example.dashboardmanagement.model.Group;
import com.example.dashboardmanagement.repository.DashboardAccessRepo;
import com.example.dashboardmanagement.repository.DashboardRepo;
import com.example.dashboardmanagement.repository.GroupRepo;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DashboardAccessService {


    private final DashboardRepo dashboardRepo;


    private final GroupRepo groupRepo;


    private final DashboardAccessRepo dashboardAccessRepo;




    @Autowired
    public DashboardAccessService(DashboardRepo dashboardRepo,
                                  GroupRepo groupRepo,
                                  DashboardAccessRepo dashboardAccessRepo
                                 ) {
        this.dashboardRepo = dashboardRepo;
        this.groupRepo = groupRepo;
        this.dashboardAccessRepo = dashboardAccessRepo;

    }


    // Convert Entity to DTO
    public DashboardAccessDto convertToDto(DashboardAccess dashboardAccess) {
        DashboardAccessDto dto= new DashboardAccessDto();
        dto.setDashboard_id(dashboardAccess.getDashboard().getId());
        dto.setGroup_id(dashboardAccess.getGroup().getId());
        dto.setCanView(dashboardAccess.isCanView());
        dto.setCanEdit(dashboardAccess.isCanEdit());

        return dto;
    }

    // Convert DTO into Entity
    public DashboardAccess convertToEntity(DashboardAccessDto dashboardAccessDto) {
        DashboardAccess dashboardAccess = new DashboardAccess();
        Long groupId = dashboardAccessDto.getGroup_id();
        Long dashboardId = dashboardAccessDto.getDashboard_id();

        // Generating the Composite Key
        DashboardAccessId dashboardAccessId = new DashboardAccessId(groupId, dashboardId);

        // Fetching the Dashboard and Group Entities
        Dashboard dashboard = dashboardRepo.findById(dashboardId).orElseThrow(() -> new DashboardNotFoundException(dashboardId));
        Group group = groupRepo.findById(groupId).orElseThrow(() -> new GroupNotFoundException(groupId));

        // Setting values to the DashboardAccess Entity
        dashboardAccess.setId(dashboardAccessId);
        dashboardAccess.setDashboard(dashboard);
        dashboardAccess.setGroup(group);
        dashboardAccess.setCanView(dashboardAccessDto.isCanView());
        dashboardAccess.setCanEdit(dashboardAccessDto.isCanEdit());

        return dashboardAccess;
    }

    // Add a new Dashboard Access
    public DashboardAccessDto addDashboardAccess(DashboardAccessDto dto) throws RuntimeException {


        // checking if DashboardAccessDto doesn't Exist

        DashboardAccessId dashboardAccessId = new DashboardAccessId(dto.getGroup_id(), dto.getDashboard_id());


        if(dashboardAccessRepo.existsById(dashboardAccessId)) {
            throw new DashboardAccessAlreadyExistException(dto.getGroup_id(), dto.getDashboard_id());

        }


        // getting Dashboard Object

        Dashboard dashboard= dashboardRepo
                .findById(dto.getDashboard_id())
                .orElseThrow(() -> new DashboardNotFoundException(dto.getDashboard_id()));

        Group group = groupRepo
                .findById(dto.getGroup_id())
                .orElseThrow(() -> new GroupNotFoundException(dto.getGroup_id()));

        // Creating New DashboardAccess Object

        DashboardAccess dashboardAccess=new DashboardAccess();
        dashboardAccess.setId(dashboardAccessId);
        dashboardAccess.setDashboard(dashboard);
        dashboardAccess.setGroup(group);
        dashboardAccess.setCanView(dto.isCanView());
        dashboardAccess.setCanEdit(dto.isCanEdit());





        // Save the Entity in the database
        DashboardAccess saved = dashboardAccessRepo.save(dashboardAccess);

        // Convert the saved entity back to DTO
        return convertToDto(saved);
    }


    // Get a Single Dashboard Access by A Composite Key
    public DashboardAccessDto getDashboardAccessById(Long dashboardId, Long groupId) throws RuntimeException {

        if(!dashboardRepo.existsById(dashboardId)) {
            throw new DashboardNotFoundException(dashboardId);
        }
        if(!groupRepo.existsById(groupId)) {
            throw new GroupNotFoundException(groupId);
        }



        DashboardAccess dashboardAccess = dashboardAccessRepo
                .findById(new DashboardAccessId(groupId,dashboardId))
                .orElseThrow(()-> new DashboardAccessNotFoundException(groupId, dashboardId));


        return convertToDto(dashboardAccess);
    }


    // get All DashboardAccesses In Database For testing
    public List<DashboardAccessDto> getAllDashboardAccesses() {

        return  dashboardAccessRepo.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    // getAllDashboardAccess For a Certain Dashboard

    public List<DashboardAccessDto> getAllDashboardAccessesByDashboardId(Long dashboardId) {
        return dashboardAccessRepo.findAllByDashboard_Id(dashboardId).stream().map(this::convertToDto).collect(Collectors.toList());

    }

    // getAllDashboardAccess For A certain Group

    public List<DashboardAccessDto> getAllDashboardAccessesByGroupId(Long groupId) {
        return dashboardAccessRepo.findAllByGroup_Id(groupId).stream().map(this::convertToDto).collect(Collectors.toList());

    }
    // update dashboard access

    public DashboardAccessDto updateDashboardAccess(DashboardAccessDto dto) {
        DashboardAccessId id = new DashboardAccessId(dto.getGroup_id(), dto.getDashboard_id());
        DashboardAccess existing = dashboardAccessRepo.findById(id)
                .orElseThrow(() -> new DashboardAccessNotFoundException(dto.getGroup_id(), dto.getDashboard_id()));
        // update flags
        existing.setCanView(dto.isCanView());
        existing.setCanEdit(dto.isCanEdit());
        return convertToDto(dashboardAccessRepo.save(existing));
    }


    // Delete(revoking) a Dashboard Access

    public void deleteDashboardAccess(Long groupId,Long dashboardId) throws RuntimeException {
        DashboardAccessId dashboardAccessId = new DashboardAccessId(groupId, dashboardId);

        if(!dashboardAccessRepo.existsById(dashboardAccessId)) {
            throw new DashboardAccessNotFoundException(groupId, dashboardId);

        }
        dashboardAccessRepo.deleteById(dashboardAccessId);






    }

}
