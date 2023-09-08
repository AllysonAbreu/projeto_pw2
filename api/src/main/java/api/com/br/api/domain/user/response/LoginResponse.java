package api.com.br.api.domain.user.response;

import lombok.Builder;

@Builder
public record LoginResponse(String token) {
}
