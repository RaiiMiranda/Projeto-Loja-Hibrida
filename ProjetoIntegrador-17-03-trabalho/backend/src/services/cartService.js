// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: cartService.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

/*

CREATE TABLE cart (
	id BIGSERIAL PRIMARY KEY, 
	quantity INT NOT NULL,
	product_id BIGINT NOT NULL,
	user_id BIGINT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES product(id),
	FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(user_id, product_id)
);

um cliente pode adicionar vários produtos
não gera reserva de estoque
cada produto tem quantidade
o carrinho pertence a um único cliente
ao finalizar a compra:
	gera um pedido
	itens do carrinho viram order_item
	pode ser limpo

se produto ja existe no carrinho
entao soma + 1 e atualiza o preço total

se produto nao existe
cria um novo item nela

add    -> adiciona novo item, se nao estiver já no carrinho (se ja estiver incrementa a quantidade dele)
remove -> remove um item existente do carrinho

*/