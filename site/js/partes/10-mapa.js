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

