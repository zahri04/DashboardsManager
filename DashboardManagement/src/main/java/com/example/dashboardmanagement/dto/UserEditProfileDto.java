package com.example.dashboardmanagement.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserEditProfileDto {


    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String username;
    private String fullName;
    @JsonProperty(access= JsonProperty.Access.READ_ONLY)
    private List<String> groupNames = new ArrayList<>();

    // for password Updating
    private String password;
    private String confirmPassword;

    // the Setters will Not Be Generated to not enable updating of groupNames

    public void setFullName(String fullName){
        this.fullName = fullName;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setConfirmPassword(String confirmPassword){
        this.confirmPassword = confirmPassword;
    }

}
