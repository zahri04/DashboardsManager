package com.example.dashboardmanagement.service;

import com.example.dashboardmanagement.model.User;
import com.example.dashboardmanagement.model.UserPrincipal;
import com.example.dashboardmanagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetailsService implements UserDetailsService {


    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));

        if(user==null){

            throw new UsernameNotFoundException(username);
        }
        return new UserPrincipal(user);

    }

}
