function criarCard(p) {
  var html = '';
  html += '<article class="cartao-produto" onclick="abrirModal(' + p.id + ')">';
  html += '  <div class="produto-foto">';
  html += '    <img class="produto-img ' + (p.classeImg || '') + '" src="' + p.imagem + '" alt="' + p.nome + '" style="object-position:' + (p.posicao || 'center') + '">';
  if (p.tag != '') {
    html += '    <span class="tag">' + p.tag + '</span>';
  }
  html += '  </div>';
  html += '  <h3><button class="link-produto">' + p.nome + '</button></h3>';
  html += '  <p>' + p.descricao + '</p>';
  html += '  <div class="linha">';
  html += '    <span class="preco">' + dinheiro(p.preco) + '</span>';
  html += '    <button class="botao botao-pequeno botao-adicionar" onclick="adicionarRapido(event, ' + p.id + ')">Adicionar</button>';
  html += '  </div>';
  html += '</article>';
  return html;
}

function adicionarRapido(evento, id) {
  evento.stopPropagation();
  adicionarAoCarrinho(id, 1);
  mostrarAviso('Adicionado à sacola!');
}

var fundoModal = null;
var produtoAberto = null;
var quantidadeModal = 1;
var extrasMarcados = {};

function abrirModal(id) {
  produtoAberto = acharProduto(id);
  quantidadeModal = 1;
  extrasMarcados = {};

  var p = produtoAberto;
  var listaExtras = [8, 9, 10, 11];
  var html = '';
  html += '<div class="modal" role="dialog" aria-modal="true">';
  html += '  <button class="modal-fechar" onclick="fecharModal()" aria-label="Fechar">×</button>';
  html += '  <img class="modal-img ' + (p.classeImg || '') + '" src="' + p.imagem + '" alt="' + p.nome + '" style="object-position:' + (p.posicao || 'center') + '">';
  html += '  <div class="modal-corpo">';
  html += '    <span class="rotulo">' + (p.tag || p.categoria) + '</span>';
  html += '    <h3>' + p.nome + '</h3>';
  html += '    <p class="suave">' + p.descricao + '</p>';
  html += '    <div class="linha" style="margin-bottom:1rem">';
  html += '      <span class="preco">' + dinheiro(p.preco) + '</span>';
  html += '      <div class="quantidade">';
  html += '        <button class="modal-menos" onclick="mudarQuantidadeModal(-1)" aria-label="Diminuir quantidade">−</button>';
  html += '        <b id="qtdModal">1</b>';
  html += '        <button class="modal-mais" onclick="mudarQuantidadeModal(1)" aria-label="Aumentar quantidade">+</button>';
  html += '      </div>';
  html += '    </div>';
  html += '    <div class="linha" style="margin-bottom:.6rem">';
  html += '      <h4 style="margin:0">Quer completar?</h4>';
  if (p.categoria == 'Burgers') {
    html += '      <button class="chip modal-combo" onclick="montarCombo()">Montar combo (batata + refri)</button>';
  }
  html += '    </div>';

  for (var i = 0; i < listaExtras.length; i++) {
    var e = acharProduto(listaExtras[i]);
    if (e.id != p.id) {
      html += '    <label class="extra">';
      html += '      <input type="checkbox" id="extra' + e.id + '" onchange="marcarExtra(' + e.id + ', this.checked)">';
      html += '      <span>' + e.nome + '</span>';
      html += '      <b>+ ' + dinheiro(e.preco) + '</b>';
      html += '    </label>';
    }
  }

  html += '    <p class="dica">Os extras entram 1 por unidade escolhida.</p>';
  html += '    <button class="botao botao-cheio modal-adicionar" onclick="adicionarDoModal()">Adicionar à sacola · <span id="totalModal"></span></button>';
  html += '  </div>';
  html += '</div>';

  fundoModal.innerHTML = html;
  fundoModal.hidden = false;
  document.body.style.overflow = 'hidden';
  atualizarTotalModal();
}

function fecharModal() {
  fundoModal.hidden = true;
  fundoModal.innerHTML = '';
  document.body.style.overflow = '';
  produtoAberto = null;
}

function mudarQuantidadeModal(valor) {
  quantidadeModal = quantidadeModal + valor;
  if (quantidadeModal < 1) quantidadeModal = 1;
  if (quantidadeModal > 20) quantidadeModal = 20;
  atualizarTotalModal();
}

function montarCombo() {
  extrasMarcados[8] = true;
  extrasMarcados[10] = true;
  var batata = document.getElementById('extra8');
  var refri = document.getElementById('extra10');
  if (batata) batata.checked = true;
  if (refri) refri.checked = true;
  atualizarTotalModal();
}

function marcarExtra(id, marcado) {
  extrasMarcados[id] = marcado;
  atualizarTotalModal();
}

function atualizarTotalModal() {
  var somaExtras = 0;
  for (var id in extrasMarcados) {
    if (extrasMarcados[id] == true) {
      somaExtras = somaExtras + acharProduto(id).preco;
    }
  }
  document.getElementById('qtdModal').textContent = quantidadeModal;
  document.getElementById('totalModal').textContent = dinheiro((produtoAberto.preco + somaExtras) * quantidadeModal);
}

function adicionarDoModal() {
  adicionarAoCarrinho(produtoAberto.id, quantidadeModal);
  for (var id in extrasMarcados) {
    if (extrasMarcados[id] == true) {
      adicionarAoCarrinho(id, quantidadeModal);
    }
  }
  mostrarAviso(quantidadeModal + '× ' + produtoAberto.nome + ' na sacola!');
  fecharModal();
}

var categorias = ['Todos', 'Burgers', 'Combos', 'Acompanhar', 'Beber'];
var categoriaAtual = 'Todos';

function mostrarCategorias() {
  var html = '';
  for (var i = 0; i < categorias.length; i++) {
    var classe = 'chip';
    if (categorias[i] == categoriaAtual) {
      classe = 'chip ativo';
    }
    html += '<button class="' + classe + '" onclick="escolherCategoria(\'' + categorias[i] + '\')">' + categorias[i] + '</button>';
  }
  document.getElementById('areaChips').innerHTML = html;
}

function escolherCategoria(nome) {
  categoriaAtual = nome;
  mostrarCategorias();
  mostrarProdutos();
}

function mostrarProdutos() {
  var busca = simplificar(document.getElementById('campoBusca').value);
  var html = '';
  var achados = 0;

  for (var i = 0; i < produtos.length; i++) {
    var p = produtos[i];
    var daCategoria = (categoriaAtual == 'Todos' || p.categoria == categoriaAtual);
    var textoDoProduto = simplificar(p.nome + ' ' + p.descricao);
    var bateBusca = (textoDoProduto.indexOf(busca) != -1);

    if (daCategoria && bateBusca) {
      html += criarCard(p);
      achados = achados + 1;
    }
  }

  if (achados == 0) {
    html = '<p class="vazio" style="grid-column:1/-1">Nada encontrado. Tente outro nome ou ingrediente.</p>';
  }
  document.getElementById('listaProdutos').innerHTML = html;
}

function atualizarBarraCarrinho() {
  var barra = document.getElementById('barraCarrinho');
  if (totalDeItens() > 0) {
    barra.classList.add('visivel');
  } else {
    barra.classList.remove('visivel');
  }
  document.getElementById('textoBarra').textContent = totalDeItens() + ' itens no carrinho · ' + dinheiro(totalDoCarrinho());
}

function adicionarCombo() {
  adicionarAoCarrinho(7, 1);
  mostrarAviso('Combo da Quina na sacola!');
}

