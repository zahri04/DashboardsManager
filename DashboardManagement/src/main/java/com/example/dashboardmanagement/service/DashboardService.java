package com.example.dashboardmanagement.service;

import com.example.dashboardmanagement.dto.DashboardDto;
import com.example.dashboardmanagement.dto.GroupDto;
import com.example.dashboardmanagement.exception.DashboardNameAlreadyExistException;
import com.example.dashboardmanagement.exception.DashboardNotFoundException;
import com.example.dashboardmanagement.exception.UserNotFoundException;
import com.example.dashboardmanagement.exception.ValidationException;
import com.example.dashboardmanagement.model.Dashboard;
import com.example.dashboardmanagement.model.DashboardAccess;
import com.example.dashboardmanagement.model.Group;
import com.example.dashboardmanagement.model.User;
import com.example.dashboardmanagement.repository.DashboardAccessRepo;
import com.example.dashboardmanagement.repository.DashboardRepo;
import com.example.dashboardmanagement.repository.UserRepo;
import com.example.dashboardmanagement.utils.PaginationUtils;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private DashboardAccessRepo dashboardAccessRepo;

    @Autowired
    private DashboardRepo dashboardRepo;

    // Convert Entity to DTO
    public DashboardDto convertToDto(Dashboard dashboard) {
        DashboardDto dto = new DashboardDto();
        dto.setId(dashboard.getId());
        dto.setName(dashboard.getName());
        dto.setDescription(dashboard.getDescription());
        dto.setBase_url(dashboard.getBase_url());
        dto.setSecret_key(dashboard.getSecret_key());
        dto.setCreated_at(dashboard.getCreatedAt());
        dto.setUpdated_at(dashboard.getUpdatedAt());

        // setting the user id of who created this dashboard, (generally will be Included To Group Admins,Or Assistants)
        Long creatorId= dashboard.getCreated_by() !=null ?dashboard.getCreated_by().getId():null;
        dto.setCreated_by_id(creatorId);

        // setting the username of the creator of this dashboard

        String creatorUsername=dashboard.getCreated_by()!=null ? dashboard.getCreated_by().getUsername():"";
        dto.setCreated_by_username(creatorUsername);
        return dto;
    }


    // Convert DTO to Entity , for Adding a New Dashboard Specifically
    public Dashboard convertToEntity(DashboardDto dto) {
        Dashboard dashboard = new Dashboard();


        dashboard.setName(dto.getName());
        dashboard.setDescription(dto.getDescription());
        dashboard.setBase_url(dto.getBase_url());
        dashboard.setSecret_key(dto.getSecret_key());


        // in case if no user sent next to the dashboard while updating or creating
        Long creatorId = dto.getCreated_by_id()  != null ? dto.getCreated_by_id():null;
        if(creatorId!=null){
            User creator = userRepo.findById(creatorId)
                    .orElseThrow(() -> new UserNotFoundException(dto.getCreated_by_id()));
            dashboard.setCreated_by(creator);
        }else{
            dashboard.setCreated_by(null);
        }
        // created_by user stays Null


        // here dashboard doesn't exist yet to have some accesses
        dashboard.setDashboard_accesses(null);

        return dashboard;
    }

    // Create
    public DashboardDto addDashboard(DashboardDto dto) throws RuntimeException {

        // checking if there is an existing Dashboard with the Same Name

        if(dashboardRepo.existsByName(dto.getName())){
            throw new DashboardNameAlreadyExistException(dto.getName());


        }

        Dashboard dashboard = convertToEntity(dto);
        Dashboard saved = dashboardRepo.save(dashboard);
        return convertToDto(saved);
    }

    // Read All
    public List<DashboardDto> getAllDashboards() {
        return dashboardRepo.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Read by ID
    public DashboardDto getDashboardById(Long id) throws RuntimeException {
        Dashboard dashboard = dashboardRepo.findById(id)
                .orElseThrow(() -> new DashboardNotFoundException(id));
        return convertToDto(dashboard);
    }


    public Page<DashboardDto> searchDashboards(

            String name,
            String description,
            String base_url,
            String secretKey,
            LocalDateTime createdAfter,
            LocalDateTime createdBefore,
            LocalDateTime updatedAfter,
            LocalDateTime updatedBefore,
            int pageNumber,
            int pageSize,
            List<String> sort) {

        PaginationUtils.validatePagination(pageNumber,pageSize);

        Pageable pageable= PaginationUtils.createPageRequest(pageNumber,pageSize,sort);

        Page<Dashboard> dashboards= dashboardRepo.searchDashboards(name,description,base_url,secretKey,createdAfter,createdBefore,updatedAfter,updatedBefore,pageable);
        return dashboards.map(this::convertToDto);

    };
    // Update
    public DashboardDto updateDashboard(DashboardDto dto) throws RuntimeException{

        // the id is set By DashboardController

        Dashboard dashboard = dashboardRepo.findById(dto.getId())
                                           .orElseThrow(()-> new DashboardNotFoundException(dto.getId()));

        // checking if new dashboard name does exist

        if(dashboardRepo.existsByName(dto.getName()) && !dashboard.getName().equals(dto.getName())){
            throw new DashboardNameAlreadyExistException(dto.getName());
        }
        if(dto.getName()!=null){
            dashboard.setName(dto.getName());
        }
        if(dto.getDescription()!=null){
            dashboard.setDescription(dto.getDescription());
        }
        if(dto.getBase_url()!=null){
            dashboard.setBase_url(dto.getBase_url());
        }
        if(dto.getSecret_key()!=null){
            dashboard.setSecret_key(dto.getSecret_key());
        }




        Dashboard updated = dashboardRepo.save(dashboard);
        return convertToDto(updated);
    }

    // Delete
    @Transactional
    public void deleteDashboardById(Long id) throws RuntimeException {
        if (!dashboardRepo.existsById(id)) {
            throw new DashboardNotFoundException(id);
        }
//
//        Set<DashboardAccess> accesses = new HashSet<>(dashboardAccessRepo.findAllByDashboard_Id(id));
//        dashboardAccessRepo.deleteAll(accesses);
        dashboardRepo.deleteById(id);


    }
}
