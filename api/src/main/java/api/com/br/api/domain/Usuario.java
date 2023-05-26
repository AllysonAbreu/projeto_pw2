package api.com.br.api.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "usuarios")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private Integer idade;

    private String email;

    private String senha;

    private Double peso;

    @Column(name = "peso_meta")
    private Double pesoMeta;

    private Double altura;

    @Column(name = "tempo_meta")
    private Integer tempoMeta;

    @Column(name = "is_ativo")
    private Boolean isAtivo;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @Column(name = "modificado_em")
    private LocalDateTime modificadoEm;
}

