package api.com.br.api.controllers;

import api.com.br.api.domain.user.request.LoginRequest;
import api.com.br.api.domain.user.request.RegisterRequest;
import api.com.br.api.domain.user.response.LoginResponse;
import api.com.br.api.services.users.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Operation(summary = "Login", description = "Login", tags = {"auth"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponse.class))) })
    @RequestMapping(value = "/login",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.POST)
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @Operation(summary = "Register", description = "Register", tags = {"auth"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(mediaType = "aplication/json", schema = @Schema(implementation = ResponseEntity.class))) })
    @RequestMapping(value = "/register",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.POST)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        authService.register(registerRequest);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Logout", description = "Logout", tags = {"auth"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(mediaType = "aplication/json", schema = @Schema(implementation = ResponseEntity.class))) })
    @RequestMapping(value = "/logout",
            produces = {"application/json"},
            consumes = {"application/json"},
            method = RequestMethod.GET)
    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok().build();
    }

}
