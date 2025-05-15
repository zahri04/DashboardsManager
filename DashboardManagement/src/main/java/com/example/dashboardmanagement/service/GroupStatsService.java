package com.example.dashboardmanagement.service;


import com.example.dashboardmanagement.dto.GroupStatsDto;
import com.example.dashboardmanagement.model.Group;
import com.example.dashboardmanagement.repository.GroupRepo;
import com.example.dashboardmanagement.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupStatsService {

    private final GroupRepo groupRepo;
    private final UserRepo userRepo;

    public GroupStatsService(GroupRepo groupRepo,UserRepo userRepo) {
        this.groupRepo = groupRepo;
        this.userRepo=userRepo;

    }

    public List<GroupStatsDto> getGroupsStats(){
        List<GroupStatsDto> groupStatsDtos = new ArrayList<>();
        List<Group> groups=groupRepo.findAll();
        // looping groups

        for(Group group:groups){
            GroupStatsDto groupStatsDto=new GroupStatsDto();
            // setting name
            groupStatsDto.setName(group.getName());
            // setting usersCount
            int UsersCount=group.getUsers().size();
            groupStatsDto.setUsersCount(UsersCount);

            // calculating percentage
              // getting number of all users

            Long AllUsersCount=userRepo.count();
            float percentage= ((float)UsersCount/AllUsersCount) *100;
            groupStatsDto.setPercentage(percentage);
            groupStatsDtos.add(groupStatsDto);
        }
        return  groupStatsDtos;

    }
}
