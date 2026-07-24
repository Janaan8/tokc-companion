/* ================= Round guide data ================= */
const STEPS = [
  { ph: 'year', phase: 'Start of the Year', title: 'Draw Cards', mode: 'Simultaneous',
    body: '<p>All players draw Faction Cards from their Deck up to their full Hand Size.</p><ul><li>Deck empty while drawing? You suffer <b>Attrition</b>: shuffle your Discard Pile into a new Deck, reduce Hand Size by 1 (min 3), then draw to your new Hand Size.</li></ul>',
    tip: 'Skip this whole phase in Round 1 — you already drew during setup.' },
  { ph: 'year', phase: 'Start of the Year', title: 'Determine Turn Order', mode: 'Group',
    body: '<p>Reorder the Order Track by Influence in each Supply: most Influence goes first.</p><ul><li>Ties: reverse the previous order of the tied players.</li><li>First player takes the Active Player Marker.</li></ul>',
    tip: 'Being last has perks: you see everything and you will place the Clash Markers in Summer.' },
  { ph: 'spring', phase: 'Spring', title: 'Place Bids', mode: 'Simultaneous',
    body: '<p>Everyone secretly chooses one card from hand and places it face-down: this is your <b>Bid</b> for a Kingdom Card.</p><ul><li>Only the card’s <b>Strength</b> will count (plus Bid-specific bonuses).</li></ul>',
    tip: 'Captains make strong bids. A 0-Strength bid is fine if you plan to take your card back.' },
  { ph: 'spring', phase: 'Spring', title: 'Resolve Bids', mode: 'Highest bid first',
    body: '<p>Reveal all Bids together. Highest total Bidding Strength resolves first (ties: higher on the Order Track first). Choose one:</p><ul><li><b>Take</b> a face-up Kingdom Card from the Great Road and Occupy it with your bidding card.</li><li><b>Steal</b> an opponent’s Kingdom Card — your Bid must exceed its Occupying card’s Strength. Their occupier returns to their hand.</li><li><b>Return</b> your bidding card to your hand.</li></ul><p>Then repopulate: discard the rightmost leftover card (two if nobody took one), slide right, refill, flip the deck’s top card.</p>',
    tip: 'Bold text on an acquired Kingdom Card is mandatory. Max two Kingdom Cards on your board.' },
  { ph: 'spring', phase: 'Spring', title: 'Place Heralds', mode: 'Turn order',
    body: '<p>Each player places their Herald on any <b>Location</b> (Locations can be shared).</p><ul><li>If you later win a Clash and pick your Herald’s Location: gain 1 Influence and steal 1 from each rival Herald there.</li></ul>',
    tip: 'A Herald is also a signal — sometimes a bluff about where you’ll commit.' },
  { ph: 'spring', phase: 'Spring', title: 'Place Cards Next to Regions', mode: 'Simultaneous',
    body: '<p>Everyone places one face-down Faction Card from hand next to <b>each</b> of the three Regions.</p><ul><li>Fewer than three cards in hand? Place yours before the others.</li><li>You may peek at your own cards anytime.</li></ul>',
    tip: 'Which side of the map you place them on doesn’t matter.' },
  { ph: 'spring', phase: 'Spring', title: 'Spring Action Step', mode: 'Turn order',
    body: '<p>Activate any number of your available Spring Actions and Commands, then pass the Active Player Marker.</p><ul><li>Common: place <b>Supporters</b> onto Regions (+1 Strength each in the first Clash there).</li><li>Tactics, Kingdom Cards and the Kingdom’s Favour may offer more.</li></ul>',
    tip: 'Supporters left on the Map at year’s end are lost to the Lost Pile — commit with a plan.' },
  { ph: 'summer', phase: 'Summer', title: 'Place Clash Markers', mode: 'Last player',
    body: '<p>The player <b>last</b> on the Order Track places Clash Markers I, II and III — one per Region. Regions resolve in that order.</p>',
    tip: 'Order matters: Flanking cards can only move to unresolved Regions.' },
  { ph: 'summer', phase: 'Summer', title: 'Clash: Reveal Cards', mode: 'Simultaneous',
    body: '<p>In the current Region, everyone flips their face-down cards face-up. These cards are now <b>Active</b>.</p>',
    tip: 'Repeat the five Clash steps for Region I, then II, then III.' },
  { ph: 'summer', phase: 'Summer', title: 'Clash: Day Action Step', mode: 'Turn order',
    body: '<p>Activate Day Actions and Commands on your Active cards here:</p><ul><li><b>Ambush</b> — add another face-down card from hand.</li><li><b>Retreat</b> — pull your cards (and Herald/Supporters) out.</li><li><b>Flank</b> — move a card to an unresolved Region.</li></ul><p>After everyone passes: reveal newly added face-down cards; their Actions/Commands may then be used in turn order.</p>',
    tip: 'Ruse! is built for this: scout the reveal, then reinforce or escape.' },
  { ph: 'summer', phase: 'Summer', title: 'Clash: Night Effects Step', mode: 'Simultaneous · mandatory',
    body: '<p>All Night Effects trigger automatically — no opting out.</p><ul><li><b>Deadly</b> Eliminates all opponents’ Active cards in the Clash (→ Lost Pile). Invulnerable cards ignore it; Resilient cards go to their discard instead.</li><li>Multiple Deadly cards eliminate each other simultaneously.</li></ul>',
    tip: 'Agents die to enemy Followers in the same Clash — check before you gloat.' },
  { ph: 'summer', phase: 'Summer', title: 'Clash: Tally & Rewards', mode: 'Group',
    body: '<p>Total Strength = your Active cards here + 1 per Supporter + bonuses. Highest wins.</p><ul><li><b>Tie?</b> Tied players (in turn order) may each add a face-down card → a fresh Clash between them (old cards don’t count). All pass = nobody wins this Region.</li><li><b>Winner:</b> pick ONE Location — Herald bonus first (1 Influence + steal 1 per rival Herald there), then the printed Location Reward.</li></ul>',
    tip: 'Win by the smallest margin that works — overkill is wasted strength.' },
  { ph: 'autumn', phase: 'Autumn', title: 'Autumn Action Step', mode: 'Turn order',
    body: '<p>On your turn, in any sequence:</p><ul><li><b>Govern</b> (once) — move a card with Votes from hand into a Council.</li><li><b>Journey</b> (once) — send a card with Lore icons from hand to the Lost Pile; gain that much Lore and immediately buy from your Site of Power if you wish.</li><li>Any Autumn Actions/Commands — <b>Deploy</b> a card into a Region for next Round, <b>Rally</b> Active cards home, Council Actions (Secrets, Oaths)…</li></ul>',
    tip: 'Pathfinder cards Journey to your discard instead of the Lost Pile — they come back.' },
  { ph: 'winter', phase: 'Winter', title: 'Winter Effects Step', mode: 'Simultaneous · mandatory',
    body: '<p>All Winter Effects trigger automatically (some Kingdom Cards and Deployed cards act here).</p>' },
  { ph: 'winter', phase: 'Winter', title: 'Cleanup & New Year', mode: 'Simultaneous',
    body: '<ol><li>Heralds return to Player Boards; Supporters on the Map go to the <b>Lost Pile</b>.</li><li>Clash Markers back to their stack.</li><li>Active cards without Influence on them → owners’ Discard Piles. Cards with Influence: remove 1 Influence, they stay.</li><li>Advance the Round Marker — or if this was the final Round, the game ends: most Influence wins (ties: Kingdom’s Favour, then Order Track).</li></ol>',
    tip: 'Then back to the top: draw cards and reorder the Order Track for the new year.' },
];

