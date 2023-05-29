package api.com.br.api.security.domain;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private static final long serialVersionUID = -8091879091924046844L;
    private String token;
}