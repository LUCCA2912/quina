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