/* ================= Glossary ================= */
const GLOSSARY = [
  ['Action', 'Optional power with a circular border, used in its matching Action Step (Spring, Day or Autumn). Each Action once per Round per player; no limit on how many different Actions you use.'],
  ['Action Step', 'A step resolved in turn order where players activate Actions and Commands: Spring, Day (each Clash) and Autumn.'],
  ['Active', 'A Faction Card face-up next to a Region. Only Active cards count in Clashes and can use their Clash powers. Cards anywhere else are not Active.'],
  ['Active Player Marker', 'Held by whoever is currently acting in a turn-order step; passed along the Order Track and returned to the first player afterwards.'],
  ['Ambush', 'Day Command (optional): if this card is Active in the current Clash, add a face-down card from your hand to the Clash. Once per Clash per card.'],
  ['Archetype', 'Card type icon under the Strength: Heir, Captain, Cavalry, Champion, Follower, Agent, Ruse, Trader, War Machine. No rules by itself, but abilities may target it.'],
  ['Attrition', 'Trying to draw from an empty Deck: shuffle your Discard Pile into a new Deck, reduce Hand Size by 1 (min 3), draw to the new size. Lost Pile cards do not return.'],
  ['Bid', 'Spring: your face-down card competing for Kingdom Cards. Only its Strength counts. Highest resolves first; take a card, steal one, or take your card back.'],
  ['Burn', 'Remove a component from the game entirely — back to the box, no further effect.'],
  ['Clash', 'Summer battle in a Region: Reveal → Day Actions → Night Effects → Tally Strength. Winner claims rewards from one Location in the Region.'],
  ['Clash Markers', 'I–III markers placed by the last player on the Order Track, setting the order in which Regions resolve.'],
  ['Command', 'Bold-named power on Faction Cards: Ambush, Retreat, Flank, Rally, Deploy, Deadly. Each states its step; some work multiple times per Round.'],
  ['Council', 'Three seats of power: Relics (Influence via Herald Rewards), Secrets (Location Rewards without winning), Oaths (recover Supporters). Govern to add cards; their Votes fuel the Council’s ability.'],
  ['Deadly', 'Night Command (mandatory): Eliminates all opponents’ Active cards in the current Clash. Blocked by Invulnerable; softened by Resilient.'],
  ['Deck', 'Your face-down draw pile of Faction Cards. Hidden information — even to you.'],
  ['Deploy (X)', 'Command (optional): play this card from hand face-up next to a Region with X Influence from the Reserve on it. The Influence lets it survive Winter cleanup (losing 1 per year).'],
  ['Discard Pile', 'Your face-up, public pile. Reshuffled into a new Deck on Attrition. Reachable via the Necropolis and other effects.'],
  ['Effect', 'Mandatory power with a hexagonal border, triggering automatically in its Effects Step (Night or Winter). May trigger multiple times per Round.'],
  ['Eliminate', 'Remove a card from a Clash to the Lost Pile (usually via Deadly). Invulnerable prevents it; Resilient redirects to the owner’s Discard Pile.'],
  ['Exhausted', 'A used Tactic tile, flipped text-down. Only specific abilities flip it back.'],
  ['Faction Card', 'Your own deck’s cards — Basic (everyone has the same 14) and Advanced (unique, bought with Lore from your Site of Power).'],
  ['Flank', 'Day Command (optional): move this Active card to a different unresolved Region, joining that fight instead.'],
  ['Govern', 'Move one of your cards with Votes into a Council of choice (free once in Autumn from hand; also via the Castle and other effects). Its Votes power that Council.'],
  ['Great Road', 'The market row of four face-up Kingdom Cards, bid on each Spring, refilled from the Kingdom Deck.'],
  ['Hand Size', 'Your maximum hand, tracked by the marker (start ~6, min 3, max 8). Attrition lowers it; some effects raise it.'],
  ['Herald', 'Your envoy piece, placed on a Location each Spring. Winning a Clash at its Location: +1 Influence and steal 1 from each rival Herald there. Returns home in Winter.'],
  ['HQ Card', 'Site of Power card (HQ icon) bought with Lore. No Strength — it sits in your Supply granting a permanent ability.'],
  ['Influence', 'Victory points (crown-coin tokens). Most Influence in your Supply at game end wins. Also determines turn order each year.'],
  ['Invulnerable', 'Trait: immune to Elimination from any source.'],
  ['Journey', 'Send one of your cards with Lore icons to the Lost Pile; gain that much Lore, spendable immediately on your Site of Power. Free once in Autumn from hand.'],
  ['Kingdom Card', 'Neutral cards from the Great Road with powerful abilities. Occupied (guarded) by one of your Faction Cards; stealable if a rival out-bids the guard’s Strength.'],
  ['Kingdom’s Favour', 'Rotating disc from the Harvest Field granting a faction-specific Action with three uses. First end-game tiebreaker.'],
  ['Location', 'One of six reward spots — two per Region: Castle, Wilderness (Highlands); Harvest Field, Battlefield (Plateau); Shrine, Necropolis (Lowlands).'],
  ['Lore', 'Scroll tokens gained by Journeying. Spend (only at the moment you gain Lore) to buy Advanced and HQ cards. Empty Site of Power: leftover Lore converts to Influence at game end.'],
  ['Lost Pile', 'Shared public pile of Eliminated cards, Journeyed cards and spent Supporters. NOT reshuffled on Attrition — recovery needs specific effects.'],
  ['Occupy', 'A Faction Card slotted under a Kingdom Card as its guard. Its Strength defends against stealing; the card itself is inactive while guarding. When the Kingdom Card leaves, the guard returns to hand.'],
  ['Order Track', 'Turn order, reset each year by Influence (most first; ties reverse). Last player places the Clash Markers. Second end-game tiebreaker.'],
  ['Pathfinder', 'Trait: this card Journeys to your Discard Pile instead of the Lost Pile.'],
  ['Rally', 'Command (optional): return this card (Self) or up to X Active cards (Any X) to your hand.'],
  ['Region', 'A row of the Map — Highlands, Plateau or Lowlands. Each holds two Locations and one or more Clashes per Summer.'],
  ['Reserve', 'The communal bank of Influence and Lore tokens. You can’t steal from the Reserve.'],
  ['Resilient', 'Trait: when Eliminated, this card goes to your Discard Pile instead of the Lost Pile.'],
  ['Retreat', 'Day Command (optional): move any of your Active cards in this Region to hand, and return your Herald and Supporters here to your board.'],
  ['Round', 'One game year: Start of the Year → Spring → Summer → Autumn → Winter. The game lasts 4–6 Rounds (5 standard).'],
  ['Ruling rule', 'If card text contradicts the rulebook, the card wins.'],
  ['Site of Power', 'Your faction’s shop of five unique cards (Advanced + HQ), bought with Lore. Empty it and leftover Lore becomes Influence at game end (1 per 2).'],
  ['Steal (Influence/Lore)', 'Take tokens from an opponent’s Supply into yours. Only when an ability says so.'],
  ['Strength', 'The number deciding Bids and Clashes: card values + 1 per Supporter + bonuses.'],
  ['Suit', 'Kingdom Card/Council families: Coins (wealth), Masks (cunning), Oaths (war). No rules by themselves; hints at the card’s style.'],
  ['Supporter', 'Your five follower pieces. Placed on Regions in Spring Actions; +1 Strength each in the first Clash there. Left on the Map in Winter → Lost Pile.'],
  ['Supply', 'Your personal stash beside your board: Influence, Lore, HQ cards. Public information, but yours.'],
  ['Tactic', 'One of your four faction-unique tiles. Use it, flip it Exhausted (unless it has multiple charges). Unused Tactics at game end are wasted potential.'],
  ['Trait', 'Passive icon on a card, always in effect: Invulnerable, Resilient, Pathfinder.'],
  ['Votes', 'Gavel icons on cards. In a Council they power that Council’s ability.'],
];

