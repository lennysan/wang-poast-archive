// The Wang Poast Archive — REAL @alexandr_wang tweets about Muse (data in data.js).
// Editorial funniness ranking (ours, 100 = funniest). Facts stay in data.js; jokes scored here.
const FUNNY = {
  "2108230558774104371": 100, // muse onto his greatest challenge yet: finding love
  "2107562916056891537": 96,  // clearing my schedule today to give muse media training 😑
  "2107859231567495383": 93,  // you'll notice the interface is prettttyyyyy slick
  "2107857066174112175": 90,  // 🚨 MUSE ALERT 🚨 tablet superintelligence needs :))
  "2100714048329580957": 85,  // muse for mac is HERE!!
  "2102921739621806290": 81,  // video chat (iphone screen record doesn't record the sound…)
  "2102919554032910525": 77,  // people preferred muse (unsurprisingly)
  "2103551714536439951": 72,  // Here's to the wanting. Here's to the dreaming.
  "2100829303563067587": 66,  // muse is now the #1 app in the App Store!
  "2102919552254484765": 58,  // MUSE RESEARCH ALERT: Realtime Avatar
  "2041913097968103636": 50,  // 9/ certainly rough edges we will polish
  "2041909376508985381": 42,  // 1/ today we're releasing muse spark
  "2041909388852748717": 34,  // 7/ this is step one. bigger models incoming
  "2041909381667958855": 28,  // 3/ contemplating mode
  "2041909380208324687": 22,  // 2/ natively multimodal reasoning model
  "2102919555647697232": 17,  // 3/ watermarked as AI without adding latency
  "2041909386411676095": 13,  // 5/ instant and thinking modes. shopping mode
  "2041909387661615278": 10,  // 6/ sees and understands the world around you
  "2041909384293576901": 5,   // 4/ extensive safety evaluations (least funny genre)
  "2041909390241100113": 2,   // 8/ read more here: [link]
};
POASTS.forEach(p => { p.funny = FUNNY[p.id] ?? 1; });
[...POASTS].sort((a,b) => b.funny - a.funny).forEach((p,i) => { p.funnyRank = i + 1; });
const CATS = ["All","Launch","Milestones","Research","Unhinged"];
let activeCat = "All";
const liked = new Set();
const reposted = new Set();

const VERIFIED = `<svg width="17" height="17" viewBox="0 0 24 24" aria-label="Verified"><path fill="#1d9bf0" d="M12 1.7l2.6 2 3.2-.4 1 3.1 2.9 1.4-1.2 3 1.2 3-2.9 1.4-1 3.1-3.2-.4-2.6 2-2.6-2-3.2.4-1-3.1L2.3 13.8l1.2-3-1.2-3 2.9-1.4 1-3.1 3.2.4z"/><path fill="#fff" d="M10.6 15.6l-2.3-2.3 1.1-1.1 1.2 1.2 4-4 1.1 1.1z"/></svg>`;

