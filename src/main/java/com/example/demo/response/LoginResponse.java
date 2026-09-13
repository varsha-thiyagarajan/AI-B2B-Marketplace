package com.example.demo.response;
import com.example.demo.entity.Role;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private String token;
}