/* ================= Tabs ================= */
const tabs = document.querySelectorAll('nav.tabs button');
function showPage(name) {
  tabs.forEach(b => b.classList.toggle('active', b.dataset.page === name));
  document.querySelectorAll('section.page').forEach(s => s.classList.remove('visible'));
  document.getElementById('page-' + name).classList.add('visible');
  window.scrollTo(0, 0);
}
tabs.forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.page)));

/* generic subnav toggling (play / rules / setup) */
function wireSubnav(navSel, prefix, keys) {
  document.querySelectorAll(navSel + ' button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll(navSel + ' button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const key = btn.dataset[prefix];
    keys.forEach(k => {
      const el = document.getElementById(prefix + '-' + k);
      if (el) el.style.display = (k === key) ? '' : 'none';
    });
  }));
}
wireSubnav('#page-play .subnav', 'play', ['round', 'learn']);
wireSubnav('#page-rules .subnav', 'rules', ['ref', 'gloss']);
wireSubnav('#page-setup .subnav', 'setup', ['standard', 'teaching', 'advanced']);

/* ================= Round guide ================= */
let stepIdx = parseInt(localStorage.getItem('tokc-step') || '0', 10);
if (isNaN(stepIdx) || stepIdx < 0 || stepIdx >= STEPS.length) stepIdx = 0;

