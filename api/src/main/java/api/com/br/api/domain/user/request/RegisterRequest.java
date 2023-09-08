package api.com.br.api.domain.user.request;

import java.math.BigDecimal;

public record RegisterRequest(String email, String password, String name, Integer age, BigDecimal weight, BigDecimal goal, BigDecimal height, Integer reachGoal ) {

}
