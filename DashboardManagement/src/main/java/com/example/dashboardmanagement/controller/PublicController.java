package com.example.dashboardmanagement.controller;

import com.example.dashboardmanagement.dto.PublicGroupDto;
import com.example.dashboardmanagement.service.PublicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/public")
public class PublicController {

    private final PublicService publicService;

    public PublicController(PublicService publicService) {
        this.publicService = publicService;
    }

    @GetMapping("groups")

    public ResponseEntity<List<PublicGroupDto>> getGroups() {
        List<PublicGroupDto> groups = publicService.getGroups();
        return ResponseEntity.ok(groups);

    }
}
