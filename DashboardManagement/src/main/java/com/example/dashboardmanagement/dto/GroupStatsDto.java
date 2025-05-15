package com.example.dashboardmanagement.dto;


import lombok.Data;

@Data
public class GroupStatsDto {


    // for showing general infos about groups in dashboard Page



    private String name;
    private int usersCount;
    // 100%,50%  /100
    private float percentage;
}
