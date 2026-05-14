package com.Ecomproject.contoller;

import com.Ecomproject.exception.DuplicateResourceException;
import com.Ecomproject.model.AppUser;
import com.Ecomproject.model.Role;
import com.Ecomproject.repo.UserRepo;
import com.Ecomproject.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    /* ─── Register ──────────────────────────────────────────────────── */

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepo.existsByUsername(request.username())) {
            throw new DuplicateResourceException("Username already exists");
        }

        // New registrations are always CUSTOMER; admin is only seeded
        AppUser user = new AppUser();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(Role.CUSTOMER);

        userRepo.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "User registered successfully"));
    }

    /* ─── Login ─────────────────────────────────────────────────────── */

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);
        String role = userDetails.getAuthorities().iterator().next().getAuthority(); // e.g. ROLE_ADMIN

        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", role,
                "username", userDetails.getUsername()
        ));
    }

    /* ─── DTOs ──────────────────────────────────────────────────────── */

    public record LoginRequest(String username, String password) {}
    public record RegisterRequest(String username, String password) {}
}
