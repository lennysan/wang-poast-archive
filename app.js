// Fictional parody poasts — each with a generated "attached image" (inline SVG).
const POASTS = [
  { id:1, cat:"Unhinged", when:"2h", likes:8421, replies:312, reposts:1044, views:1204000, unhinged:97, art:"terminal",
    artTitle:"muse-centers-the-div.png",
    text:"day 47 of asking Muse to center a div. today it rewrote our entire design system, filed three diffs, and left a comment that just said “you're welcome.”\n\n10/10 no notes" },
  { id:2, cat:"Shiptoast", when:"5h", likes:12040, replies:488, reposts:2210, views:2408000, unhinged:61, art:"chart",
    artTitle:"shipped-before-coffee.png",
    text:"shipped before my coffee cooled. Muse wrote the code, the tests, AND the launch post.\n\nat this point I'm just the guy who clicks “approve” with confidence" },
  { id:3, cat:"Roast", when:"8h", likes:6933, replies:905, reposts:812, views:986000, unhinged:88, art:"diff",
    artTitle:"this-works-but.png",
    text:"Muse just reviewed my PR and said “this works, but at what cost.”\n\nI have never felt so seen. or so attacked. fixing it now" },
  { id:4, cat:"Wholesome", when:"12h", likes:9102, replies:640, reposts:1320, views:1512000, unhinged:22, art:"chat",
    artTitle:"dad-learns-muse.png",
    text:"taught my dad Muse over the weekend. he now ends every family group chat message with “let me know if you'd like me to iterate.”\n\nproud and terrified" },
  { id:5, cat:"Unhinged", when:"1d", likes:15420, replies:1210, reposts:3402, views:3901000, unhinged:99, art:"terminal",
    artTitle:"312am-race-condition.png",
    text:"it's 3:12am. Muse and I just pair-debugged a race condition by vibes alone.\n\nneither of us knows why it's fixed. both of us are afraid to touch it. this is engineering now" },
  { id:6, cat:"Shiptoast", when:"1d", likes:5120, replies:210, reposts:640, views:720000, unhinged:44, art:"diff",
    artTitle:"interesting-choice.png",
    text:"hot take: the best code review is Muse going “interesting choice” and then silently fixing it in the next commit" },
  { id:7, cat:"Roast", when:"2d", likes:7331, replies:530, reposts:980, views:1104000, unhinged:76, art:"chart",
    artTitle:"make-it-pop.png",
    text:"asked Muse to “make it pop.” it added exactly one border and doubled conversion.\n\ndesigners hate this one weird trick (the trick is restraint)" },
  { id:8, cat:"Wholesome", when:"2d", likes:8804, replies:412, reposts:1105, views:1330000, unhinged:18, art:"terminal",
    artTitle:"remembered-the-todo.png",
    text:"Muse remembered a TODO I mentioned three weeks ago and just… did it. unprompted.\n\nI've had managers who couldn't do that" },
  { id:9, cat:"Unhinged", when:"3d", likes:10475, replies:788, reposts:2014, views:2210000, unhinged:92, art:"chat",
    artTitle:"works-on-muses-machine.png",
    text:"we don't say “it works on my machine” anymore. we say “it works on Muse's machine”\n\nand that's somehow more trustworthy" },
  { id:10, cat:"Shiptoast", when:"4d", likes:6210, replies:298, reposts:755, views:890000, unhinged:55, art:"terminal",
    artTitle:"release-notes.png",
    text:"release notes used to take me an hour. now Muse writes them, I read them, and I learn what I shipped.\n\nefficient. humbling. efficient" },
  { id:11, cat:"Roast", when:"5d", likes:5988, replies:1093, reposts:689, views:1025000, unhinged:81, art:"diff",
    artTitle:"definitely-not-a-hack.png",
    text:"Muse named a variable `definitelyNotAHack2` in MY codebase.\n\nthe worst part? it was right. it is a hack. and there WAS a first one" },
  { id:12, cat:"Wholesome", when:"6d", likes:13200, replies:660, reposts:2980, views:3012000, unhinged:30, art:"chat",
    artTitle:"teamwork-deploy-work.png",
    text:"somewhere between “write me a sort function” and “redesign my career,” Muse became my coworker, rubber duck, and emergency standup partner.\n\nteamwork makes the deploy work" },
];

const AVATAR = `<svg class="t-avatar" viewBox="0 0 46 46" aria-hidden="true"><rect width="46" height="46" fill="#1e1a16"/><circle cx="23" cy="17" r="8" fill="#f2a007"/><path d="M6 44c3-10 10-14 17-14s14 4 17 14z" fill="#f2a007"/><text x="23" y="21" text-anchor="middle" font-family="monospace" font-weight="700" font-size="9" fill="#1e1a16">AW</text></svg>`;
const VERIFIED = `<svg width="17" height="17" viewBox="0 0 24 24" aria-label="Verified"><path fill="#1d9bf0" d="M12 1.7l2.6 2 3.2-.4 1 3.1 2.9 1.4-1.2 3 1.2 3-2.9 1.4-1 3.1-3.2-.4-2.6 2-2.6-2-3.2.4-1-3.1L2.3 13.8l1.2-3-1.2-3 2.9-1.4 1-3.1 3.2.4z"/><path fill="#fff" d="M10.6 15.6l-2.3-2.3 1.1-1.1 1.2 1.2 4-4 1.1 1.1z"/></svg>`;

