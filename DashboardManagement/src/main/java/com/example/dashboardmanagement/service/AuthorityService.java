package com.example.dashboardmanagement.service;

import com.example.dashboardmanagement.dto.AuthorityDto;
import com.example.dashboardmanagement.exception.AuthorityNameAlreadyExistException;
import com.example.dashboardmanagement.exception.AuthorityNotFoundException;
import com.example.dashboardmanagement.model.Authority;
import com.example.dashboardmanagement.model.Group;
import com.example.dashboardmanagement.repository.AuthorityRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorityService {



    @Autowired
    AuthorityRepo authorityRepo;


    // Convert Entity To Dto

    public AuthorityDto convertToDto(Authority authority) {

        AuthorityDto authorityDto = new AuthorityDto();
        authorityDto.setId(authority.getId());
        authorityDto.setName(authority.getName());
        authorityDto.setDescription(authority.getDescription());
        authorityDto.setCreated_at(authority.getCreatedAt());
        authorityDto.setUpdated_at(authority.getUpdatedAt());

        return authorityDto;

    }


    public Authority convertToEntity(AuthorityDto authorityDto) {
        Authority authority = new Authority();

        authority.setName(authorityDto.getName());
        authority.setDescription(authorityDto.getDescription());
        return authority;

    }


    // getting all Authorites

    @Transactional
    public List<AuthorityDto>  getAllAuthorities() {
        return
                authorityRepo.findAll()
                        .stream().map(this::convertToDto).collect(Collectors.toList());
    }

    // get An Authority record by id

    @Transactional
    public AuthorityDto getAuthorityById(Long id) throws RuntimeException {
        Authority authority=authorityRepo.findById(id)
                .orElseThrow(()-> new AuthorityNotFoundException(id));

        return convertToDto(authority);

    }


    // add an Authority

    @Transactional
    public AuthorityDto addAuthority(AuthorityDto authorityDto) throws RuntimeException {

        // checking if there is an existing Authority
        if(authorityRepo.existsByName(authorityDto.getName())){
            throw new AuthorityNameAlreadyExistException(authorityDto.getName());
        }

        Authority authority=convertToEntity(authorityDto);
        Authority saved=authorityRepo.save(authority);
        return convertToDto(saved);
    }

    // update an authority

    @Transactional
    public AuthorityDto updateAuthority(AuthorityDto authorityDto) throws RuntimeException {

        // the id is yet to be set by AuthorityController , receiving it in @PathVariable
        Authority authority=authorityRepo.findById(authorityDto.getId())
                .orElseThrow(()-> new  AuthorityNotFoundException(authorityDto.getId()));

        // checking if the updated Name Doesn't exist in Db and doesn't match the current name
        if(authorityRepo.existsByName(authority.getName()) && authorityDto.getName().compareTo(authority.getName()) !=0){

            throw new AuthorityNameAlreadyExistException(authorityDto.getName());
        }
        if(authorityDto.getName()!=null) {
            authority.setName(authorityDto.getName());
        }
        if(authorityDto.getDescription()!=null) {
            authority.setDescription(authorityDto.getDescription());
        }



        Authority saved=authorityRepo.save(authority);
        return convertToDto(saved);

    }

    // delete an authority

    @Transactional
    public void deleteAuthority(Long id) throws RuntimeException {


        Authority authority=authorityRepo.findById(id).orElseThrow(()-> new AuthorityNotFoundException(id));
        // deleting first the authority from all groups
        for(Group group:authority.getGroups()){
            group.getAuthorities().remove(authority);
        }
        authority.getGroups().clear();
        authorityRepo.save(authority);
        authorityRepo.deleteById(id);

    }
}
