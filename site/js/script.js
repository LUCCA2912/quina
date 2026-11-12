var paginaAtual = '';

var produtos = [
  {
    id: 1,
    nome: 'O da Esquina',
    tag: 'O clássico',
    categoria: 'Burgers',
    preco: 29,
    descricao: 'Smash de 100 g, queijo prato, picles, cebola roxa e maionese da casa no pão de batata.',
    imagem: '../imagens/o-da-esquina.jpg',
    posicao: '50% 49%'
  },
  {
    id: 2,
    nome: 'Quina Duplo',
    tag: 'Queridinho da casa',
    categoria: 'Burgers',
    preco: 36,
    descricao: 'Dois smash de 100 g, cheddar em dobro, picles e molho Quina no brioche tostado.',
    imagem: '../imagens/quina-duplo.jpg',
    posicao: '50% 53%'
  },
  {
    id: 3,
    nome: 'Bacon de Respeito',
    tag: 'Defumado na medida',
    categoria: 'Burgers',
    preco: 42,
    descricao: 'Blend de 160 g, cheddar, bacon crocante, cebola caramelizada e barbecue da casa.',
    imagem: '../imagens/bacon-de-respeito.jpg',
    posicao: '50% 46%'
  },
  {
    id: 4,
    nome: 'Brasa Brava',
    tag: 'Um toque de pimenta',
    categoria: 'Burgers',
    preco: 38,
    descricao: 'Blend de 160 g, queijo meia cura, geleia de pimenta artesanal e rúcula fresquinha.',
    imagem: '../imagens/brasa-brava.jpg',
    posicao: '50% 51%'
  },
  {
    id: 5,
    nome: 'Verde sem Pose',
    tag: 'Também tem veggie',
    categoria: 'Burgers',
    preco: 34,
    descricao: 'Burger de grão de bico, queijo prato, alface, tomate e maionese de ervas. Vegetariano.',
    imagem: '../imagens/verde-sem-pose.jpg',
    posicao: '50% 48%'
  },
  {
    id: 6,
    nome: 'Frango Croc',
    tag: 'Crocância pura',
    categoria: 'Burgers',
    preco: 33,
    descricao: 'Sobrecoxa empanada, coleslaw da casa, picles e maionese de limão no brioche.',
    imagem: '../imagens/frango-croc.jpg',
    posicao: '50% 51%'
  },
  {
    id: 7,
    nome: 'Combo da Quina',
    tag: 'O trio que não tem erro',
    categoria: 'Combos',
    preco: 49,
    descricao: 'Quina Duplo + batata da casa de 150 g + refri em lata de 350 ml.',
    imagem: '../imagens/combo-quina.jpg',
    posicao: '50% 40%'
  },
  {
    id: 8,
    nome: 'Batata da casa',
    tag: '',
    categoria: 'Acompanhar',
    preco: 12,
    descricao: '150 g. Dourada, crocante e com sal da casa.',
    imagem: '../imagens/batata-da-casa.jpg'
  },
  {
    id: 9,
    nome: 'Batata com cheddar e bacon',
    tag: '',
    categoria: 'Acompanhar',
    preco: 22,
    descricao: '200 g. Cheddar cremoso e bacon crocante.',
    imagem: '../imagens/batata-cheddar-bacon.jpg'
  },
  {
    id: 10,
    nome: 'Refri em lata',
    tag: '',
    categoria: 'Beber',
    preco: 8,
    descricao: '350 ml. Coca-Cola, Sprite ou Fanta.',
    imagem: '../imagens/refri.jpg'
  },
  {
    id: 11,
    nome: 'Milk-shake de paçoca',
    tag: '',
    categoria: 'Beber',
    preco: 22,
    descricao: '400 ml. Sorvete, leite e paçoca de verdade.',
    imagem: '../imagens/milkshake.jpg',
    posicao: '50% 25%'
  }
];

function acharProduto(id) {
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].id == id) {
      return produtos[i];
    }
  }
  return null;
}

function trocarTema() {
  document.documentElement.classList.toggle('escuro');
  if (document.documentElement.classList.contains('escuro')) {
    localStorage.setItem('tema', 'escuro');
  } else {
    localStorage.setItem('tema', 'claro');
  }
}

function abrirMenu() {
  document.getElementById('menu').classList.toggle('aberto');
}

function mostrarAviso(texto) {
  var aviso = document.getElementById('aviso');
  aviso.textContent = texto;
  aviso.classList.add('mostrar');
  setTimeout(function () {
    aviso.classList.remove('mostrar');
  }, 2400);
}

