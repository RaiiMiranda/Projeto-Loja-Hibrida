-- -----------------------------------------------------------------------
-- Criação do Banco de Dados
-- Arquivo: musicStore.sql
-- -----------------------------------------------------------------------

CREATE DATABASE musicStore;

USE musicStore;

-- Tabela Usuário
CREATE TABLE user (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	type TINYINT(1) NOT NULL DEFAULT 1, -- 1 (cliente) 0 (admin)
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
    cpf VARCHAR(12) NOT NULL,
    phone VARCHAR(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabela Endereço
CREATE TABLE address (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type TINYINT(1) NOT NULL DEFAULT 1, -- 1 (cobrança) 0 (entrega)
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
    condition VARCHAR(100) NOT NULL,
	quantity INT NOT NULL,
    category ENUM('ARCOS', 'CORDAS', 'SOPRO', 'ÁUDIO', 'PERCUSSÃO', 'TECLAS') DEFAULT 'ARCOS' NOT NULL,
    description VARCHAR(200) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    available TINYINT(1) NOT NULL DEFAULT 1 -- 1 (em estoque) 0 (esgotado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabela Pedidos
CREATE TABLE orderClient (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
	channel ENUM('ONLINE', 'PRESENCIAL') DEFAULT 'ONLINE'
	status ENUM('PENDENTE', 'PAGO', 'ENVIADO') DEFAULT 'PENDENTE' NOT NULL,
	total_value DECIMAL(15,2) NOT NULL,
	user_id BIGINT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabela Item do Pedido
CREATE TABLE orderItem (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	quantity INT NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
	order_id BIGINT NOT NULL,
	product_id BIGINT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES orderClient(id),
	FOREIGN KEY (product_id) REFERENCES product(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabela Carrinho
CREATE TABLE cart (
	id BIGINT PRIMARY KEY AUTO_INCREMENT, 
	quantity INT NOT NULL,
	product_id BIGINT NOT NULL,
	user_id BIGINT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES product(id),
	FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabela Pagamento
CREATE TABLE payment (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	method VARCHAR(50) NOT NULL,
	status TINYINT(1) NOT NULL DEFAULT 1, -- 1 (pendente) 0 (pago)
	order_id BIGINT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES orderClient(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Tabela Avaliação
CREATE TABLE review (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	rating TINYINT(1) NOT NULL,
	comment VARCHAR(500) NOT NULL,
	user_id BIGINT NOT NULL,
	product_id BIGINT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user(id),
	FOREIGN KEY (product_id) REFERENCES product(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
