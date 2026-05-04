// Função que inicializa o header
function initHeader() {
    // Pegando o user do localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    const menuProfiles = document.getElementById("menuProfiles");
    const clientProfile = document.getElementById("clientProfile");
    const adminProfile = document.getElementById("adminProfile");
    const sellerProfile = document.getElementById("sellerProfile");

    const navRegister = document.getElementById("navRegister");
    const navLogin = document.getElementById("navLogin");
    const btnLogout = document.getElementById("btnLogout");

    // Definindo quais botões aparecerão para cada tipo de usuário logado
    if (user) {
        navRegister.style.display = "none";
        navLogin.style.display = "none";
        menuProfiles.style.display = "block"; 

        if (user.is_admin) {
            adminProfile.style.display = "block";
            clientProfile.style.display = "none";
            sellerProfile.style.display = "none";
        } else {
            adminProfile.style.display = "none";
            clientProfile.style.display = "block";
            sellerProfile.style.display = "none";
        }

        // falta a verificação do SELLER

    } else {
        menuProfiles.style.display = "none"; 
    }

    // Se botão de sair existir
    if (btnLogout) {
        // Adiciona um evento de click no botão
        btnLogout.addEventListener("click", async function(e) {
            e.preventDefault(); // bloqueia o comportamento do <a> de recarregar página

            try {
                // Destruindo sessaõ e invalidando cookie/token pelo backend
                const response = await fetch("http://localhost:3000/auth/logout", {
                    method: "POST",
                    credentials: "include"
                });

                // Se o backend responder com sucesso
                if (response.ok) {
                    // Limpa também o frontend
                    localStorage.removeItem("user");  // usuário logado
                    localStorage.removeItem("token"); // cookie/token
                    window.location.href = "index.html";
                }
            } catch (error) {
                console.error("Erro ao deslogar:", error);
            }
        });
    }

    // Função para carregar as categorias da navbar
    async function loadCategories() {
        try {
            const response = await fetch("http://localhost:3000/category");
            const categories = await response.json();

            const container = document.getElementById("categoryList");
            container.innerHTML = "";

            categories.forEach(category => {
                const item = `
                    <li>
                        <a class="dropdown-item" href="category.html?id=${category.id}"> ${category.name} </a>
                    </li>
                `;

                container.innerHTML += item;
            });

        } catch (error) {
            console.error("Erro ao carregar as categorias:", error);
        }
    }

    // Chamando as funções assim que carrega a página
    loadCategories();
    loadCart();
}

// window = objeto global do navegador
// Com ele o HTML consegue acessar a função loadCart
window.loadCart = async function() {
    try {
        // Chamando o backend do carrinho
        const response = await fetch("http://localhost:3000/cart", {
            credentials: "include" // manda cookie de login
        });

        const items = await response.json();

        const container = document.querySelector(".offcanvas-body .d-flex"); // pega o '.d flex' dentro de '.offcanvas-body'
        container.innerHTML = "";

        // Se não for array ou o carrinho estiver vazio
        if (!Array.isArray(items) || items.length === 0) {
            container.innerHTML = `
                <p class="text-center">Carrinho está vazio!</p>
            `;
            return;
        }

        let subTotal = 0;

        // Para cada item do array de itens
        items.forEach(item => {
            subTotal += item.price * item.quantity; // calcula o subtotal

            // Adicionando o card do produto no carrinho
            // onchange: quando o usuário mudar o valor, já chama a função
            container.innerHTML += `
                <div class="card">
                    <div class="card-body">
                        <img src="http://localhost:3000${item.url}" style="width: 150px;">
                        <h5>${item.name}</h5>
                        <p>R$ ${item.price}</p>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" style="width: 60px;"/>
                        <button onclick="removeItem(${item.id})" type="button" class="btn btn-danger">Remover</button>
                    </div>
                </div>
            `;
        });

        // Adicionando o card do subtotal
        container.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h5>Subtotal</h5>
                    <p>R$ ${subTotal.toFixed(2)}</p>
                    <button onclick="checkout()" class="btn btn-primary">Finalizar Compra</button>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
    }
}

// Função que transforma o carrinho em pedido
window.checkout = async function() {
    try {
        // Checkout: cria pedido, cria itens e limpa carrinho
        const response = await fetch("http://localhost:3000/cart/checkout", {
            method: "POST",
            credentials: "include"
        });

        // Precisa estar logado para criar pedido
        if (response.status === 401) {
            window.location.href = "authenticationLogin.html";
            return;
        }

        const data = await response.json(); // converte os dados para json

        alert("Pedido criado com sucesso!");
        window.location.href = "payment.html?id=" + data.id;

    } catch (error) {
        console.error(error);
    }
}

// Atualiza a quantidade do item no carrinho
window.updateQuantity = async function(cart_id, quantity) {
    try {
        // Mandar atualizar a quantidade no backend
        await fetch(`http://localhost:3000/cart/${cart_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ quantity: Number(quantity) })
        });

        // Recarrega o carrinho
        loadCart();

    } catch (error) {
        console.error("Erro ao atualizar quantidade:", error);
    }
}

// Remove o item do carrinho
window.removeItem = async function(cart_id) {
    try {
        // Mandar apagar o item do carrinho no backend
        await fetch(`http://localhost:3000/cart/${cart_id}`, {
            method: "DELETE",
            credentials: "include"
        });

        // Recarrega o carrinho
        loadCart();

    } catch (error) {
        console.error("Erro ao remover item:", error);
    }
}