function renderStep() {
  const s = STEPS[stepIdx];
  document.getElementById('phasebar').innerHTML = STEPS.map((x, i) =>
    `<span class="${i <= stepIdx ? 'on-' + x.ph : ''}"></span>`).join('');
  document.getElementById('stepbox').innerHTML = `
    <div class="stepcard">
      <div class="phase">${s.phase}</div>
      <h3>${s.title}</h3>
      <span class="mode">${s.mode}</span>
      <div class="body-txt">${s.body}</div>
      ${s.tip ? `<div class="tip">${s.tip}</div>` : ''}
    </div>`;
  document.getElementById('steppos').textContent = `Step ${stepIdx + 1} of ${STEPS.length}`;
  document.getElementById('prevstep').disabled = stepIdx === 0;
  document.getElementById('nextstep').textContent = stepIdx === STEPS.length - 1 ? 'New Round ↺' : 'Next →';
  localStorage.setItem('tokc-step', stepIdx);
}
document.getElementById('nextstep').addEventListener('click', () => {
  stepIdx = (stepIdx + 1) % STEPS.length;
  renderStep();
});
document.getElementById('prevstep').addEventListener('click', () => {
  if (stepIdx > 0) { stepIdx--; renderStep(); }
});
let pressTimer = null;
document.getElementById('prevstep').addEventListener('touchstart', () => {
  pressTimer = setTimeout(() => { stepIdx = 0; renderStep(); }, 700);
});
document.getElementById('prevstep').addEventListener('touchend', () => clearTimeout(pressTimer));
renderStep();

