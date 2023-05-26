package api.com.br.api.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "midias")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Midia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "nome_arquivo")
    private String nomeArquivo;

    @Column(name = "tipo_midia")
    private String tipoMidia;

    private byte[] conteudo;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @Column(name = "modificado_em")
    private LocalDateTime modificadoEm;

}
