package com.example.dashboardmanagement.service;

import com.example.dashboardmanagement.dto.GroupDto;
import com.example.dashboardmanagement.dto.UserDto;
import com.example.dashboardmanagement.exception.AuthorityNotFoundException;
import com.example.dashboardmanagement.exception.GroupNameAlreadyExistException;
import com.example.dashboardmanagement.exception.GroupNotFoundException;
import com.example.dashboardmanagement.model.Authority;
import com.example.dashboardmanagement.model.Group;
import com.example.dashboardmanagement.model.User;
import com.example.dashboardmanagement.repository.AuthorityRepo;
import com.example.dashboardmanagement.repository.GroupRepo;
import com.example.dashboardmanagement.utils.PaginationUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;



@Service
public class GroupService {

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private AuthorityRepo authorityRepo;

    // Convert Entity to DTO
    public GroupDto convertToDto(Group group) {
        GroupDto groupDto = new GroupDto();
        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setDescription(group.getDescription());
        groupDto.setCreatedAt(group.getCreatedAt());
        groupDto.setUpdatedAt(group.getUpdatedAt());
        if(!group.getAuthorities().isEmpty()) {
            Set<Authority> safeAuthorites=new HashSet<>(group.getAuthorities());
            groupDto.setAuthoritesList(safeAuthorites.stream()
                    .map(Authority::getName)
                    .collect(Collectors.toList()));
        }
        return groupDto;
    }

    // Convert DTO to Entity
    public Group convertToEntity(GroupDto groupDto) throws RuntimeException {
        Group group = new Group();
        group.setName(groupDto.getName());
        group.setDescription(groupDto.getDescription());
        // Validate that all groups exists and that user is accompanied with its group(s)
        List<String> authoritesList=groupDto.getAuthoritesList();
        Set<Authority> authorities = authorityRepo.findAllByNameIn(authoritesList).stream().collect(Collectors.toSet());

        if( authoritesList.size() != authorities.size()) {
            throw new AuthorityNotFoundException("Some Authorities are Missing");
        }else{
            group.setAuthorities(authorities);
        }
        return group;
    }

    // Get all groups
    public List<GroupDto> getAllGroups() {
        return groupRepo.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
@Transactional
    // Get group by id
    public GroupDto getGroupById(Long id) {
        Group group = groupRepo.findById(id)
                .orElseThrow(() -> new GroupNotFoundException(id));
        return convertToDto(group);
    }

    public Page<GroupDto> searchGroups(

            String name,
            String description,
            LocalDateTime createdAfter,
            LocalDateTime createdBefore,
            LocalDateTime updatedAfter,
            LocalDateTime updatedBefore,
            String authority,
            int pageNumber,
            int pageSize,
            List<String> sort) {

        PaginationUtils.validatePagination(pageNumber,pageSize);

        Pageable pageable= PaginationUtils.createPageRequest(pageNumber,pageSize,sort);

   Page<Group> groups= groupRepo.searchGroups(name,description,createdAfter,createdBefore,updatedAfter,updatedBefore,authority,pageable);
        return groups.map(this::convertToDto);

    };


    @Transactional
    // Add new group
    public GroupDto addGroup(GroupDto groupDto) {
        if (groupRepo.existsByName(groupDto.getName())) {
            throw new GroupNameAlreadyExistException(groupDto.getName());
        }
        Group group = convertToEntity(groupDto);
        Group savedGroup = groupRepo.save(group);
        return convertToDto(savedGroup);
    }

    @Transactional
    // Update existing group
    public GroupDto updateGroup(GroupDto groupDto) {
        Group group = groupRepo.findById(groupDto.getId())
                .orElseThrow(() -> new GroupNotFoundException(groupDto.getId()));

        // checking if the group Name doesn't already exist in Db
        if (groupRepo.existsByName(groupDto.getName()) && !groupDto.getName().equals(group.getName())) {
            throw new GroupNameAlreadyExistException(groupDto.getName());
        }

        if(groupDto.getName()!=null) {
            group.setName(groupDto.getName());
        }
        if(groupDto.getDescription()!=null) {
            group.setDescription(groupDto.getDescription());
        }

        if(groupDto.getAuthoritesList()!=null) {
            Set<Authority> authorities = authorityRepo.findAllByNameIn(groupDto.getAuthoritesList())
                    .stream().collect(Collectors.toSet());
            group.setAuthorities(authorities);

        }




        Group updatedGroup = groupRepo.save(group);
        return convertToDto(updatedGroup);
    }

    // Delete group
    @Transactional
    public void deleteGroup(Long id) {
        if (!groupRepo.existsById(id)) {
            throw new GroupNotFoundException(id);
        }
        groupRepo.deleteById(id);
    }
}