/* ================= Glossary ================= */
const glist = document.getElementById('glist');
function renderGlossary(letter) {
  const items = GLOSSARY.filter(([t]) => !letter || t[0].toUpperCase() === letter);
  glist.innerHTML = items.map(([t, d]) =>
    `<li id="gl-${t.replace(/\W+/g, '')}"><b>${t}</b><div class="d">${d}</div></li>`).join('');
}
const letters = [...new Set(GLOSSARY.map(([t]) => t[0].toUpperCase()))];
document.getElementById('azbar').innerHTML =
  '<button class="has" data-l="">All</button>' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l =>
    `<button class="${letters.includes(l) ? 'has' : ''}" data-l="${l}" ${letters.includes(l) ? '' : 'disabled'}>${l}</button>`).join('');
document.getElementById('azbar').addEventListener('click', e => {
  if (e.target.dataset.l !== undefined) renderGlossary(e.target.dataset.l);
});
renderGlossary('');

/* ================= Card library ================= */
let curSet = 'kingdom', curFac = '';
const grid = document.getElementById('cardgrid');
const countEl = document.getElementById('cardcount');
const facBar = document.getElementById('cardfacs');

function renderCards() {
  const list = CARDS.filter(c => c.set === curSet && (!curFac || c.fac === curFac));
  countEl.textContent = list.length + ' cards';
  grid.innerHTML = list.map(c => `
    <div class="card" data-id="${c.id}">
      <img loading="lazy" src="${c.img}" alt="${c.name}" onerror="this.style.display='none'">
      <div class="nm">${c.name}</div>
    </div>`).join('');
}
document.querySelectorAll('#cardsets button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('#cardsets button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  curSet = btn.dataset.set;
  facBar.style.display = (curSet === 'faction' || curSet === 'tactic') ? '' : 'none';
  renderCards();
}));
document.querySelectorAll('#cardfacs button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('#cardfacs button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  curFac = btn.dataset.fac;
  renderCards();
}));

const modal = document.getElementById('cardmodal');
function openCard(id) {
  const c = CARDS.find(x => x.id === id);
  if (!c) return;
  document.getElementById('cm-img').src = c.img;
  document.getElementById('cm-name').textContent = c.name;
  document.getElementById('cm-text').textContent = c.text;
  document.getElementById('cm-flavor').textContent = c.fl;
  modal.classList.add('open');
}
grid.addEventListener('click', e => {
  const el = e.target.closest('.card');
  if (el) openCard(el.dataset.id);
});
modal.addEventListener('click', e => {
  if (e.target === modal || e.target.classList.contains('close')) modal.classList.remove('open');
});
renderCards();

/* ================= Global search ================= */
const overlay = document.getElementById('searchoverlay');
const input = document.getElementById('searchinput');
const resultsEl = document.getElementById('searchresults');

