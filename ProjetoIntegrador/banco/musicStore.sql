-- -----------------------------------------------------------------------
-- Criação do Banco de Dados
-- Arquivo: musicStore.sql
-- -----------------------------------------------------------------------

CREATE DATABASE musicStore;

USE musicStroe;

-- Tabela Administrador
CREATE TABLE admin (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
    phone VARCHAR(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabela Usuário
CREATE TABLE user (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
    cpf VARCHAR(12) NOT NULL,
    phone VARCHAR(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabela Endereço
CREATE TABLE address (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type TINYINT(1) NOT NULL DEFAULT 1 -- 1 (cobrança) 0 (entrega)
    country VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    street VARCHAR(100) NOT NULL,
    number VARCHAR(10) NOT NULL,
    complement VARCHAR(100),
    observations VARCHAR(150),
    user_id BIGINT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabela Produto
CREATE TABLE product (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    durability VARCHAR(100) NOT NULL,
    category VARCHAR(20) NOT NULL,
    description VARCHAR(200) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    available TINYINT(1) NOT NULL DEFAULT 1 -- 1 (em estoque) 0 (esgotado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabela Pedidos
CREATE TABLE orderProduct (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    date DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;








