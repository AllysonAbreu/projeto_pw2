package api.com.br.api.mappers;

import api.com.br.api.domain.enums.UserRoles;
import api.com.br.api.domain.user.User;
import api.com.br.api.domain.user.request.RegisterRequest;
import api.com.br.api.domain.user.response.LoginResponse;

import java.sql.Timestamp;

public class UsersMapper {
    public static User toDomain(RegisterRequest request, String encryptedPassword) {
        return User.builder()
                .name(request.name())
                .age(request.age())
                .weight(request.weight())
                .goal(request.goal())
                .height(request.height())
                .reachGoal(request.reachGoal())
                .email(request.email())
                .password(encryptedPassword)
                .role(UserRoles.valueOf("USER"))
                .isActive(true)
                .createdAt(Timestamp.from(java.time.Instant.now()))
                .build();
    }

    public static LoginResponse toResponse(String token) {
        return LoginResponse.builder()
                .token(token)
                .build();
    }
}