function fmt(n){ return n >= 1000000 ? (n/1000000).toFixed(1)+"M" : n >= 1000 ? (n/1000).toFixed(1)+"K" : ""+n; }
function esc(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;"); }
function linkify(s){
  return esc(s)
    .replace(/https:\/\/t\.co\/\w+/g, u => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`)
    .replace(/@(\w+)/g, (m,u) => `<a href="https://x.com/${u}" target="_blank" rel="noopener">@${u}</a>`);
}

function mediaHTML(p){
  if (p.video) {
    const poster = p.media[0] ? ` poster="${p.media[0]}"` : "";
    return `<div class="t-media"><video src="${p.video}"${poster} controls preload="metadata" playsinline></video></div>`;
  }
  if (!p.media.length) return "";
  const cls = p.media.length > 1 ? "t-media grid" : "t-media";
  const imgs = p.media.map((m,i) =>
    `<img src="${m}" alt="Attached image ${i+1} from @alexandr_wang's tweet" loading="lazy" data-zoom="${p.id}:${i}"/>`).join("");
  return `<div class="${cls}">${imgs}</div>`;
}

function tweetCard(p){
  return `<article class="tweet">
    <div class="t-head">
      <img class="t-avatar" src="${AVATAR_URL}" alt="Alexandr Wang"/>
      <div><div class="t-name">Alexandr Wang ${VERIFIED}</div>
      <div class="t-handle">@alexandr_wang · ${p.date}</div></div>
      <a class="t-x" href="${p.url}" target="_blank" rel="noopener" aria-label="View on X">𝕏</a></div>
    <p class="t-text">${linkify(p.text)}</p>
    ${mediaHTML(p)}
    <div class="t-meta"><span class="tag rank">#${p.funnyRank} funniest · ${p.funny}/100</span><span class="tag">${p.cat}</span>
      <span class="mono" style="font-weight:700">UNHINGED ${p.unhinged}%</span>
      <span class="meter"><span class="meter-fill" style="display:block;width:${p.unhinged}%"></span></span></div>
    <div class="t-actions">
      <span>💬 ${fmt(p.replies)}</span>
      <button data-repost="${p.id}" aria-label="Repost (local)">🔁 ${fmt(p.reposts + (reposted.has(p.id)?1:0))}</button>
      <button class="like ${liked.has(p.id)?'liked':''}" data-like="${p.id}" aria-label="Like (local)">♥ ${fmt(p.likes + (liked.has(p.id)?1:0))}</button>
      <span>👁 ${fmt(p.views)}</span>
      <a class="copy" href="${p.url}" target="_blank" rel="noopener">View on X ↗</a>
    </div></article>`;
}

function renderTabs(){
  document.getElementById('tabs').innerHTML = CATS.map(c =>
    `<button class="tab ${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`).join('');
  document.querySelectorAll('#tabs .tab').forEach(b =>
    b.addEventListener('click', () => { activeCat = b.dataset.cat; renderTabs(); renderFeed(); }));
}

function visiblePoasts(){
  const q = document.getElementById('search').value.trim().toLowerCase();
  const sort = document.getElementById('sort').value;
  const list = POASTS.filter(p =>
    (activeCat === "All" || p.cat === activeCat) &&
    (!q || p.text.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)));
  if (sort === "funny") list.sort((a,b) => b.funny - a.funny);
  if (sort === "likes") list.sort((a,b) => b.likes - a.likes);
  if (sort === "unhinged") list.sort((a,b) => b.unhinged - a.unhinged);
  if (sort === "views") list.sort((a,b) => b.views - a.views);
  if (sort === "newest") list.sort((a,b) => b.ts - a.ts);
  if (sort === "oldest") list.sort((a,b) => a.ts - b.ts);
  return list;
}

function renderFeed(){
  const list = visiblePoasts();
  document.getElementById('empty').hidden = list.length > 0;
  document.getElementById('feed').innerHTML = list.map(tweetCard).join('');
  document.querySelectorAll('[data-like]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.like; liked.has(id) ? liked.delete(id) : liked.add(id); renderFeed();
  }));
  document.querySelectorAll('[data-repost]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.repost; reposted.has(id) ? reposted.delete(id) : reposted.add(id); renderFeed();
  }));
  document.querySelectorAll('[data-zoom]').forEach(el => el.addEventListener('click', () => {
    const [id, i] = el.dataset.zoom.split(":");
    const p = POASTS.find(x => x.id === id);
    document.getElementById('lightboxArt').innerHTML = `<img src="${p.media[+i]}" alt="Full-size attached image" style="width:100%;height:auto;display:block"/>`;
    document.getElementById('lightboxCap').innerHTML = `@alexandr_wang · ${p.date} · <a href="${p.url}" target="_blank" rel="noopener" style="color:#f2a007">view original ↗</a>`;
    document.getElementById('lightbox').classList.add('open');
  }));
}

function spotlight(){
  const p = POASTS[Math.floor(Math.random() * POASTS.length)];
  document.getElementById('spotText').textContent = "“" + p.text.split("\n")[0].slice(0, 180) + "”";
  document.getElementById('spotMeta').textContent = p.cat + " · " + p.date + " · ♥ " + fmt(p.likes) + " · 👁 " + fmt(p.views);
}

document.getElementById('search').addEventListener('input', renderFeed);
document.getElementById('sort').addEventListener('change', renderFeed);
document.getElementById('spotBtn').addEventListener('click', spotlight);
document.getElementById('lightboxClose').addEventListener('click', () => document.getElementById('lightbox').classList.remove('open'));
document.getElementById('lightbox').addEventListener('click', e => { if (e.target.id === 'lightbox') e.target.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.getElementById('lightbox').classList.remove('open'); });

// Terminal typing in hero (respects reduced motion)
const LINES = [
  ['u', '$ muse "show me alex\'s real muse tweets"'],
  ['d', '  fetching x.com/alexandr_wang… found 20 verified bangers'],
  ['a', '→ attaching the actual photos & videos ✓'],
  ['a', '→ unhinged-o-meter calibrated ✓'],
  ['u', '$ muse "which one is the best"'],
  ['a', '→ "finding love." it is always "finding love."'],
];
const termEl = document.getElementById('termBody');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  termEl.innerHTML = LINES.map(([c,t]) => `<div class="${c}">${esc(t)}</div>`).join('');
} else {
  let li = 0, ci = 0, html = '';
  (function type(){
    if (li >= LINES.length) return;
    const [cls, text] = LINES[li];
    ci++;
    termEl.innerHTML = html + `<div class="${cls}">${esc(text.slice(0, ci))}</div>`;
    if (ci >= text.length) { html += `<div class="${cls}">${esc(text)}</div>`; li++; ci = 0; setTimeout(type, 260); }
    else setTimeout(type, 16);
  })();
}

renderTabs();
renderFeed();
spotlight();

// Count-up stats
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, target = +el.dataset.count;
    let cur = 0; const step = Math.max(1, Math.floor(target / 50));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur.toLocaleString();
    }, 24);
    io.unobserve(el);
  });
}, { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
