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
