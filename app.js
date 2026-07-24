/* ================= Round guide data ================= */
const STEPS = [
  { ph: 'year', phase: 'Start of the Year', title: 'Draw Cards', mode: 'Simultaneous',
    body: '<p>All players draw Faction Cards from their Deck up to their full Hand Size.</p><ul><li>Deck empty while drawing? You suffer <b>Attrition</b>: shuffle your Discard Pile into a new Deck, reduce Hand Size by 1 (min 3), then draw to your new Hand Size.</li></ul>',
    tip: 'Skip this whole phase in Round 1 — you already drew during setup.' },
  { ph: 'year', phase: 'Start of the Year', title: 'Determine Turn Order', mode: 'Together',
    body: '<p>Reorder the Order Track by Influence in each Supply: most Influence goes first.</p><ul><li>Ties: reverse the previous order of the tied players.</li><li>First player takes the Active Player Marker.</li></ul>',
    tip: 'You have seen where Heralds and Supporters were placed, and you set Clash order.' },
  { ph: 'spring', phase: 'Spring', title: 'Place Bids', mode: 'Simultaneous',
    body: '<p>Everyone secretly chooses one card from hand and places it face-down: this is your <b>Bid</b> for a Kingdom Card.</p><ul><li>Only the card’s <b>Strength</b> will count (plus Bid-specific bonuses).</li></ul>',
    tip: 'Captains make strong bids. A 0-Strength bid is fine if you plan to take your card back.' },
  { ph: 'spring', phase: 'Spring', title: 'Resolve Bids', mode: 'Bidding order',
    body: '<p>Reveal all Bids together. Highest total Bidding Strength resolves first (ties: higher on the Order Track first). Choose one:</p><ul><li><b>Take</b> a face-up Kingdom Card from the Great Road and Occupy it with your bidding card.</li><li><b>Steal</b> an opponent’s Kingdom Card — your Bid must exceed its Occupying card’s Strength. Their occupier returns to their hand.</li><li><b>Return</b> your bidding card to your hand.</li></ul><p>Then repopulate: discard the rightmost leftover card (two if nobody took one), slide right, refill, flip the deck’s top card.</p>',
    tip: 'Bold text on an acquired Kingdom Card is mandatory. Max two Kingdom Cards on your board.' },
  { ph: 'spring', phase: 'Spring', title: 'Place Heralds', mode: 'Turn order',
    body: '<p>Each player places their Herald on any <b>Location</b> (Locations can be shared).</p><ul><li>If you win and choose this Location: gain 1 Influence and steal 1 from each rival Herald there.</li></ul>',
    tip: 'A Herald is also a signal — sometimes a bluff about where you’ll commit.' },
  { ph: 'spring', phase: 'Spring', title: 'Place Cards Next to Regions', mode: 'Simultaneous',
    body: '<p>Everyone places one face-down Faction Card from hand next to <b>each</b> of the three Regions.</p><ul><li>Fewer than three cards in hand? Place yours before the others. If multiple players do, they place in turn order.</li><li>You may peek at your own cards anytime.</li></ul>',
    tip: 'Which side of the map you place them on doesn’t matter.' },
  { ph: 'spring', phase: 'Spring', title: 'Spring Action Step', mode: 'Turn order',
    body: '<p>Activate any number of available Spring Actions and Commands from your Tactics, Kingdom Cards, Player Board and eligible Faction Cards, then pass the Active Player Marker.</p><ul><li>Common: place <b>Supporters</b> onto Regions (+1 Strength each in the first Clash there).</li><li>The Kingdom’s Favour may offer another Action.</li></ul>',
    tip: 'Supporters left on the Map at year’s end are lost to the Lost Pile — commit with a plan.' },
  { ph: 'summer', phase: 'Summer', title: 'Place Clash Markers', mode: 'Last on Order Track',
    body: '<p>The player <b>last</b> on the Order Track places Clash Markers I, II and III — one per Region. Regions resolve in that order.</p>',
    tip: 'Order matters: Flanking cards can only move to unresolved Regions.' },
  { ph: 'summer', phase: 'Summer', title: 'Clash: Reveal Cards', mode: 'Simultaneous',
    body: '<p>In the current Region, everyone flips their face-down cards face-up. These cards are now <b>Active</b>.</p>',
    tip: 'Repeat Reveal, Day, Night, Tally and Claim Rewards for Region I, then II, then III.' },
  { ph: 'summer', phase: 'Summer', title: 'Clash: Day Action Step', mode: 'Turn order',
    body: '<p>Activate any available Day Actions and Commands. Actions/Commands printed on Faction Cards are usable only when that card is Active in the current Clash.</p><ul><li><b>Ambush</b> — add another face-down card from hand.</li><li><b>Retreat</b> — return any number of your Active cards here. You may also return your Herald and any number of your Supporters in this Region.</li><li><b>Flank</b> — move a card to an unresolved Region.</li></ul><p>After everyone passes: reveal newly added face-down cards; their Actions/Commands may then be used in turn order.</p>',
    tip: 'Ruse! is built for this: scout the reveal, then reinforce or escape.' },
  { ph: 'summer', phase: 'Summer', title: 'Clash: Night Effects Step', mode: 'Simultaneous · mandatory',
    body: '<p>Trigger all Night Effects and mandatory Night Commands simultaneously.</p><ul><li><b>Deadly</b> Eliminates all opponents’ Active cards in the Clash (→ Lost Pile). Invulnerable cards ignore it; Resilient cards go to their discard instead.</li><li>Multiple Deadly cards eliminate each other simultaneously.</li></ul>',
    tip: 'Watch out with the basic Agent card: it has Deadly, but the card itself says it is Eliminated when an opponent has a Follower in the same Clash. So a single enemy Follower kills your Agent, while the Follower (Invulnerable) survives.' },
  { ph: 'summer', phase: 'Summer', title: 'Clash: Tally & Rewards', mode: 'Together',
    body: '<p>Total Strength = your Active cards here + 1 per Supporter + bonuses. Highest wins.</p><ul><li><b>Tie?</b> Tied players (in turn order) may each add a face-down card → a fresh Clash between them. Previous cards, Supporters, and previously resolved Actions/Effects/Commands/abilities do not carry into the new Clash unless stated otherwise. All pass = nobody wins this Region.</li><li><b>Winner:</b> pick ONE Location — Herald bonus first (1 Influence + steal 1 per rival Herald there), then the printed Location Reward.</li></ul>',
    tip: 'Win by the smallest margin that works — overkill is wasted strength.' },
  { ph: 'autumn', phase: 'Autumn', title: 'Autumn Action Step', mode: 'Turn order',
    body: '<p>On your turn, in any sequence:</p><ul><li>Your standard once-per-Autumn <b>Govern</b> — move a card with Votes from hand into a Council.</li><li>Your standard once-per-Autumn <b>Journey</b> — send a card with Lore icons from hand to the Lost Pile; gain that much Lore and immediately buy from your Site of Power if you wish.</li><li>Any Autumn Actions/Commands — <b>Deploy</b> a card into a Region for next Round, <b>Rally</b> Active cards home, Council Actions (Secrets, Oaths)…</li></ul>',
    tip: 'A Pathfinder goes to your Discard Pile when it Journeys, so it can return on later Attrition.' },
  { ph: 'winter', phase: 'Winter', title: 'Winter Effects Step', mode: 'Simultaneous · mandatory',
    body: '<p>All Winter Effects trigger automatically (some Kingdom Cards and Deployed cards act here).</p>' },
  { ph: 'winter', phase: 'Winter', title: 'Cleanup & New Year', mode: 'Simultaneous',
    body: '<ol><li>Heralds return to Player Boards; Supporters on the Map go to the <b>Lost Pile</b>.</li><li>Clash Markers back to their stack.</li><li>Active cards without Influence on them → owners’ Discard Piles. Cards with Influence: remove 1 Influence, they stay.</li><li>Advance the Round Marker — or if this was the final Round, score: if your Site of Power is empty, gain 1 Influence per 2 Lore in your Supply. Most Influence wins (ties: Kingdom’s Favour, then Order Track).</li></ol>',
    tip: 'Then back to the top: draw cards and reorder the Order Track for the new year.' },
];

