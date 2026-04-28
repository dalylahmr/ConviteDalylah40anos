/* ── Firebase config ─────────────────────────────────────────────────────
   Para configurar:
   1. Acesse console.firebase.google.com e crie um projeto
   2. Realtime Database → Criar banco de dados (modo teste)
   3. Configurações do projeto → Seus apps → Web → copie o config aqui
   ──────────────────────────────────────────────────────────────────────── */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAZoASxRVyruoRUr74ax7UerD1nh4eDtJM",
  authDomain: "wishlist-dalylah.firebaseapp.com",
  databaseURL: "https://wishlist-dalylah-default-rtdb.firebaseio.com",
  projectId: "wishlist-dalylah",
  storageBucket: "wishlist-dalylah.firebasestorage.app",
  messagingSenderId: "662817567619",
  appId: "1:662817567619:web:a0661a8be6fb6ab938fcb6"
};

/* Acesso admin: adicione ?admin=dalylah2026 na URL */
const ADMIN_PASSWORD = 'dalylah2026';

/* ── Estado ────────────────────────────────────────────────────────────── */
let guest = '';
let db = null;
let reserves = {};
let cotas = {};
let isAdmin = false;

const fmt = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '_');

/* ── Admin ─────────────────────────────────────────────────────────────── */
const params = new URLSearchParams(location.search);
if (params.get('admin') === ADMIN_PASSWORD) {
  isAdmin = true;
  document.body.classList.add('is-admin');
}

/* ── Entrada ───────────────────────────────────────────────────────────── */
function enter() {
  const n = document.getElementById('name-input').value.trim();
  if (!n) return;
  guest = n;
  document.getElementById('guest-label').textContent = n;
  document.getElementById('entrance').style.display = 'none';
  document.getElementById('main').classList.add('show');
  initApp();
}
document.getElementById('name-input').addEventListener('keypress', e => {
  if (e.key === 'Enter') enter();
});

/* ── Firebase ──────────────────────────────────────────────────────────── */
function initApp() {
  const configured = !FIREBASE_CONFIG.apiKey.includes('COLE-AQUI');
  if (!configured) { render(); return; }

  firebase.initializeApp(FIREBASE_CONFIG);
  db = firebase.database();

  db.ref('reservations').on('value', s => { reserves = s.val() || {}; render(); });
  db.ref('cotas').on('value', s => { cotas = s.val() || {}; render(); });

  if (isAdmin) {
    db.ref('log').limitToLast(200).on('value', s => {
      const el = document.getElementById('log');
      if (!s.val()) { el.innerHTML = '<p class="log-entry">Sem atividade ainda.</p>'; return; }
      el.innerHTML = Object.values(s.val()).reverse().map(e =>
        `<div class="log-entry">[${new Date(e.ts).toLocaleString('pt-BR')}] ${e.guest} → ${e.action === 'r' ? 'reservou' : 'cancelou'} "${e.name}"</div>`
      ).join('');
    });
  }
}