var estaLogado = (localStorage.getItem('logado') == 'sim');

function pegarUsuario() {
  var texto = localStorage.getItem('usuario');
  if (texto) {
    return JSON.parse(texto);
  }
  return null;
}

function primeiroNome(nomeCompleto) {
  return nomeCompleto.split(' ')[0];
}

var usuario = pegarUsuario();

function sair() {
  localStorage.removeItem('logado');
  estaLogado = false;
  atualizarVisao();
  location.hash = '#login';
  mostrarAviso('Até a próxima!');
}

function verSenha(idCampo) {
  var campo = document.getElementById(idCampo);
  if (campo.type == 'password') {
    campo.type = 'text';
  } else {
    campo.type = 'password';
  }
}

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

function dinheiro(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function simplificar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function soNumeros(texto) {
  return texto.replace(/\D/g, '');
}

function mascaraCPF(valor) {
  var n = soNumeros(valor).slice(0, 11);
  n = n.replace(/(\d{3})(\d)/, '$1.$2');
  n = n.replace(/(\d{3})(\d)/, '$1.$2');
  n = n.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return n;
}

function mascaraCelular(valor) {
  var n = soNumeros(valor).slice(0, 11);
  n = n.replace(/(\d{2})(\d)/, '($1) $2');
  n = n.replace(/(\d{5})(\d)/, '$1-$2');
  return n;
}

function mascaraCEP(valor) {
  var n = soNumeros(valor).slice(0, 8);
  n = n.replace(/(\d{5})(\d)/, '$1-$2');
  return n;
}

function mascaraData(valor) {
  var n = soNumeros(valor).slice(0, 8);
  n = n.replace(/(\d{2})(\d)/, '$1/$2');
  n = n.replace(/(\d{2})(\d)/, '$1/$2');
  return n;
}

function mascaraNumero(valor) {
  return soNumeros(valor).slice(0, 6);
}

function mascaraNome(valor) {
  return valor.replace(/[^A-Za-zÀ-ÿ' ]/g, '');
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function cpfValido(cpf) {
  return soNumeros(cpf).length == 11;
}

function celularValido(celular) {
  return soNumeros(celular).length >= 10;
}

function senhaValida(senha) {
  var temLetra = /[A-Za-z]/.test(senha);
  var temNumero = /\d/.test(senha);
  return senha.length >= 8 && temLetra && temNumero;
}

function mostrarErro(idDoErro, texto) {
  document.getElementById(idDoErro).textContent = texto;
  return false;
}

function cadastrar(evento) {
  evento.preventDefault();

  var nome = document.getElementById('cadastro-nome').value.trim();
  var email = document.getElementById('cadastro-email').value.trim();
  var celular = document.getElementById('cadastro-celular').value.trim();
  var cpf = document.getElementById('cadastro-cpf').value.trim();
  var senha = document.getElementById('cadastro-senha').value;
  var confirmar = document.getElementById('cadastro-confirmar').value;
  var termos = document.getElementById('cadastro-termos').checked;

  if (nome.length < 3) return mostrarErro('cadastro-erro', 'Informe seu nome completo.');
  if (emailValido(email) == false) return mostrarErro('cadastro-erro', 'Digite um e-mail válido.');
  if (celularValido(celular) == false) return mostrarErro('cadastro-erro', 'Celular incompleto. Digite DDD + número.');
  if (cpfValido(cpf) == false) return mostrarErro('cadastro-erro', 'CPF incompleto. Digite os 11 números.');
  if (senhaValida(senha) == false) return mostrarErro('cadastro-erro', 'A senha precisa de 8+ caracteres, com letras e números.');
  if (senha != confirmar) return mostrarErro('cadastro-erro', 'As senhas não conferem.');
  if (termos == false) return mostrarErro('cadastro-erro', 'Aceite os termos para criar a conta.');

  var novoUsuario = {
    nome: nome,
    email: email,
    celular: celular,
    cpf: cpf,
    senha: senha
  };
  localStorage.setItem('usuario', JSON.stringify(novoUsuario));
  localStorage.setItem('logado', 'sim');
  usuario = novoUsuario;
  estaLogado = true;
  atualizarVisao();
  location.hash = '#index';
  mostrarAviso('Conta criada! Bem-vindo à vizinhança.');
}

function entrar(evento) {
  evento.preventDefault();

  var email = document.getElementById('login-email').value.trim();
  var senha = document.getElementById('login-senha').value;
  var salvo = pegarUsuario();

  if (emailValido(email) == false) return mostrarErro('login-erro', 'Digite um e-mail válido.');

  if (salvo == null || salvo.email != email || salvo.senha != senha) {
    return mostrarErro('login-erro', 'E-mail ou senha incorretos. Ainda não tem conta? Clique em Cadastre-se.');
  }

  localStorage.setItem('logado', 'sim');
  usuario = salvo;
  estaLogado = true;
  atualizarVisao();
  location.hash = '#index';
  mostrarAviso('Bem-vindo de volta!');
}

function entrarComGoogle() {
  mostrarAviso('Login com Google não está ativo neste projeto conceitual.');
}

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

var etapas = ['Pedido confirmado', 'Na chapa', 'Saiu para entrega', 'Entregue'];
var filtroAtual = 'Todos';

function escolherFiltro(nome) {
  filtroAtual = nome;
  mostrarPedidos();
}

function mostrarPedidos() {
  var pedidos = pegarPedidos();
  var busca = simplificar(document.getElementById('campoBuscaPedido').value);

  var andamento = 0;
  var entregues = 0;
  for (var i = 0; i < pedidos.length; i++) {
    if (pedidos[i].etapa == 3) {
      entregues = entregues + 1;
    } else {
      andamento = andamento + 1;
    }
  }

  var filtros = [
    ['Todos', pedidos.length],
    ['Em andamento', andamento],
    ['Entregues', entregues]
  ];

  var htmlFiltros = '';
  for (var f = 0; f < filtros.length; f++) {
    var classe = 'chip';
    if (filtros[f][0] == filtroAtual) {
      classe = 'chip ativo';
    }
    htmlFiltros += '<button class="' + classe + '" onclick="escolherFiltro(\'' + filtros[f][0] + '\')">' + filtros[f][0] + ' (' + filtros[f][1] + ')</button>';
  }
  document.getElementById('areaFiltros').innerHTML = htmlFiltros;

  var html = '';
  var achados = 0;
  for (var j = 0; j < pedidos.length; j++) {
    var p = pedidos[j];
    var emAndamento = (p.etapa < 3);

    var passaFiltro = true;
    if (filtroAtual == 'Entregues' && emAndamento) passaFiltro = false;
    if (filtroAtual == 'Em andamento' && emAndamento == false) passaFiltro = false;

    var textoBusca = simplificar('#' + p.numero + ' ' + p.itens);
    if (passaFiltro == false || textoBusca.indexOf(busca) == -1) {
      continue;
    }
    achados = achados + 1;

    var classePedido = 'pedido';
    var classeStatus = 'status';
    if (emAndamento) {
      classePedido = 'pedido andamento';
      classeStatus = 'status vermelho';
    }

    html += '<article class="' + classePedido + '">';
    html += '  <div class="linha">';
    html += '    <div><b>Pedido #' + p.numero + '</b> ';
    html += '      <span class="' + classeStatus + '">' + etapas[p.etapa] + '</span><br>';
    html += '      <small class="suave">' + p.data + '</small></div>';
    html += '    <span class="preco">' + dinheiro(p.total) + '</span>';
    html += '  </div>';
    html += '  <p class="suave" style="margin:.7rem 0 0">' + p.itens + '</p>';

    if (emAndamento) {
      html += '  <ol class="acompanhamento">';
      for (var e = 0; e < etapas.length; e++) {
        var classeEtapa = '';
        if (e <= p.etapa) {
          classeEtapa = 'feito';
        }
        html += '<li class="' + classeEtapa + '">' + etapas[e] + '</li>';
      }
      html += '  </ol>';
    }
    html += '</article>';
  }

  if (achados == 0) {
    html = '<p class="vazio">Nenhum pedido encontrado.</p>';
  }
  document.getElementById('listaPedidos').innerHTML = html;
}

var camposDoPerfil = ['nome', 'email', 'celular', 'cpf', 'nascimento', 'cep', 'rua', 'numero', 'complemento', 'bairro', 'referencia'];

function preencherPerfil() {
  for (var i = 0; i < camposDoPerfil.length; i++) {
    var nomeCampo = camposDoPerfil[i];
    document.getElementById('perfil-' + nomeCampo).value = usuario[nomeCampo] || '';
  }
  document.getElementById('tituloPerfil').textContent = 'A casa é sua, ' + primeiroNome(usuario.nome) + '.';
}

function salvarPerfil(evento) {
  evento.preventDefault();

  var nome = document.getElementById('perfil-nome').value.trim();
  var email = document.getElementById('perfil-email').value.trim();
  var celular = document.getElementById('perfil-celular').value.trim();
  var cpf = document.getElementById('perfil-cpf').value.trim();
  var cep = document.getElementById('perfil-cep').value.trim();

  if (nome.length < 3) return mostrarErro('perfil-erro', 'Informe seu nome completo.');
  if (emailValido(email) == false) return mostrarErro('perfil-erro', 'Digite um e-mail válido.');
  if (celularValido(celular) == false) return mostrarErro('perfil-erro', 'Celular incompleto. Digite DDD + número.');
  if (cpfValido(cpf) == false) return mostrarErro('perfil-erro', 'CPF incompleto. Digite os 11 números.');
  if (cep != '' && cep.length < 9) return mostrarErro('perfil-erro', 'CEP incompleto.');

  for (var i = 0; i < camposDoPerfil.length; i++) {
    var campo = camposDoPerfil[i];
    usuario[campo] = document.getElementById('perfil-' + campo).value.trim();
  }
  localStorage.setItem('usuario', JSON.stringify(usuario));

  mostrarErro('perfil-erro', '');
  atualizarVisao();
  document.getElementById('tituloPerfil').textContent = 'A casa é sua, ' + primeiroNome(usuario.nome) + '.';
  mostrarAviso('Dados salvos!');
}

var mapaSvg = null;
var mapaInfo = null;
var vista = { x: 194, y: 204, w: 700, h: 440 };
var arrastando = false;
var ultimoX = 0;
var ultimoY = 0;
var andou = 0;
var clicouNoPino = false;

function aplicarVista() {
  mapaSvg.setAttribute('viewBox', vista.x + ' ' + vista.y + ' ' + vista.w + ' ' + vista.h);
}

function darZoom(fator, centroX, centroY) {
  if (centroX == undefined) centroX = vista.x + vista.w / 2;
  if (centroY == undefined) centroY = vista.y + vista.h / 2;

  var novaLargura = vista.w * fator;
  if (novaLargura < 260) novaLargura = 260;
  if (novaLargura > 1500) novaLargura = 1500;
  var f = novaLargura / vista.w;

  vista.x = centroX - (centroX - vista.x) * f;
  vista.y = centroY - (centroY - vista.y) * f;
  vista.w = novaLargura;
  vista.h = vista.h * f;
  aplicarVista();
}

function centralizarMapa() {
  vista.x = 194;
  vista.y = 204;
  vista.w = 700;
  vista.h = 440;
  aplicarVista();
}

function mostrarAbaMapa() {
  document.getElementById('abaMapa').classList.add('ativo');
  document.getElementById('abaGoogle').classList.remove('ativo');
  document.getElementById('mapaArea').hidden = false;
  document.getElementById('areaGoogle').hidden = true;
}

function mostrarAbaGoogle() {
  document.getElementById('abaGoogle').classList.add('ativo');
  document.getElementById('abaMapa').classList.remove('ativo');
  document.getElementById('mapaArea').hidden = true;
  document.getElementById('areaGoogle').hidden = false;
  var quadro = document.getElementById('quadroGoogle');
  if (quadro.getAttribute('src') == null) {
    quadro.setAttribute('src', 'https://www.google.com/maps?q=Rua+Mateus+Grou+218,+Pinheiros,+S%C3%A3o+Paulo&z=16&output=embed');
  }
}

function iniciarMapa() {
  mapaSvg = document.getElementById('mapaSvg');
  mapaInfo = document.getElementById('mapaInfo');

  mapaSvg.addEventListener('pointerdown', function (e) {
    mapaSvg.setPointerCapture(e.pointerId);
    arrastando = true;
    ultimoX = e.clientX;
    ultimoY = e.clientY;
    andou = 0;
    clicouNoPino = (e.target.parentNode.id == 'pino');
  });

  mapaSvg.addEventListener('pointermove', function (e) {
    if (arrastando == false) return;
    var caixa = mapaSvg.getBoundingClientRect();
    var dx = e.clientX - ultimoX;
    var dy = e.clientY - ultimoY;
    andou = andou + Math.abs(dx) + Math.abs(dy);
    ultimoX = e.clientX;
    ultimoY = e.clientY;

    var escala = Math.max(vista.w / caixa.width, vista.h / caixa.height);
    vista.x = vista.x - dx * escala;
    vista.y = vista.y - dy * escala;
    aplicarVista();
  });

  mapaSvg.addEventListener('pointerup', function () {
    arrastando = false;
    if (andou < 6 && clicouNoPino == true) {
      mapaInfo.hidden = !mapaInfo.hidden;
    }
  });

  mapaSvg.addEventListener('wheel', function (e) {
    e.preventDefault();
    var caixa = mapaSvg.getBoundingClientRect();
    var x = vista.x + (e.clientX - caixa.left) / caixa.width * vista.w;
    var y = vista.y + (e.clientY - caixa.top) / caixa.height * vista.h;
    if (e.deltaY > 0) {
      darZoom(1.15, x, y);
    } else {
      darZoom(0.87, x, y);
    }
  }, { passive: false });
}

var paginas = ['index', 'cadastro', 'login', 'cardapio', 'carrinho', 'pedidos', 'perfil'];

var titulos = {
  index: 'Hamburgueria de esquina',
  cadastro: 'Cadastre-se',
  login: 'Entrar',
  cardapio: 'Cardápio',
  carrinho: 'Carrinho',
  pedidos: 'Meus pedidos',
  perfil: 'Meu perfil'
};

function atualizarVisao() {
  if (estaLogado) {
    document.body.className = 'membro';
  } else {
    document.body.className = 'visitante';
  }

  var nomes = document.querySelectorAll('.nome-lateral');
  var avatares = document.querySelectorAll('.avatar');
  var nomeNoMenu = document.getElementById('nomeUsuario');

  if (estaLogado && usuario) {
    nomeNoMenu.textContent = 'Olá, ' + primeiroNome(usuario.nome);
    for (var i = 0; i < nomes.length; i++) {
      nomes[i].textContent = usuario.nome;
    }
    for (var k = 0; k < avatares.length; k++) {
      avatares[k].textContent = usuario.nome.charAt(0).toUpperCase();
    }
  }
  atualizarContador();
}

function mostrarPagina(nome) {
  var todas = document.querySelectorAll('.pagina');
  for (var i = 0; i < todas.length; i++) {
    todas[i].classList.remove('ativa');
  }
  document.getElementById('pagina-' + nome).classList.add('ativa');
  paginaAtual = nome;
  document.title = titulos[nome] + ' | Quina';
  document.getElementById('menu').classList.remove('aberto');

  var linksDoMenu = ['cardapio', 'pedidos', 'perfil'];
  for (var j = 0; j < linksDoMenu.length; j++) {
    var link = document.getElementById('menu-' + linksDoMenu[j]);
    if (linksDoMenu[j] == nome) {
      link.classList.add('ativo');
    } else {
      link.classList.remove('ativo');
    }
  }

  if (nome == 'cardapio') {
    var textoEndereco = '📍 Entrega em Pinheiros';
    if (usuario.rua) {
      textoEndereco = '📍 Entregar em ' + usuario.rua + ', ' + (usuario.numero || '');
    }
    document.getElementById('enderecoEntrega').textContent = textoEndereco;
    mostrarCategorias();
    mostrarProdutos();
    atualizarBarraCarrinho();
  }
  if (nome == 'carrinho') {
    mostrarCarrinho();
  }
  if (nome == 'pedidos') {
    mostrarPedidos();
  }
  if (nome == 'perfil') {
    preencherPerfil();
  }

  window.scrollTo(0, 0);
}

function abrirPaginaDoHash() {
  var nome = location.hash.replace('#', '');
  if (nome == '' || paginas.indexOf(nome) == -1) {
    nome = 'index';
  }

  if (estaLogado == false && nome != 'cadastro' && nome != 'login' && nome != 'index') {
    if (location.hash != '') {
      mostrarAviso('Entre ou cadastre-se para acessar o site.');
    }
    if (localStorage.getItem('usuario')) {
      location.hash = '#login';
    } else {
      location.hash = '#cadastro';
    }
    return;
  }

  if (estaLogado == true && (nome == 'cadastro' || nome == 'login')) {
    location.hash = '#index';
    return;
  }

  mostrarPagina(nome);
}

fundoModal = document.createElement('div');
fundoModal.id = 'fundoModal';
fundoModal.hidden = true;
document.body.appendChild(fundoModal);

fundoModal.onclick = function (e) {
  if (e.target == fundoModal) {
    fecharModal();
  }
};

document.onkeydown = function (e) {
  if (e.key == 'Escape' && produtoAberto != null) {
    fecharModal();
  }
};

var destaques = [2, 3, 4];
var htmlDestaques = '';
for (var d = 0; d < destaques.length; d++) {
  htmlDestaques += criarCard(acharProduto(destaques[d]));
}
document.getElementById('destaques').innerHTML = htmlDestaques;

iniciarMapa();
atualizarVisao();
window.onhashchange = abrirPaginaDoHash;
abrirPaginaDoHash();