const REF_INDEX = [...document.querySelectorAll('#rules-ref details')].map(d => ({
  id: d.id,
  title: d.querySelector('summary').textContent,
  text: d.querySelector('.body').textContent.replace(/\s+/g, ' ').trim(),
}));

function snippet(text, q) {
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return text.slice(0, 90) + '…';
  const start = Math.max(0, i - 40);
  const chunk = (start > 0 ? '…' : '') + text.slice(start, i + q.length + 60) + '…';
  return chunk.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
}

function doSearch() {
  const q = input.value.trim().toLowerCase();
  if (q.length < 2) { resultsEl.innerHTML = ''; return; }
  let html = '';

  const gl = GLOSSARY.filter(([t, d]) => (t + ' ' + d).toLowerCase().includes(q)).slice(0, 8);
  if (gl.length) {
    html += '<div class="sr-group">Keywords</div>' + gl.map(([t, d]) =>
      `<div class="sr" data-act="gloss" data-t="${t}"><b>${t}</b><div class="snip">${snippet(d, q)}</div></div>`).join('');
  }

  const refs = REF_INDEX.filter(r => (r.title + ' ' + r.text).toLowerCase().includes(q)).slice(0, 6);
  if (refs.length) {
    html += '<div class="sr-group">Rules reference</div>' + refs.map(r =>
      `<div class="sr" data-act="ref" data-t="${r.id}"><b>${r.title}</b><div class="snip">${snippet(r.text, q)}</div></div>`).join('');
  }

  const steps = STEPS.map((s, i) => ({ s, i }))
    .filter(({ s }) => (s.phase + ' ' + s.title + ' ' + s.body).toLowerCase().includes(q)).slice(0, 4);
  if (steps.length) {
    html += '<div class="sr-group">Round guide</div>' + steps.map(({ s, i }) =>
      `<div class="sr" data-act="step" data-t="${i}"><b>${s.phase} — ${s.title}</b></div>`).join('');
  }

  const cds = CARDS.filter(c => (c.name + ' ' + c.text + ' ' + c.fl).toLowerCase().includes(q)).slice(0, 12);
  if (cds.length) {
    html += '<div class="sr-group">Cards</div>' + cds.map(c =>
      `<div class="sr" data-act="card" data-t="${c.id}"><b>${c.name}</b><div class="snip">${snippet(c.text || c.fl || c.set, q)}</div></div>`).join('');
  }

  resultsEl.innerHTML = html || '<div class="sr"><b>No results</b><div class="snip">Try another word — e.g. "attrition", "deadly", "shrine".</div></div>';
}

input.addEventListener('input', doSearch);
document.getElementById('searchbtn').addEventListener('click', () => {
  overlay.classList.add('open');
  input.focus();
});
document.getElementById('searchclose').addEventListener('click', () => overlay.classList.remove('open'));

resultsEl.addEventListener('click', e => {
  const el = e.target.closest('.sr');
  if (!el || !el.dataset.act) return;
  const t = el.dataset.t;
  overlay.classList.remove('open');
  if (el.dataset.act === 'card') {
    showPage('cards');
    openCard(t);
  } else if (el.dataset.act === 'gloss') {
    showPage('rules');
    document.querySelector('#page-rules .subnav button[data-rules="gloss"]').click();
    renderGlossary('');
    const li = document.getElementById('gl-' + t.replace(/\W+/g, ''));
    if (li) li.scrollIntoView({ block: 'center' });
  } else if (el.dataset.act === 'ref') {
    showPage('rules');
    document.querySelector('#page-rules .subnav button[data-rules="ref"]').click();
    const d = document.getElementById(t);
    if (d) { d.open = true; d.scrollIntoView({ block: 'start' }); }
  } else if (el.dataset.act === 'step') {
    showPage('play');
    document.querySelector('#page-play .subnav button[data-play="round"]').click();
    stepIdx = parseInt(t, 10);
    renderStep();
  }
});

/* setup checklists */
document.querySelectorAll('.check li').forEach(li => {
  const cb = li.querySelector('input');
  li.addEventListener('click', e => {
    if (e.target !== cb) cb.checked = !cb.checked;
    li.classList.toggle('done', cb.checked);
  });
});
