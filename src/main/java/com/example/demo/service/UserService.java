package com.example.demo.service;
import com.example.demo.request.LoginRequest;
import com.example.demo.response.LoginResponse;
import com.example.demo.response.UserResponse;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.DuplicateEmailException;
import com.example.demo.repository.UserRepository;
import com.example.demo.request.RegisterRequest;
import com.example.demo.response.UserResponse;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository, JwtService jwtService)
    {
        this.passwordEncoder = passwordEncoder;
        this.userRepository=userRepository;
        this.jwtService = jwtService;
    }

    public UserResponse registerUser(RegisterRequest request)
    {
        if(userRepository.findByEmail(request.getEmail()).isPresent())
        {
            throw new DuplicateEmailException("Email already exists");
        }

        User user=new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.BUYER);

        User savedUser = userRepository.save(user);
        return UserResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .createdAt(savedUser.getCreatedAt())
                .updatedAt(savedUser.getUpdatedAt())
                .build();
    }

    public LoginResponse loginUser(LoginRequest request)
    {
        User user=userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new RuntimeException(("Invalid email or password")));
        if(!passwordEncoder.matches(request.getPassword(),user.getPassword()))
        {
            throw new RuntimeException("Invalid email or password");
        }
        String token = jwtService.generateToken(user);
        return LoginResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .token(token)
                .build();

    }


}
