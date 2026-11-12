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

