DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS weight_register CASCADE;
DROP TABLE IF EXISTS midias CASCADE;

CREATE TABLE users (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          age INTEGER NOT NULL,
                          email VARCHAR(100) NOT NULL,
                          password VARCHAR(100) NOT NULL,
                          weight DECIMAL(5,2) NOT NULL,
                          goal DECIMAL(5,2) NOT NULL,
                          height DECIMAL(4,2) NOT NULL,
                          reach_goal INTEGER NOT NULL,
                          role VARCHAR(20) NOT NULL,
                          is_active BOOLEAN NOT NULL DEFAULT TRUE,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weight_register (
                        id SERIAL PRIMARY KEY,
                        user_id INTEGER NOT NULL,
                        weight DECIMAL(5,2) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        FOREIGN KEY (usuario_id) REFERENCES users (id)
);