/* ================= Glossary ================= */
const GLOSSARY = [
  ['Action', 'Optional power with a circular border, used in its matching Action Step (Spring, Day or Autumn). Each Action once per Round per player; no limit on how many different Actions you use.'],
  ['Action Step', 'A step resolved in turn order where players activate Actions and Commands: Spring, Day (each Clash) and Autumn.'],
  ['Active', 'A Faction Card face-up next to a Region. Only Active cards count in Clashes and can use their Clash powers. Cards anywhere else are not Active.'],
  ['Active Player Marker', 'Held by whoever is currently acting in a turn-order step; passed along the Order Track and returned to the first player afterwards.'],
  ['Ambush', 'Day Command (optional): if this card is Active in the current Clash, add a face-down card from your hand to the Clash. Once per Clash per card.'],
  ['Archetype', 'Card type icon under the Strength: Heir, Captain, Cavalry, Champion, Follower, Agent, Ruse, Trader, War Machine. No rules by itself, but abilities may target it.', 'h'],
  ['Attrition', 'Trying to draw from an empty Deck: shuffle your Discard Pile into a new Deck, reduce Hand Size by 1 (min 3), draw to the new size. Lost Pile cards do not return.'],
  ['Bid', 'Spring: your face-down card competing for Kingdom Cards. Its printed/gained Strength plus abilities that explicitly affect Bids count; other card information is ignored. Highest resolves first; take a card, steal one, or take your card back.', 'v'],
  ['Burn', 'Remove a component from the game entirely — back to the box, no further effect.'],
  ['Clash', 'Summer battle in a Region: Reveal → Day Actions → Night Effects → Tally Strength. Winner claims rewards from one Location in the Region.'],
  ['Clash Markers', 'I–III markers placed by the last player on the Order Track, setting the order in which Regions resolve.'],
  ['Command', 'Bold-named power on Faction Cards: Ambush, Retreat, Flank, Rally, Deploy, Deadly. Each states its step; some work multiple times per Round.'],
  ['Council', 'Three seats of power: Relics (Influence via Herald Rewards), Secrets (Location Rewards without winning), Oaths (recover Supporters). Govern to add cards; their Votes fuel the Council’s ability. At Oaths, you need at least 1 Vote to use its Action or qualify for most Votes.', 'M'],
  ['Deadly', 'Night Command (mandatory): Eliminates all opponents’ Active cards in the current Clash. Blocked by Invulnerable; softened by Resilient.'],
  ['Deck', 'Your face-down draw pile of Faction Cards. Hidden information — even to you.'],
  ['Deploy (X)', 'Command (optional): play this card from hand face-up next to a Region with X Influence from the Reserve on it. The Influence lets it survive Winter cleanup (losing 1 per year).'],
  ['Discard Pile', 'Your face-up, public pile. Reshuffled into a new Deck on Attrition. Reachable via the Necropolis and other effects.'],
  ['Effect', 'Mandatory power with a hexagonal border, triggering automatically in its Effects Step (Night or Winter). May trigger multiple times per Round.'],
  ['Eliminate', 'Remove a card from a Clash to the Lost Pile (usually via Deadly). Invulnerable prevents it; Resilient redirects to the owner’s Discard Pile.'],
  ['Exhausted', 'A Tactic on its text-down side. Most exhaust after use; multi-use Tactics exhaust only as printed.'],
  ['Faction Card', 'Your own deck’s cards — Basic (everyone has the same 14) and Advanced (unique, bought with Lore from your Site of Power).', 'x'],
  ['Flank', 'Day Command (optional): move this Active card to a different unresolved Region, joining that fight instead.'],
  ['Govern', 'Move one of your cards with Votes into a Council of choice (free once in Autumn from hand; also via the Castle and other effects). Its Votes power that Council.'],
  ['Great Road', 'The market row of four face-up Kingdom Cards, bid on each Spring, refilled from the Kingdom Deck.'],
  ['Hand Size', 'Your maximum hand, tracked by the marker (start 6, min 3, max 8). Attrition lowers it; some effects raise it.'],
  ['Herald', 'Your envoy piece, placed on a Location each Spring. Winning a Clash at its Location: +1 Influence and steal 1 from each rival Herald there. Returns home in Winter.', 'H'],
  ['HQ Card', 'Site of Power card (HQ icon) bought with Lore. No Strength — it sits in your Supply granting a permanent ability.', 'q'],
  ['Influence', 'Victory points (crown-coin tokens). Most Influence in your Supply at game end wins. Also determines turn order each year.', 'i'],
  ['Invulnerable', 'Trait: immune to Elimination from any source.', 'I'],
  ['Journey', 'Send one of your cards with Lore icons to the Lost Pile; gain that much Lore, spendable immediately on your Site of Power. Free once in Autumn from hand.', 'p'],
  ['Kingdom Card', 'Neutral cards from the Great Road with powerful abilities. Occupied (guarded) by one of your Faction Cards; stealable if a rival out-bids the guard’s Strength.'],
  ['Kingdom’s Favour', 'Rotating disc from the Harvest Field granting a faction-specific Action with three uses. First end-game tiebreaker.', 'B'],
  ['Location', 'One of six reward spots — two per Region: Castle, Wilderness (Highlands); Harvest Field, Battlefield (Plateau); Shrine, Necropolis (Lowlands).'],
  ['Lore', 'Scroll tokens gained by Journeying. Spend (only at the moment you gain Lore) to buy Advanced and HQ cards. Empty Site of Power: leftover Lore converts to Influence at game end.', 'p'],
  ['Lost Pile', 'Shared public pile of Eliminated cards, Journeyed cards and spent Supporters. NOT reshuffled on Attrition — recovery needs specific effects.'],
  ['Occupy', 'A Faction Card slotted under a Kingdom Card as its guard. Its Strength defends against stealing; the card itself is inactive while guarding. When the Kingdom Card leaves, the guard returns to hand.'],
  ['Order Track', 'Turn order. Set during Setup for Round 1; reset in each later Round by Influence (most first; ties reverse). Last player places the Clash Markers. Second end-game tiebreaker.'],
  ['Pathfinder', 'Trait: this card Journeys to your Discard Pile instead of the Lost Pile.', 'P'],
  ['Rally', 'Command (optional): if this card is Active, return this card (Self) or up to X Active cards (Any X) to your hand.'],
  ['Region', 'A row of the Map — Highlands, Plateau or Lowlands. Each holds two Locations and one or more Clashes per Summer.'],
  ['Reserve', 'The communal bank of Influence and Lore tokens. You can’t steal from the Reserve.'],
  ['Resilient', 'Trait: when Eliminated, this card goes to your Discard Pile instead of the Lost Pile.', 'R'],
  ['Retreat', 'Day Command (optional): move any number of your Active cards in this Region to hand. You may also return your Herald and any number of your Supporters in this Region to your board.'],
  ['Round', 'One game year: Start of the Year → Spring → Summer → Autumn → Winter. The game lasts 4–6 Rounds (5 standard).'],
  ['Ruling rule', 'If text on a card or component contradicts the rulebook, that text takes precedence.'],
  ['Site of Power', 'Your faction’s shop of five unique cards (Advanced + HQ), bought with Lore. Empty it and leftover Lore becomes Influence at game end (1 per 2).', 'q'],
  ['Steal (Influence/Lore)', 'Take tokens from an opponent’s Supply into yours. Only when an ability says so.'],
  ['Strength', 'Bidding Strength = your Bid card’s printed/gained Strength plus Bid-specific modifiers. Clash Strength = relevant Active cards + 1 per relevant Supporter + Clash modifiers.'],
  ['Suit', 'Kingdom Card/Council families: Coins (wealth), Masks (cunning), Oaths (war). No rules by themselves; hints at the card’s style.', 'OMF'],
  ['Supporter', 'Your five follower pieces. Placed on Regions in Spring Actions; +1 Strength each in the first Clash there. Left on the Map in Winter → Lost Pile.', 'u'],
  ['Supply', 'Your personal stash beside your board: Influence, Lore, HQ cards. Public information, but yours.'],
  ['Tactic', 'One of your four faction-unique tiles. Use it, flip it Exhausted (unless it has multiple charges). Unused Tactics at game end are wasted potential.'],
  ['Trait', 'Passive icon on a card, always in effect: Invulnerable, Resilient, Pathfinder.', 'IRP'],
  ['Votes', 'Gavel icons on cards. In a Council they power that Council’s ability.', 'v'],
];

