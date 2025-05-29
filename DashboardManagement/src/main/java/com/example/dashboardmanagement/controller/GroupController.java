package com.example.dashboardmanagement.controller;

import com.example.dashboardmanagement.dto.GroupDto;
import com.example.dashboardmanagement.dto.GroupStatsDto;
import com.example.dashboardmanagement.dto.UserDto;
import com.example.dashboardmanagement.service.GroupService;
import com.example.dashboardmanagement.service.GroupStatsService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
@PreAuthorize("hasAnyAuthority('PERM_GROUP_MANAGEMENT','PERM_DASHBOARD_MANAGEMENT')")
@Validated
@RestController

@RequestMapping("/api/groups")

public class GroupController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupStatsService groupStatsService;

    // Get all groups
    @GetMapping("all")
    public List<GroupDto> getAllGroups() {
        return groupService.getAllGroups();
    }

    // Get a group by id
    @GetMapping("/{id}")
    public GroupDto getGroupById(@PathVariable Long id) {
        return groupService.getGroupById(id);
    }

    // Add a new group

    @PostMapping
    public GroupDto addGroup(@Valid @RequestBody GroupDto groupDto, BindingResult result) {
        if(result.hasErrors()) {
            throw new ValidationException(result.getAllErrors().get(0).getDefaultMessage());
        }
        return groupService.addGroup(groupDto);
    }


    // getting Groups Stats
    @GetMapping("stats")

    public List<GroupStatsDto> getStats() {
       return groupStatsService.getGroupsStats();
    }


    @GetMapping()

    public Page<GroupDto> searchGroups(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String authority,
            @RequestParam(required = false) LocalDateTime createdAfter,
            @RequestParam(required = false) LocalDateTime createdBefore,
            @RequestParam(required = false) LocalDateTime updatedAfter,
            @RequestParam(required = false) LocalDateTime updatedBefore,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(name="sort",required = false) List<String> sort



    ){

        Page<GroupDto> groups= groupService.searchGroups(name,description,createdAfter,createdBefore,updatedAfter,updatedBefore,authority,pageNumber,pageSize,
                sort ==null ? List.of("name,asc"):sort
        );



        return groups;

    }


    // Update a group
    @PutMapping("/{id}")
    public GroupDto updateGroup(@PathVariable Long id, @RequestBody GroupDto groupDto) {
        groupDto.setId(id);
        return groupService.updateGroup(groupDto);
    }

    // Delete a group
    @DeleteMapping("/{id}")
    public void deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
    }
}
