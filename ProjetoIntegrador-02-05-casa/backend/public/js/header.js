function initHeader() {

    const user = JSON.parse(localStorage.getItem("user"));

    const menuProfiles = document.getElementById("menuProfiles");
    const clientProfile = document.getElementById("clientProfile");
    const adminProfile = document.getElementById("adminProfile");
    const sellerProfile = document.getElementById("sellerProfile");
    const navRegister = document.getElementById("navRegister");
    const navLogin = document.getElementById("navLogin");
    const btnLogout = document.getElementById("btnLogout");

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

    if (btnLogout) {
        btnLogout.addEventListener("click", async function(e) {
            e.preventDefault();

            try {
                const response = await fetch("http://localhost:3000/auth/logout", {
                    method: "POST",
                    credentials: "include"
                });

                if (response.ok) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    window.location.href = "index.html";
                }
            } catch (error) {
                console.error("Erro ao deslogar:", error);
            }
        });
    }

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

    loadCategories();
    loadCart();
}

window.loadCart = async function() {
    try {
        const res = await fetch("http://localhost:3000/cart", {
            credentials: "include"
        });

        const items = await res.json();

        if (!Array.isArray(items)) {
            return;
        }

        const container = document.querySelector(".offcanvas-body .d-flex");
        container.innerHTML = "";

        let total = 0;

        items.forEach(item => {
            total += item.price * item.quantity;

            container.innerHTML += `
                <div class="card">
                    <div class="card-body">
                        <img src="http://localhost:3000${item.url}" style="width: 150px;">
                        <h5>${item.name}</h5>
                        <p>R$ ${item.price}</p>
                        <p>Qtd: ${item.quantity}</p>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Erro no loadCart:", error);
    }
}

window.checkout = async function() {
    try {
        const res = await fetch("http://localhost:3000/cart/checkout", {
            method: "POST",
            credentials: "include"
        });

        if (res.status === 401) {
            window.location.href = "authenticationLogin.html";
            return;
        }

        const data = await res.json();

        alert("Pedido criado com sucesso!");
        window.location.href = "payment.html?id=" + data.id;

    } catch (error) {
        console.error(error);
    }
}