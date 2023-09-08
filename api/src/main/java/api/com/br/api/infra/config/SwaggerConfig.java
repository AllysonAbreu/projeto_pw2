package api.com.br.api.infra.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI swaggerConfigApi() {
        return new OpenAPI()
                .info( new Info(). title("Swagger Documentation")
                        .description("Swagger Documentation")
                        .version("1.0.0"));
    }
}
