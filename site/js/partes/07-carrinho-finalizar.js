var tipoEntrega = 'entrega';
var cupomAtivo = false;
var formaPagamento = 'Pix';

function mostrarCarrinho() {
  var carrinho = pegarCarrinho();
  var conteudo = document.getElementById('conteudoCarrinho');

  if (carrinho.length == 0) {
    conteudo.innerHTML =
      '<div class="vazio"><h2>Sua sacola está vazia</h2>' +
      '<p>Escolha um burger e deixe a chapa com a gente.</p>' +
      '<a class="botao" href="#cardapio">Ver cardápio</a></div>';
    document.getElementById('subtitulo').textContent = 'Sua sacola';
    return;
  }

  var somaProdutos = totalDoCarrinho();
  var desconto = 0;
  if (cupomAtivo == true) {
    desconto = somaProdutos * 0.10;
  }
  var frete = 0;
  if (tipoEntrega == 'entrega') {
    frete = 6;
  }
  var totalFinal = somaProdutos - desconto + frete;

  var itens = '';
  for (var i = 0; i < carrinho.length; i++) {
    var item = carrinho[i];
    var p = acharProduto(item.id);
    itens += '<div class="item-carrinho">';
    itens += '  <img src="' + p.imagem + '" alt="' + p.nome + '">';
    itens += '  <div><b>' + p.nome + '</b><br><small class="suave">' + dinheiro(p.preco) + ' / un.</small><br>';
    itens += '    <button class="remover" onclick="removerItem(' + p.id + ')">Remover</button></div>';
    itens += '  <div class="quantidade">';
    itens += '    <button onclick="mudarQuantidade(' + p.id + ', -1)" aria-label="Diminuir">−</button>';
    itens += '    <span>' + item.quantidade + '</span>';
    itens += '    <button onclick="mudarQuantidade(' + p.id + ', 1)" aria-label="Aumentar">+</button>';
    itens += '  </div>';
    itens += '  <b>' + dinheiro(p.preco * item.quantidade) + '</b>';
    itens += '</div>';
  }

  var textoEndereco = 'Retire no balcão: Rua Mateus Grou, 218.';
  if (tipoEntrega == 'entrega') {
    if (usuario.rua) {
      textoEndereco = 'Casa · ' + usuario.nome + '<br>' + usuario.rua + ', ' + (usuario.numero || '') + ' · ' + (usuario.bairro || '');
    } else {
      textoEndereco = 'Cadastre seu endereço em <a href="#perfil"><b>Meu perfil</b></a>.';
    }
  }

  var classeEntrega = 'chip';
  var classeRetirada = 'chip';
  var nomeFrete = 'Retirada';
  if (tipoEntrega == 'entrega') {
    classeEntrega = 'chip ativo';
    nomeFrete = 'Entrega';
  } else {
    classeRetirada = 'chip ativo';
  }

  var html = '';
  html += '<div class="carrinho-layout">';
  html += '  <div>' + itens + '<p style="margin-top:1rem"><a href="#cardapio"><b>+ Adicionar mais delícias</b></a></p></div>';
  html += '  <aside class="resumo painel">';
  html += '    <h3>Resumo do pedido</h3>';
  html += '    <div class="chips" style="margin:1rem 0">';
  html += '      <button class="' + classeEntrega + '" onclick="escolherEntrega(\'entrega\')">Entrega · 35–45 min</button>';
  html += '      <button class="' + classeRetirada + '" onclick="escolherEntrega(\'retirada\')">Retirada · 20–30 min</button>';
  html += '    </div>';
  html += '    <p class="suave" style="font-size:.88rem">' + textoEndereco + '</p>';
  html += '    <div class="linha"><span>Produtos</span><span>' + dinheiro(somaProdutos) + '</span></div>';
  html += '    <div class="linha"><span>' + nomeFrete + '</span><span>' + dinheiro(frete) + '</span></div>';
  html += '    <div class="linha"><span>Desconto</span><span>− ' + dinheiro(desconto) + '</span></div>';
  html += '    <hr>';
  html += '    <div class="linha"><b>Total</b><span class="total">' + dinheiro(totalFinal) + '</span></div>';
  html += '    <label style="margin-top:1rem">Pagamento';
  html += '      <select id="pagamento" onchange="formaPagamento = this.value">';
  html += '        <option>Pix</option><option>Cartão de crédito</option><option>Cartão de débito</option>';
  html += '      </select>';
  html += '    </label>';
  html += '    <div class="linha" style="margin-bottom:1rem">';
  html += '      <input id="campoCupom" maxlength="12" placeholder="Cupom (teste: QUINA10)" aria-label="Cupom">';
  html += '      <button class="botao botao-contorno botao-pequeno" onclick="aplicarCupom()">Aplicar</button>';
  html += '    </div>';
  html += '    <p class="dica">Sem taxas escondidas.</p>';
  html += '    <button class="botao botao-cheio" onclick="finalizarPedido()">Finalizar pedido</button>';
  html += '  </aside>';
  html += '</div>';

  conteudo.innerHTML = html;
  document.getElementById('pagamento').value = formaPagamento;
  document.getElementById('subtitulo').textContent = 'Sua sacola · ' + totalDeItens() + ' itens';
}

function mudarQuantidade(id, valor) {
  var carrinho = pegarCarrinho();
  var novoCarrinho = [];
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id == id) {
      carrinho[i].quantidade = carrinho[i].quantidade + valor;
    }
    if (carrinho[i].quantidade > 0) {
      novoCarrinho.push(carrinho[i]);
    }
  }
  salvarCarrinho(novoCarrinho);
  mostrarCarrinho();
}

function removerItem(id) {
  var carrinho = pegarCarrinho();
  var novoCarrinho = [];
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id != id) {
      novoCarrinho.push(carrinho[i]);
    }
  }
  salvarCarrinho(novoCarrinho);
  mostrarCarrinho();
}

function escolherEntrega(tipo) {
  tipoEntrega = tipo;
  mostrarCarrinho();
}

function aplicarCupom() {
  var digitado = document.getElementById('campoCupom').value.trim().toUpperCase();
  if (digitado == 'QUINA10') {
    cupomAtivo = true;
    mostrarAviso('Cupom aplicado: 10% off');
  } else {
    cupomAtivo = false;
    mostrarAviso('Cupom inválido');
  }
  mostrarCarrinho();
}

function finalizarPedido() {
  var carrinho = pegarCarrinho();
  var pedidos = pegarPedidos();

  var listaTexto = [];
  for (var i = 0; i < carrinho.length; i++) {
    listaTexto.push(carrinho[i].quantidade + ' ' + acharProduto(carrinho[i].id).nome);
  }

  var total = totalDoCarrinho();
  if (cupomAtivo == true) total = total * 0.9;
  if (tipoEntrega == 'entrega') total = total + 6;

  var novoPedido = {
    numero: 2050 + pedidos.length,
    data: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
    etapa: 1,
    itens: listaTexto.join(', '),
    total: total
  };

  pedidos.unshift(novoPedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  guardarPedidoJson(novoPedido, carrinho);
  salvarCarrinho([]);

  location.hash = '#pedidos';
  mostrarAviso('Pedido confirmado! Já está na chapa.');
}

