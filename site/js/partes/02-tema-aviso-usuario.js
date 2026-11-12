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

