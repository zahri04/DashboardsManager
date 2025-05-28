package com.example.dashboardmanagement.service;


import com.example.dashboardmanagement.dto.DashboardDto;
import com.example.dashboardmanagement.dto.DashboardViewDto;
import com.example.dashboardmanagement.dto.MetabaseDto;
import com.example.dashboardmanagement.exception.UnauthorizedActionException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MetabaseService {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private DashboardViewService dashboardViewService;

    public MetabaseDto getDto(Long id) {

//        // checking if the id is accessible by the current user
//       if(!dashboardViewService.isAccessible(id)){
//           throw new UnauthorizedActionException("you have Not Authorization tof view this resource");
//       }
        // getting the dashboard details
        DashboardDto dashboardDto =dashboardService.getDashboardById(id);
        String base_url=dashboardDto.getBase_url();
        String secret_key=dashboardDto.getSecret_key();
        Long resourceValue=dashboardDto.getResourceValue();

        // key generating
        Key key = Keys.hmacShaKeyFor(secret_key.getBytes(StandardCharsets.UTF_8));
        // token
        String token=this.generateToken(resourceValue,key);



        // generating the iframeSrc

        String iframeSrc=base_url + "/embed/dashboard/" + token +
                "#bordered=true&titled=true";

        // setting the metabaseDto
        return new MetabaseDto(
                id,
                base_url,
                iframeSrc

        );
    }


    public String generateToken(Long resourceValue,Key key) {


        // 10 hours
        Long expirateMillis=6000000L;



        return Jwts.builder()
                .claim("resource",Map.of("dashboard",resourceValue))
                .claim("params",Map.of())
                .claim("exp",expirateMillis)
                .issuedAt(new Date(System.currentTimeMillis()))
                // 10 Hours
                .expiration(new Date(System.currentTimeMillis() + 60*60 *1000*10))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();



    }
}
