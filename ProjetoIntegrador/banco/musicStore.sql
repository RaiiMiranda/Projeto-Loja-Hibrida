-- -----------------------------------------------------------------------
-- PostgreSQL - Criação do Banco de Dados
-- Loja de Instrumentos Musicais
-- Arquivo: musicStore.sql
-- -----------------------------------------------------------------------

CREATE DATABASE musicStore;

-- -----------------------------------------------------------------------
-- Criação dos ENUMs
-- -----------------------------------------------------------------------

-- ENUM Condição do Produto
CREATE TYPE product_condition AS ENUM ('NOVO', 'USADO');

-- ENUM Canal do Pedido
CREATE TYPE order_channel AS ENUM ('ONLINE', 'PRESENCIAL');

-- ENUM Status do Pedido
CREATE TYPE order_status AS ENUM (
	'PENDENTE',
	'PAGO',
	'SEPARANDO',
	'ENVIADO',
	'ENTREGUE',
	'CANCELADO'
);

CREATE TYPE payment_status AS ENUM ('PENDENTE', 'PAGO', 'RECUSADO');

-- -----------------------------------------------------------------------
-- Criação das Tabelas
-- -----------------------------------------------------------------------

-- Tabela Usuário
CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	type BOOLEAN DEFAULT FALSE NOT NULL, -- 0 (cliente)  1 (admin)
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL
);

-- Tabela Endereço
CREATE TABLE address (
	id BIGSERIAL PRIMARY KEY,
    type BOOLEAN DEFAULT FALSE NOT NULL, -- 0 (cobrança) 1 (entrega)
    country VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    street VARCHAR(100) NOT NULL,
    number VARCHAR(10) NOT NULL,
    complement VARCHAR(100),
    observations VARCHAR(150),
    user_id BIGINT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela Categoria
-- ('ARCOS', 'CORDAS', 'SOPRO', 'ÁUDIO', 'PERCUSSÃO', 'TECLAS')
CREATE TABLE category (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL
);

-- Tabela Produto
CREATE TABLE product (
	id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	brand VARCHAR(100) NOT NULL,
    condition product_condition NOT NULL,
    description VARCHAR(200) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    available BOOLEAN DEFAULT TRUE NOT NULL, -- 1 (em estoque) 0 (esgotado)
	category_id BIGINT NOT NULL,
	FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Tabela Imagem do Produto
CREATE TABLE product_image (
	id BIGSERIAL PRIMARY KEY,
	url VARCHAR(300) NOT NULL,
	product_id BIGINT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Tabela Estoque
CREATE TABLE inventory (
    id BIGSERIAL PRIMARY KEY,
    store_stock INT NOT NULL,
    online_stock INT NOT NULL,
	product_id BIGINT UNIQUE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Tabela Pedidos
CREATE TABLE order_client (
	id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	channel order_channel DEFAULT 'ONLINE' NOT NULL,
	status order_status DEFAULT 'PENDENTE' NOT NULL,
	total_value DECIMAL(15,2) NOT NULL,
	user_id BIGINT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela Item do Pedido
CREATE TABLE order_item (
	id BIGSERIAL PRIMARY KEY,
	quantity INT NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
	order_id BIGINT NOT NULL,
	product_id BIGINT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES order_client(id),
	FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Tabela Carrinho
CREATE TABLE cart (
	id BIGSERIAL PRIMARY KEY, 
	quantity INT NOT NULL,
	product_id BIGINT NOT NULL,
	user_id BIGINT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES product(id),
	FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(user_id, product_id)
);

-- Tabela Pagamento
CREATE TABLE payment (
	id BIGSERIAL PRIMARY KEY,
	method VARCHAR(50) NOT NULL,
	status payment_status 'PENDENTE' NOT NULL,
	order_id BIGINT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES order_client(id)
);

-- Tabela Avaliação
CREATE TABLE review (
	id BIGSERIAL PRIMARY KEY,
	rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
	comment VARCHAR(500) NOT NULL,
	user_id BIGINT NOT NULL,
	product_id BIGINT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (product_id) REFERENCES product(id),
    UNIQUE(user_id, product_id)
);
