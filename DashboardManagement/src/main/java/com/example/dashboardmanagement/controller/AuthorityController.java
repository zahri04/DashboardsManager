package com.example.dashboardmanagement.controller;

import com.example.dashboardmanagement.dto.AuthorityDto;
import com.example.dashboardmanagement.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authorities")
public class AuthorityController {


    private AuthorityService authorityService;

    @Autowired
    public AuthorityController(AuthorityService authorityService) {
        this.authorityService = authorityService;

    }

    // Get all authorities
    @GetMapping
    public List<AuthorityDto> getAllAuthorities() {
        return authorityService.getAllAuthorities();
    }

    // Get authority by ID
    @GetMapping("/{id}")
    public AuthorityDto getAuthorityById(@PathVariable Long id) {
        return authorityService.getAuthorityById(id);
    }

    // Add new authority
    @PostMapping
    public AuthorityDto addAuthority(@RequestBody AuthorityDto authorityDto) {
        return authorityService.addAuthority(authorityDto);
    }

    // Update authority
    @PutMapping("/{id}")
    public AuthorityDto updateAuthority(@PathVariable Long id, @RequestBody AuthorityDto authorityDto) {
        authorityDto.setId(id); // Inject id from path variable into DTO
        return authorityService.updateAuthority(authorityDto);
    }

    // Delete authority
    @DeleteMapping("/{id}")
    public void deleteAuthority(@PathVariable Long id) {
        authorityService.deleteAuthority(id);
    }
}
