package com.example.dashboardmanagement.service;

import com.example.dashboardmanagement.dto.PublicGroupDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PublicService {

    private final GroupService groupService;

    public PublicService(GroupService groupService) {
        this.groupService = groupService;

    }

    public List<PublicGroupDto> getGroups() {
        return groupService.getAllGroups().stream().
                map(group->new PublicGroupDto(group.getName()))
                .collect(Collectors.toList());
    }
}
