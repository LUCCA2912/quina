function pegarCarrinho() {
  var texto = localStorage.getItem('carrinho');
  if (texto) {
    return JSON.parse(texto);
  }
  return [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarContador();
}

function adicionarAoCarrinho(id, quantidade) {
  var carrinho = pegarCarrinho();
  var achou = false;

  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id == id) {
      carrinho[i].quantidade = carrinho[i].quantidade + quantidade;
      achou = true;
    }
  }

  if (achou == false) {
    carrinho.push({ id: Number(id), quantidade: quantidade });
  }

  salvarCarrinho(carrinho);
}

function totalDeItens() {
  var carrinho = pegarCarrinho();
  var soma = 0;
  for (var i = 0; i < carrinho.length; i++) {
    soma = soma + carrinho[i].quantidade;
  }
  return soma;
}

function totalDoCarrinho() {
  var carrinho = pegarCarrinho();
  var soma = 0;
  for (var i = 0; i < carrinho.length; i++) {
    soma = soma + acharProduto(carrinho[i].id).preco * carrinho[i].quantidade;
  }
  return soma;
}

function atualizarContador() {
  var contador = document.getElementById('contadorCarrinho');
  if (contador) {
    contador.textContent = totalDeItens();
  }
  if (paginaAtual == 'cardapio') {
    atualizarBarraCarrinho();
  }
}

function pegarPedidos() {
  var texto = localStorage.getItem('pedidos');
  if (texto) {
    return JSON.parse(texto);
  }
  return [
    { numero: 2031, data: '16/10/2026 20:08', etapa: 3, itens: '1 Quina Duplo, 1 Batata da casa, 1 Refri em lata', total: 62 },
    { numero: 1986, data: '10/10/2026 19:35', etapa: 3, itens: '1 Verde sem Pose, 1 Milk-shake de paçoca', total: 62 }
  ];
}