/* ================= Icon decoration =================
   Game terms that appear on cards as an icon (not as a word)
   get their official icon appended after the word. */
const ICON_TERMS = [
  ["Kingdom’s Favour", 'B'], ["Kingdom's Favour", 'B'],
  ['War Machines', 'w'], ['War Machine', 'w'],
  ['Lore Cost', 'L'],
  ['Invulnerable', 'I'], ['Resilient', 'R'], ['Pathfinder', 'P'],
  ['Influence', 'i'], ['Lore', 'p'],
  ['Votes', 'v'], ['Vote', 'v'],
  ['Heirs', 'h'], ['Heir', 'h'],
  ['Captains', 'c'], ['Captain', 'c'],
  ['Champions', 'x'], ['Champion', 'x'],
  ['Agents', 'a'], ['Agent', 'a'],
  ['Followers', 'f'], ['Follower', 'f'],
  ['Cavalry', 'm'],
  ['Traders', 't'], ['Trader', 't'],
  ['Ruse!', 'r'], ['Ruse', 'r'],
  ['Heralds', 'H'], ['Herald', 'H'],
  ['Supporters', 'u'], ['Supporter', 'u'],
  ['HQ', 'q'],
];
const ICON_RE = new RegExp('(?<![\\w’\'])(' + ICON_TERMS.map(([t]) =>
  t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![\\w’\'])', 'g');
const ICON_MAP = Object.fromEntries(ICON_TERMS);

function iconify(root, skipSel) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const targets = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement.closest('.ic, .iconified-term')) continue;
    if (skipSel && node.parentElement.closest(skipSel)) continue;
    if (ICON_RE.test(node.nodeValue)) targets.push(node);
    ICON_RE.lastIndex = 0;
  }
  for (const textNode of targets) {
    const frag = document.createDocumentFragment();
    let last = 0;
    const s = textNode.nodeValue;
    for (const m of s.matchAll(ICON_RE)) {
      frag.appendChild(document.createTextNode(s.slice(last, m.index)));
      const decorated = document.createElement('span');
      decorated.className = 'iconified-term';
      decorated.appendChild(document.createTextNode(m[0] + ' '));
      const ic = document.createElement('span');
      ic.className = 'ic';
      ic.textContent = ICON_MAP[m[1]];
      decorated.appendChild(ic);
      frag.appendChild(decorated);
      last = m.index + m[0].length;
      // skip the space replaced by the decorated wrapper
      if (s[last] === ' ') last++;
      frag.appendChild(document.createTextNode(' '));
    }
    frag.appendChild(document.createTextNode(s.slice(last)));
    textNode.replaceWith(frag);
  }
}

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
const storageFallback = Object.create(null);
function safeStorageGet(key) {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) storageFallback[key] = value;
    return value ?? storageFallback[key] ?? null;
  } catch {
    return storageFallback[key] ?? null;
  }
}
function safeStorageSet(key, value) {
  storageFallback[key] = String(value);
  try {
    localStorage.setItem(key, value);
  } catch {
    // In-memory persistence keeps the app usable when storage is blocked.
  }
}

