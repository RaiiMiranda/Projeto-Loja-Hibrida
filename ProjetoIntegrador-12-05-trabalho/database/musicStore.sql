-- -----------------------------------------------------------------------
-- PostgreSQL - Criação do Banco de Dados
-- Loja de Instrumentos Musicais
-- Arquivo: musicStore.sql
-- -----------------------------------------------------------------------

CREATE DATABASE musicStore;



-- preciso recriar o banco, ta desatualizado
-- isAdmin vai ter que virar um ENUM


-- -----------------------------------------------------------------------
-- Criação dos ENUMs
-- -----------------------------------------------------------------------

-- ENUM Condição do Produto
CREATE TYPE product_condition AS ENUM ('NOVO', 'USADO', 'SEMINOVO');

-- ENUM Status do Pedido
CREATE TYPE order_status AS ENUM (
	'PENDENTE',
	'PAGO',
	'SEPARANDO',
	'ENVIADO',
	'ENTREGUE',
	'CANCELADO',
	'EXTRAVIADO',
	'DEVOLVIDO'
);

-- ENUM Status do Pagamento
CREATE TYPE payment_status AS ENUM ('PENDENTE', 'PAGO', 'RECUSADO');

-- ENUM Status da Desesa
CREATE TYPE expenses_status AS ENUM ('PENDENTE', 'PAGO', 'ATRASADO');

-- -----------------------------------------------------------------------
-- Criação das Tabelas
-- -----------------------------------------------------------------------

-- Tabela Usuário
CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	is_admin BOOLEAN DEFAULT FALSE NOT NULL, -- 0 (cliente)  1 (admin)
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	active BOOLEAN DEFAULT TRUE NOT NULL,
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
    cep VARCHAR(9) NOT NULL,
	neighborhood VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    number VARCHAR(10) NOT NULL,
    complement VARCHAR(100),
    observations VARCHAR(150),
    user_id BIGINT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabela Categoria
CREATE TABLE category (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL
	-- vai ter subcategorias
);

-- Tabela Produto
CREATE TABLE product (
	id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	brand VARCHAR(100) NOT NULL,
    condition product_condition NOT NULL,
	state VARCHAR(50),
	state_message TEXT,
    description TEXT NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    available BOOLEAN DEFAULT TRUE NOT NULL,
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
    product_id BIGINT UNIQUE NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    reserved INT NOT NULL DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Tabela Despesas
CREATE TABLE expenses (
    id BIGSERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    category TEXT,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE, -- data de vencimento
    status expenses_status DEFAULT 'PENDENTE' NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela Pedidos
CREATE TABLE order_client (
	id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	status order_status DEFAULT 'PENDENTE' NOT NULL,
	total_value DECIMAL(15,2) NOT NULL,
	user_id BIGINT NOT NULL,
	address_id BIGINT,
	tracking_code VARCHAR(50), -- código de rastreio
	invoice_url VARCHAR(300),  -- link para nota fiscal
	shipped_at TIMESTAMP,      -- quando foi enviado
    delivered_at TIMESTAMP,    -- quando foi entregue
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (address_id) REFERENCES address(id)
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

/* Tabela Histórico do Pedido
CREATE TABLE order_history (
    id BIGSERIAL PRIMARY KEY,
    old_status order_status,
    new_status order_status,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	order_id BIGINT REFERENCES order_client(id),
    changed_by BIGINT REFERENCES users(id)
); */

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
	status payment_status DEFAULT 'PENDENTE' NOT NULL,
	order_id BIGINT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES order_client(id)
);

-- Tabela Avaliação
CREATE TABLE review (
	id BIGSERIAL PRIMARY KEY,
	rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	comment VARCHAR(500) NOT NULL,
	user_id BIGINT NOT NULL,
	product_id BIGINT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (product_id) REFERENCES product(id),
    UNIQUE(user_id, product_id)
);