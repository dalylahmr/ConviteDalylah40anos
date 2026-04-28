const ITEMS = [
  // FESTA
  { id:'bolo',       name:'Bolo Decorado',                 desc:'Bolo tema Oscar personalizado',                                    price:350, cat:'Festa',          isCota:false },
  { id:'docinhos',   name:'Docinhos Finos',                desc:'Brigadeiros, 200 unidades (Doce Paladar, Setor Sul)',                price:250, cat:'Festa',      isCota:false },
  { id:'backdrop',   name:'Backdrop para Fotos',           desc:'Painel decorativo para fotos da festa',                            price:180, cat:'Festa',          isCota:true },
  { id:'iluminacao', name:'Iluminação Cênica',             desc:'Iluminação decorativa para o ambiente',                           price:150, cat:'Festa',          isCota:false },
  { id:'placa',      name:'Placa Decorativa',              desc:'"O Filme da Minha Vida" em acrílico dourado',                      price:140, cat:'Festa',          isCota:true },
  { id:'baloes',     name:'Balões Metalizados',            desc:'Balões metalizados dourado e preto',                              price:80,  cat:'Festa',          isCota:false, preReserved:true },
  { id:'fotografo',  name:'Fotógrafo',                    desc:'Sessão fotográfica profissional no evento',                       price:300, cat:'Festa',          isCota:true },
  // COMES E BEBES
  { id:'espumante',  name:'Espumante Brut',                desc:'Prosecco Brut, pack para a festa',                               price:120, cat:'Comes e Bebes',  isCota:true },
  { id:'vinho',      name:'Vinho',                         desc:'Vinho tinto ou rosé',                                             price:90,  cat:'Comes e Bebes',  isCota:true },
  { id:'bebidas',    name:'Bebidas',                       desc:'Pack de refrigerantes e sucos',                                   price:60,  cat:'Comes e Bebes',  isCota:true },
  { id:'sobremesa',  name:'Sobremesa',                     desc:'Complemento de sobremesa para a festa',                           price:150, cat:'Comes e Bebes',  isCota:true },
  // BELEZA
  { id:'sabonete',   name:'Sabonete Iluminador Vitamina C',desc:'ADCOS Derma Complex, 240ml',                                     price:120, cat:'Beleza',         isCota:false, link:'https://www.amazon.com.br/Adcos-Sabonete-com-Vitamina-240ml/dp/B07981DQZ4' },
  { id:'serum',      name:'Sérum Vitamina C 15 Oil Control',desc:'ADCOS, antioxidante para pele oleosa, 15ml',                   price:180, cat:'Beleza',         isCota:false, link:'https://www.mercadolivre.com.br/vitamina-c-15-oil-control-15ml-adcos/p/MLB22746475' },
  { id:'hyalu',      name:'Ácido Hialurônico Hyalu 6+',    desc:'ADCOS Derma Complex, concentrado, 30ml',                        price:220, cat:'Beleza',         isCota:false, link:'https://www.amazon.com.br/Derma-Complex-Concentrado-Hyalu-30ml/dp/B07M5B41ZZ' },
  { id:'fps50',      name:'Protetor Solar Aqua Fluid FPS 50',desc:'ADCOS, antioleosidade, controle de brilho',                   price:130, cat:'Beleza',         isCota:false, link:'https://www.lojaadcos.com.br/protetor-solar-aquafluid-incolor/p?skuId=2000904' },
  { id:'stick',      name:'Protetor Solar Stick FPS 55',   desc:'ADCOS, cor Ivory',                                              price:150, cat:'Beleza',         isCota:false, link:'https://www.adcos.com.br' },
  { id:'cicalfate',  name:'Cicalfate+ Creme Reparador',    desc:'Avène, proteção e reparação, 100ml',                            price:90,  cat:'Beleza',         isCota:false, link:'https://www.drogasil.com.br/avene-cicalfate-creme-reparador-protetor-100ml.html' },
{ id:'sebastian',  name:'Sebastian Dark Oil Mask',        desc:'Máscara capilar com óleo de jojoba e argan, 150ml',             price:0,   cat:'Beleza',         isCota:false, link:'https://www.mercadolivre.com.br/dark-oil-lightweight-mask-mascara-150ml-sebastian-professional/p/MLB19971412' },
  { id:'amend',      name:'Amend Valorize Fluído Prolongador', desc:'Fluído prolongador do efeito liso com proteção térmica, 180ml',  price:0,   cat:'Beleza',         isCota:false, link:'https://www.amazon.com.br/Amend-Valorize-Prolongador-Efeito-Liso/dp/B0847T39DR' },
  { id:'massagem',   name:'Massagem Relaxante',             desc:'Massagem Relaxante',                                             price:180, cat:'Beleza',         isCota:false },
  { id:'loreal-repair-oil', name:"L'Oréal Absolut Repair Oil",     desc:'Óleo capilar 10 em 1 com óleo de gérmen de trigo, 90ml',          price:0,   cat:'Beleza',         isCota:false, link:'https://a.co/d/00BcJJ65' },
  { id:'walkers-earmuff',   name:"Walker's Passive Slim Earmuff",  desc:'Protetor auricular slim',                                         price:0,   cat:'Beleza',         isCota:false, link:'https://a.co/d/0erAR5ME' },
  { id:'loreal-inforcer',   name:"L'Oréal Inforcer B6 + Biotina",  desc:'Máscara condicionante antiquebra para cabelos fragilizados, 250g', price:0,   cat:'Beleza',         isCota:false, link:'https://www.mercadolivre.com.br/p/MLB19531266' },
  // MODA
  { id:'sandalia-caramelo', name:'Sandália Mule Salto Bloco',       desc:'N 37, caramelo',                                                  price:0,   cat:'Moda',           isCota:false, link:'https://br.shp.ee/bi3GtBX9' },
  { id:'sandalia-nude',     name:'Sandália Mule Salto Bloco',       desc:'N 37, nude',                                                      price:0,   cat:'Moda',           isCota:false, link:'https://www.sapatinhodeluxo.com.br/tamanco-nude-baby-salto-bloco-tira-dedo-3060-52_2/' },
  { id:'vans',       name:'Tênis Vans',                     desc:'Número 37, modelo à escolha',                   price:350, cat:'Moda',           isCota:false, link:'https://www.vans.com.br' },
  { id:'allstar',    name:'All Star Converse',              desc:'Número 37, cor marrom telha',                                   price:250, cat:'Moda',           isCota:false, link:'https://converse.com.br/chuck-taylor-all-star-seasonal-colors-cano-baixo-grande-ct04200087-marrom-telha' },
  { id:'perfume',    name:'Lancôme La Vie Est Belle',       desc:'Eau de Parfum 100ml',                                            price:650, cat:'Moda',           isCota:false, preReserved:true },
  { id:'lily',       name:'Lily Essence Hidratante',        desc:'O Boticário, loção corporal',                                   price:120, cat:'Moda',           isCota:false, link:'https://www.boticario.com.br' },
  // EXPERIÊNCIAS
  { id:'renner',     name:'Voucher da Renner',              desc:'Voucher de compras na Renner',                                   price:0,   cat:'Moda',           isCota:false },
  { id:'riachuelo',  name:'Voucher da Riachuelo',           desc:'Voucher de compras na Riachuelo',                                price:0,   cat:'Moda',           isCota:false },
  { id:'ensaio',     name:'Ensaio Fotográfico',             desc:'Sessão de fotos',                                                price:300, cat:'Experiências',   isCota:false },
  { id:'aulas',      name:'Voucher de aulas avulsas',                desc:'Yoga ou dança',                                                  price:300, cat:'Experiências',   isCota:false }
];

const CATS = ['Beleza','Experiências','Moda','Festa','Comes e Bebes'];
