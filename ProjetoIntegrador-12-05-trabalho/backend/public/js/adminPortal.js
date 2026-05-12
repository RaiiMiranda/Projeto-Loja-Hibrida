function initListGroup() {

    // Pegando o user do localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    
    const menuLinks = document.querySelectorAll(".list-group a"); // pegando todos os links do menu
    const currentPage = window.location.pathname.split("/").pop(); // split (divide a url em partes separadas pela '/'), pop (pega o último item: adminProducts.html, por ex.)

    // Percorrendo todos os links
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute("href"); // pegando o href do link

        // Se for a página atual
        if (linkPage === currentPage) {
            link.classList.add("active"); // deixando class active
            link.setAttribute("aria-current", "true"); // bootstrap acessibilidade
        }
    });

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

}