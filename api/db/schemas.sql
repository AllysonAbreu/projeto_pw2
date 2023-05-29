DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS registros_peso CASCADE;
DROP TABLE IF EXISTS midias CASCADE;

CREATE TABLE usuarios (
                          id SERIAL PRIMARY KEY,
                          nome VARCHAR(100) NOT NULL,
                          idade INTEGER NOT NULL,
                          email VARCHAR(100) NOT NULL,
                          senha VARCHAR(100) NOT NULL,
                          peso DECIMAL(5,2) NOT NULL,
                          peso_meta DECIMAL(5,2) NOT NULL,
                          altura DECIMAL(4,2) NOT NULL,
                          tempo_meta INTEGER NOT NULL,
                          is_ativo BOOLEAN NOT NULL DEFAULT TRUE,
                          criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          modificado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registros_peso (
                                id SERIAL PRIMARY KEY,
                                usuario_id INTEGER NOT NULL,
                                peso DECIMAL(5,2) NOT NULL,
                                data_registro DATE NOT NULL,
                                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                modificado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);

CREATE TABLE midias (
                        id SERIAL PRIMARY KEY,
                        usuario_id INTEGER NOT NULL,
                        nome_arquivo VARCHAR(100) NOT NULL,
                        tipo_midia VARCHAR(20) NOT NULL,
                        conteudo BYTEA NOT NULL,
                        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        modificado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);