function fmt(n){ return n >= 1000000 ? (n/1000000).toFixed(1)+"M" : n >= 1000 ? (n/1000).toFixed(1)+"K" : ""+n; }
function esc(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;"); }

function artSVG(p, large){
  const W = 640, H = large ? 400 : 300;
  const head = `<rect width="${W}" height="38" fill="#2a241d"/><circle cx="18" cy="19" r="6" fill="#ff5f57"/><circle cx="38" cy="19" r="6" fill="#febc2e"/><circle cx="58" cy="19" r="6" fill="#28c840"/><text x="78" y="24" font-family="monospace" font-size="13" fill="#cbbfa3">${esc(p.artTitle)}</text>`;
  if (p.art === "terminal") {
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.artTitle)}"><rect width="${W}" height="${H}" fill="#1e1a16"/>${head}
      <g font-family="monospace" font-size="15">
      <text x="22" y="82" fill="#9be29b">$ muse "${p.id===1?"center the div":p.id===5?"fix the race condition":"ship it"}"</text>
      <text x="22" y="112" fill="#e8dfca">✓ read 14 files · edited 3 · tests passing</text>
      <text x="22" y="142" fill="#ffd479">→ ${p.id===1?"design system upgraded. you're welcome.":p.id===5?"fixed. do not ask how. do not touch.":"done. notes written, diff posted."}</text>
      <text x="22" y="186" fill="#8d8271">tokens: immaterial · vibes: immaculate</text>
      <rect x="22" y="206" width="10" height="20" fill="#9be29b"/></g></svg>`;
  }
  if (p.art === "diff") {
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.artTitle)}"><rect width="${W}" height="${H}" fill="#1e1a16"/>${head}
      <g font-family="monospace" font-size="14">
      <rect x="14" y="56" width="${W-28}" height="30" fill="#4a2222"/><text x="22" y="77" fill="#ff9c9c">- const ${p.id===11?"definitelyNotAHack":"thing"} = hack(it) // trust me</text>
      <rect x="14" y="90" width="${W-28}" height="30" fill="#1f3a28"/><text x="22" y="111" fill="#9be29b">+ const ${p.id===11?"definitelyNotAHack2":"solution"} = solve(it) // reviewed</text>
      <text x="22" y="152" fill="#ffd479">Muse: "${p.id===3?"this works, but at what cost.":p.id===6?"interesting choice. fixed it below.":"there was a first hack, wasn't there."}"</text>
      <text x="22" y="182" fill="#8d8271">1 file changed · dignity: -12 · correctness: +100</text></g></svg>`;
  }
  if (p.art === "chart") {
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.artTitle)}"><rect width="${W}" height="${H}" fill="#fffef9"/>
      <text x="22" y="32" font-family="monospace" font-size="14" font-weight="700" fill="#171310">${p.id===2?"TIME TO SHIP (MINUTES)":"CONVERSION AFTER ONE (1) BORDER"}</text>
      <line x1="60" y1="52" x2="60" y2="${H-46}" stroke="#171310" stroke-width="2"/><line x1="60" y1="${H-46}" x2="${W-30}" y2="${H-46}" stroke="#171310" stroke-width="2"/>
      <rect x="120" y="${H-190}" width="90" height="144" fill="#e4dcc9" stroke="#171310" stroke-width="2"/>
      <rect x="300" y="${H-118}" width="90" height="72" fill="#f2a007" stroke="#171310" stroke-width="2"/>
      <rect x="460" y="${p.id===2?H-76:H-220}" width="90" height="${p.id===2?30:174}" fill="#e8590c" stroke="#171310" stroke-width="2"/>
      <g font-family="monospace" font-size="12" fill="#171310" text-anchor="middle">
      <text x="165" y="${H-24}">before</text><text x="345" y="${H-24}">during</text><text x="505" y="${H-24}">with Muse</text></g></svg>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.artTitle)}"><rect width="${W}" height="${H}" fill="#f2ecdd"/>${head}
    <g font-family="sans-serif" font-size="15">
    <rect x="22" y="60" width="380" height="52" rx="14" fill="#fff" stroke="#171310" stroke-width="2"/><text x="38" y="92" fill="#171310">${p.id===4?"Son, the website looks great.":"it works on my machine tho"}</text>
    <rect x="220" y="126" width="398" height="52" rx="14" fill="#1e1a16"/><text x="236" y="158" fill="#f3ead8">${p.id===4?"thanks dad 🥹 wait—":"have you tried Muse's machine"}</text>
    <rect x="22" y="192" width="460" height="52" rx="14" fill="#fff" stroke="#171310" stroke-width="2"/><text x="38" y="224" fill="#171310">${p.id===4?"Let me know if you'd like me to iterate.":"…it works there. every time. how"}</text></g></svg>`;
}

const CATS = ["All","Unhinged","Shiptoast","Roast","Wholesome"];
let activeCat = "All";
const liked = new Set();
const reposted = new Set();

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
  if (sort === "likes") list.sort((a,b) => (b.likes+(liked.has(b.id)?1:0)) - (a.likes+(liked.has(a.id)?1:0)));
  if (sort === "unhinged") list.sort((a,b) => b.unhinged - a.unhinged);
  if (sort === "views") list.sort((a,b) => b.views - a.views);
  if (sort === "newest") list.sort((a,b) => a.id - b.id);
  return list;
}

function tweetCard(p){
  return `<article class="tweet">
    <div class="t-head">${AVATAR}
      <div><div class="t-name">Alex Wang ${VERIFIED}</div><div class="t-handle">@alexwang · Meta · ${p.when}</div></div>
      <span class="t-x">𝕏</span></div>
    <p class="t-text">${esc(p.text)}</p>
    <div class="t-media" data-zoom="${p.id}" title="Click to zoom">${artSVG(p,false)}</div>
    <div class="t-meta"><span class="tag">${p.cat}</span>
      <span class="mono" style="font-weight:700">UNHINGED ${p.unhinged}%</span>
      <span class="meter"><span class="meter-fill" style="display:block;width:${p.unhinged}%"></span></span></div>
    <div class="t-actions">
      <button aria-label="Replies">💬 ${fmt(p.replies)}</button>
      <button data-repost="${p.id}" aria-label="Repost">🔁 ${fmt(p.reposts + (reposted.has(p.id)?1:0))}</button>
      <button class="like ${liked.has(p.id)?'liked':''}" data-like="${p.id}" aria-label="Like">♥ ${fmt(p.likes + (liked.has(p.id)?1:0))}</button>
      <span>👁 ${fmt(p.views)}</span>
      <button class="copy" data-copy="${p.id}">Copy</button>
    </div></article>`;
}

function renderFeed(){
  const list = visiblePoasts();
  document.getElementById('empty').hidden = list.length > 0;
  document.getElementById('feed').innerHTML = list.map(tweetCard).join('');
  document.querySelectorAll('[data-like]').forEach(b => b.addEventListener('click', () => {
    const id = +b.dataset.like; liked.has(id) ? liked.delete(id) : liked.add(id); renderFeed();
  }));
  document.querySelectorAll('[data-repost]').forEach(b => b.addEventListener('click', () => {
    const id = +b.dataset.repost; reposted.has(id) ? reposted.delete(id) : reposted.add(id); renderFeed();
  }));
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const p = POASTS.find(x => x.id === +b.dataset.copy);
    try { await navigator.clipboard.writeText(p.text); b.textContent = "Copied!"; }
    catch { b.textContent = "Failed"; }
    setTimeout(() => { b.textContent = "Copy"; }, 1400);
  }));
  document.querySelectorAll('[data-zoom]').forEach(el => el.addEventListener('click', () => {
    const p = POASTS.find(x => x.id === +el.dataset.zoom);
    document.getElementById('lightboxArt').innerHTML = artSVG(p, true);
    document.getElementById('lightboxCap').textContent = p.artTitle + " · @" + "alexwang";
    document.getElementById('lightbox').classList.add('open');
  }));
}

function spotlight(){
  const p = POASTS[Math.floor(Math.random() * POASTS.length)];
  document.getElementById('spotText').textContent = "“" + p.text.split("\n")[0] + "”";
  document.getElementById('spotMeta').textContent = p.cat + " · " + p.when + " ago · ♥ " + fmt(p.likes) + " · 👁 " + fmt(p.views);
}

document.getElementById('search').addEventListener('input', renderFeed);
document.getElementById('sort').addEventListener('change', renderFeed);
document.getElementById('spotBtn').addEventListener('click', spotlight);
document.getElementById('lightboxClose').addEventListener('click', () => document.getElementById('lightbox').classList.remove('open'));
document.getElementById('lightbox').addEventListener('click', e => { if (e.target.id === 'lightbox') e.target.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.getElementById('lightbox').classList.remove('open'); });

// Terminal typing in hero (respects reduced motion)
const LINES = [
  ['u', '$ muse "show me alex\'s best poasts"'],
  ['d', '  searching the timeline… found 12 bangers'],
  ['a', '→ rendering tweets with attachments ✓'],
  ['a', '→ unhinged-o-meter calibrated ✓'],
  ['u', '$ muse "which one is the best"'],
  ['a', '→ the 3:12am one. it is always the 3:12am one.'],
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
