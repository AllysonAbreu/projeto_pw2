package api.com.br.api.domain;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "registros_peso")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RegistroPeso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private BigDecimal peso;

    @Column(name = "data_registro")
    private LocalDate dataRegistro;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @Column(name = "modificado_em")
    private LocalDateTime modificadoEm;

}

