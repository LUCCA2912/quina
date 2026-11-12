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

