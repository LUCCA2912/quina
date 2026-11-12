// Guarda o pedido no formato JSON para o sistema em C# importar
function guardarPedidoJson(pedido, carrinho) {
  var itens = [];
  for (var i = 0; i < carrinho.length; i++) {
    var produto = acharProduto(carrinho[i].id);
    itens.push({
      nomeProduto: produto.nome,
      preco: produto.preco,
      quant: carrinho[i].quantidade
    });
  }

  var lista = JSON.parse(localStorage.getItem('pedidosJson') || '[]');
  lista.push({
    id: pedido.numero,
    data_pedido: pedido.data,
    status: 'Pendente',
    itens: itens
  });
  localStorage.setItem('pedidosJson', JSON.stringify(lista));
  baixarJson();
}

// Baixa o arquivo pedidos.json
function baixarJson() {
  var texto = localStorage.getItem('pedidosJson') || '[]';
  var arquivo = new Blob([texto], { type: 'application/json' });
  var url = URL.createObjectURL(arquivo);
  var link = document.createElement('a');
  link.href = url;
  link.download = 'pedidos.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 1000);
}

