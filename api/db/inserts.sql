INSERT INTO usuarios (nome, idade, email, senha, peso, peso_meta, altura, tempo_meta, is_ativo, criado_em, modificado_em)
VALUES
    ('João', 30, 'joao@example.com', 'senha123', 80.5, 75.0, 1.75, 3, true, now(), now()),
    ('Maria', 25, 'maria@example.com', 'senha456', 65.2, 60.0, 1.60, 2, true, now(), now()),
    ('Pedro', 40, 'pedro@example.com', 'senha789', 90.0, 85.0, 1.80, 6, true, now(), now());

INSERT INTO registros_peso (usuario_id, peso, data_registro, criado_em, modificado_em)
VALUES
    (1, 80.0, '2023-01-01', now(), now()),
    (1, 79.5, '2023-01-15', now(), now()),
    (2, 65.5, '2023-01-01', now(), now()),
    (2, 65.0, '2023-01-15', now(), now()),
    (3, 90.5, '2023-01-01', now(), now()),
    (3, 90.0, '2023-01-15', now(), now());

INSERT INTO midias (usuario_id, nome_arquivo, tipo_midia, conteudo, criado_em, modificado_em)
VALUES
    (1, 'imagem1.jpg', 'imagem/jpeg', E'\\x89504e470d0a1a0a0000000d49484452000000', now(), now()),
    (1, 'imagem2.jpg', 'imagem/jpeg', E'\\x89504e470d0a1a0a0000000d49484452000000', now(), now()),
    (2, 'imagem3.jpg', 'imagem/jpeg', E'\\x89504e470d0a1a0a0000000d49484452000000', now(), now()),
    (2, 'video1.mp4', 'video/mp4', E'\\x00000014667479706d70343200000014677261706a70656700000010636f6d6d', now(), now()),
    (3, 'video2.mp4', 'video/mp4', E'\\x00000014667479706d70343200000014677261706a70656700000010636f6d6d', now(), now()),
    (3, 'video3.mp4', 'video/mp4', E'\\x00000014667479706d70343200000014677261706a70656700000010636f6d6d', now(), now());