let stepIdx = parseInt(safeStorageGet('tokc-step') || '0', 10);
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
  iconify(document.getElementById('stepbox'));
  document.getElementById('steppos').textContent = `Step ${stepIdx + 1} of ${STEPS.length}`;
  document.getElementById('prevstep').disabled = stepIdx === 0;
  document.getElementById('nextstep').textContent = stepIdx === STEPS.length - 1 ? 'New Round ↺' : 'Next →';
  safeStorageSet('tokc-step', stepIdx);
}
document.getElementById('nextstep').addEventListener('click', () => {
  stepIdx = (stepIdx + 1) % STEPS.length;
  renderStep();
});
document.getElementById('prevstep').addEventListener('click', () => {
  if (stepIdx > 0) { stepIdx--; renderStep(); }
});
document.getElementById('resetstep').addEventListener('click', () => {
  stepIdx = 0;
  renderStep();
});
renderStep();

/* ================= Glossary ================= */
const glist = document.getElementById('glist');
function renderGlossary(letter) {
  const items = GLOSSARY.filter(([t]) => !letter || t[0].toUpperCase() === letter);
  glist.innerHTML = items.map(([t, d, ic]) =>
    `<li id="gl-${t.replace(/\W+/g, '')}">${ic ? `<span class="ic">${ic}</span> ` : ''}<b>${t}</b><div class="d">${d}</div></li>`).join('');
  iconify(glist, 'b');
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
    <button type="button" class="card" data-id="${c.id}" aria-label="Open ${c.name}">
      <img loading="lazy" src="${c.img}" alt="${c.name}" onerror="this.style.display='none'">
      <div class="nm">${c.name}</div>
    </button>`).join('');
}
document.querySelectorAll('#cardsets button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('#cardsets button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  curSet = btn.dataset.set;
  const hasFactionFilter = curSet === 'faction' || curSet === 'tactic';
  facBar.style.display = hasFactionFilter ? '' : 'none';
  if (!hasFactionFilter) {
    curFac = '';
    document.querySelectorAll('#cardfacs button').forEach(b =>
      b.classList.toggle('active', b.dataset.fac === ''));
  }
  renderCards();
}));
document.querySelectorAll('#cardfacs button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('#cardfacs button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  curFac = btn.dataset.fac;
  renderCards();
}));

const modal = document.getElementById('cardmodal');
let cardOpener = null;
function openCard(id, opener = document.activeElement) {
  const c = CARDS.find(x => x.id === id);
  if (!c) return;
  cardOpener = opener;
  document.getElementById('cm-img').src = c.img;
  document.getElementById('cm-img').alt = c.name;
  document.getElementById('cm-name').textContent = c.name;
  document.getElementById('cm-text').textContent = c.text;
  iconify(document.getElementById('cm-text'));
  document.getElementById('cm-flavor').textContent = c.fl;
  modal.classList.add('open');
  modal.querySelector('.close').focus();
}
function closeCard() {
  if (!modal.classList.contains('open')) return;
  modal.classList.remove('open');
  cardOpener?.focus();
  cardOpener = null;
}
grid.addEventListener('click', e => {
  const el = e.target.closest('.card');
  if (el) openCard(el.dataset.id, el);
});
modal.addEventListener('click', e => {
  if (e.target === modal || e.target.classList.contains('close')) closeCard();
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
      `<button type="button" class="sr" data-act="gloss" data-t="${t}"><b>${t}</b><span class="snip">${snippet(d, q)}</span></button>`).join('');
  }

  const refs = REF_INDEX.filter(r => (r.title + ' ' + r.text).toLowerCase().includes(q)).slice(0, 6);
  if (refs.length) {
    html += '<div class="sr-group">Rules reference</div>' + refs.map(r =>
      `<button type="button" class="sr" data-act="ref" data-t="${r.id}"><b>${r.title}</b><span class="snip">${snippet(r.text, q)}</span></button>`).join('');
  }

  const steps = STEPS.map((s, i) => ({ s, i }))
    .filter(({ s }) => (s.phase + ' ' + s.title + ' ' + s.body).toLowerCase().includes(q)).slice(0, 4);
  if (steps.length) {
    html += '<div class="sr-group">Round guide</div>' + steps.map(({ s, i }) =>
      `<button type="button" class="sr" data-act="step" data-t="${i}"><b>${s.phase} — ${s.title}</b></button>`).join('');
  }

  const cds = CARDS.filter(c => (c.name + ' ' + c.text + ' ' + c.fl).toLowerCase().includes(q)).slice(0, 12);
  if (cds.length) {
    html += '<div class="sr-group">Cards</div>' + cds.map(c =>
      `<button type="button" class="sr" data-act="card" data-t="${c.id}"><b>${c.name}</b><span class="snip">${snippet(c.text || c.fl || c.set, q)}</span></button>`).join('');
  }

  resultsEl.innerHTML = html || '<div class="sr"><b>No results</b><div class="snip">Try another word — e.g. "attrition", "deadly", "shrine".</div></div>';
}

input.addEventListener('input', doSearch);
const searchBtn = document.getElementById('searchbtn');
let searchOpener = null;
function openSearch() {
  searchOpener = document.activeElement;
  overlay.classList.add('open');
  input.focus();
}
function closeSearch({ restoreFocus = true } = {}) {
  if (!overlay.classList.contains('open')) return;
  overlay.classList.remove('open');
  if (restoreFocus) searchOpener?.focus();
  searchOpener = null;
}
searchBtn.addEventListener('click', openSearch);
document.getElementById('searchclose').addEventListener('click', () => closeSearch());

resultsEl.addEventListener('click', e => {
  const el = e.target.closest('.sr');
  if (!el || !el.dataset.act) return;
  const t = el.dataset.t;
  closeSearch({ restoreFocus: false });
  if (el.dataset.act === 'card') {
    showPage('cards');
    openCard(t, searchBtn);
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

document.addEventListener('keydown', e => {
  const activeDialog = modal.classList.contains('open')
    ? modal
    : overlay.classList.contains('open') ? overlay : null;
  if (!activeDialog) return;
  if (e.key === 'Escape') {
    if (activeDialog === modal) closeCard();
    else closeSearch();
    return;
  }
  if (e.key !== 'Tab') return;
  const focusable = [...activeDialog.querySelectorAll(
    'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )].filter(el => el.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

/* factions: only one panel open at a time */
document.querySelectorAll('#page-factions details.fac').forEach(d => {
  d.addEventListener('toggle', () => {
    if (!d.open) return;
    document.querySelectorAll('#page-factions details.fac[open]').forEach(other => {
      if (other !== d) other.open = false;
    });
  });
});

/* one-time icon decoration of static content */
iconify(document.getElementById('rules-ref'));
iconify(document.getElementById('play-learn'));
iconify(document.getElementById('page-factions'), 'summary');
iconify(document.getElementById('page-setup'));

/* setup checklists */
document.querySelectorAll('.check li').forEach(li => {
  const cb = li.querySelector('input');
  li.addEventListener('click', e => {
    if (e.target !== cb) cb.checked = !cb.checked;
    li.classList.toggle('done', cb.checked);
  });
});