/* ── Render ────────────────────────────────────────────────────────────── */
function render() {
  let available = 0;
  const html = CATS.map(cat => {
    const items = ITEMS.filter(i => i.cat === cat);
    const cards = items.map(i => {
      const res = reserves[i.id];
      const reserved = i.preReserved || !!res?.g;
      const mine = res?.g === guest;
      const cotaList = cotas[i.id] ? Object.values(cotas[i.id]) : [];
      const myCota = cotaList.some(c => c.g === guest);

      if (!i.isCota && !reserved) available++;

      let adminTxt = '';
      if (isAdmin) {
        if (i.preReserved) adminTxt = 'Reservado antes do site';
        else if (i.isCota) adminTxt = cotaList.length ? cotaList.map(c => c.g).join(', ') : 'Nenhuma cota ainda';
        else adminTxt = res?.g ? `${res.g} — ${new Date(res.ts).toLocaleString('pt-BR')}` : 'Disponível';
      }

      let btn = '';
      if (i.isCota) {
        btn = myCota
          ? `<button class="btn btn-cota-mine" onclick="removeCota('${i.id}')">Remover minha cota</button>`
          : `<button class="btn btn-cota" onclick="addCota('${i.id}')">Quero contribuir com uma cota</button>`;
      } else if (i.preReserved || (reserved && !mine)) {
        btn = `<button class="btn btn-taken" disabled>Já escolhido</button>`;
      } else if (mine) {
        btn = `<button class="btn btn-mine" onclick="unreserve('${i.id}')">Minha escolha — cancelar?</button>`;
      } else {
        btn = `<button class="btn btn-reserve" onclick="reserve('${i.id}')">Quero dar este presente</button>`;
      }

      return `<div class="card${reserved && !i.isCota ? ' is-reserved' : ''}">
        <div class="card-img-wrap">
          <div class="img-placeholder">A imagem deste item ainda não está disponível.</div>
        </div>
        <div class="card-body">
          <div class="card-name">${i.name}</div>
          <div class="card-desc">${i.desc}</div>
          ${i.isCota ? `<div class="card-cota">${cotaList.length} cota${cotaList.length !== 1 ? 's' : ''} confirmada${cotaList.length !== 1 ? 's' : ''}</div>` : ''}
          ${i.link ? `<a class="card-link" href="${i.link}" target="_blank">Ver produto ↗</a>` : ''}
          ${isAdmin ? `<div class="admin-note">${adminTxt}</div>` : ''}
          ${btn}
        </div>
      </div>`;
    }).join('');

    const notice = (cat === 'Festa' || cat === 'Comes e Bebes')
      ? `<p class="cat-notice">Esses itens fazem parte da organização da festa e tenho algumas preferências especiais para cada um. Se quiser contribuir com algum deles, me chama para conversarmos antes, será um prazer! ✦</p>`
      : '';
    return `<div class="category-section">
      <h2 class="category-title">${cat}</h2>
      ${notice}
      <div class="items-grid">${cards}</div>
    </div>`;
  }).join('');

  document.getElementById('wishlist').innerHTML = html;
  document.getElementById('counter').textContent =
    `${available} presente${available !== 1 ? 's' : ''} disponíve${available !== 1 ? 'is' : 'l'}`;
}

/* ── Ações ─────────────────────────────────────────────────────────────── */
async function reserve(id) {
  if (!db) return;
  const s = await db.ref(`reservations/${id}`).once('value');
  if (s.val()?.g) { toast('Este presente já foi reservado!'); return; }
  const item = ITEMS.find(i => i.id === id);
  const now = Date.now();
  await db.ref(`reservations/${id}`).set({ g: guest, ts: now });
  await db.ref('log').push({ guest, name: item.name, action: 'r', ts: now });
  toast('Presente reservado! Obrigada!');
}

async function unreserve(id) {
  if (!db) return;
  const item = ITEMS.find(i => i.id === id);
  const now = Date.now();
  await db.ref(`reservations/${id}`).remove();
  await db.ref('log').push({ guest, name: item.name, action: 'u', ts: now });
  toast('Reserva cancelada.');
}

async function addCota(id) {
  if (!db) return;
  const item = ITEMS.find(i => i.id === id);
  const now = Date.now();
  await db.ref(`cotas/${id}/${slug(guest)}`).set({ g: guest, ts: now });
  await db.ref('log').push({ guest, name: item.name, action: 'r', ts: now });
  toast('Cota confirmada! Obrigada!');
}

async function removeCota(id) {
  if (!db) return;
  const item = ITEMS.find(i => i.id === id);
  const now = Date.now();
  await db.ref(`cotas/${id}/${slug(guest)}`).remove();
  await db.ref('log').push({ guest, name: item.name, action: 'u', ts: now });
  toast('Cota removida.');
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
