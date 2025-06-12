function mostrarSecao(secaoId) {
    const secoes = document.querySelectorAll('.secao');
    secoes.forEach(secao => {
        secao.style.display = 'none';
    });

    const secaoSelecionada = document.getElementById(secaoId);
    if (secaoSelecionada) {
        secaoSelecionada.style.display = 'block';
    } else {
        console.error('Seção não encontrada:', secaoId);
    }
}

window.mostrarSecao = mostrarSecao; // Torna a função acessível no HTML

// Adicionar produto ao carrinho
document.addEventListener("DOMContentLoaded", () => {
  const botoesAdicionar = document.querySelectorAll(".btn-add-carrinho");

  botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
      const nome = botao.getAttribute("data-nome");
      const preco = parseFloat(botao.getAttribute("data-preco"));

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      const itemExistente = carrinho.find(item => item.nome === nome);

      if(itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        carrinho.push({ nome, preco, quantidade: 1 });
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert(`${nome} foi adicionado ao carrinho!`);
    });
  });

  // Exibir carrinho na página carrinho.html
  if (window.location.pathname.includes("carrinho.html")) {
    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalCarrinho = document.getElementById("total-carrinho");

    function atualizarCarrinho() {
      listaCarrinho.innerHTML = "";
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      let total = 0;

      if (carrinho.length === 0) {
        listaCarrinho.innerHTML = "<p>O carrinho está vazio!</p>";
        totalCarrinho.textContent = "Total: R$ 0,00";
        return;
      }

      carrinho.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-carrinho");
        itemDiv.innerHTML = `
          <p>${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>
          <p>Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
          <button class="remover-item" data-index="${index}">Remover</button>
        `;
        listaCarrinho.appendChild(itemDiv);
        total += item.preco * item.quantidade;
      });

      totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;

      // Botão Remover funcionando
      const botoesRemover = document.querySelectorAll(".remover-item");
      botoesRemover.forEach(botao => {
        botao.addEventListener("click", () => {
          const index = botao.getAttribute("data-index");
          carrinho.splice(index, 1);
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          atualizarCarrinho();
        });
      });
    }

    atualizarCarrinho();
  }
});
