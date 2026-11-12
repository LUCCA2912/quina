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

