// ============================================================
// Frantz Safe Chatbot — Floating Widget v3 (improved engine)
// Fully self-contained, no external deps
// ============================================================
(function() {
'use strict';
if (window.__frantzChatLoaded) return;
window.__frantzChatLoaded = true;

/* ==================== KNOWLEDGE ==================== */
const K = {
  lockTypes: [
    { name: "S&G (Sargent & Greenleaf) Combination Lock",
      match: ["s&g","sargent","sargent & greenleaf","group 1","group 2","manipulation proof","dial lock","combination dial","spin dial","wheel pack"],
      desc: "The industry standard for safe combination locks.",
      dialSequence: "**Standard dialing sequence (4-number combo, e.g. 25-50-75-100):**\n1. Turn LEFT (counterclockwise) 4 full turns past zero, stop on 1st number (25)\n2. Turn RIGHT (clockwise) 3 full turns past zero, stop on 2nd number (50)\n3. Turn LEFT 2 full turns past zero, stop on 3rd number (75)\n4. Turn RIGHT slowly until dial stops (around 100)\n5. Turn handle to open\n\n**For 3-number combo:** left 4 turns, right 3 turns, left 2 turns. The right stop is the drop-in.\n\nKey: direction alternates L-R-L. More turns = first number is deeper in the wheel pack.",
      tip: "If the dial stops earlier than expected on the last right turn, you overshot. Go back 2 full turns and try again slowly." },
    { name: "LaGard Combination Lock",
      match: ["lagard","la gard","lagard lock"],
      desc: "Another major brand of safe combination locks.",
      dialSequence: "Same as S&G: LEFT 4 turns, RIGHT 3 turns, LEFT 2 turns, RIGHT to drop.\nFor electronic models: enter code + press # or *.",
      tip: "LaGard dials wear smoother over time. If the dial feels 'slippery,' the wheel pack may need service." },
    { name: "Kaba Mas Electronic Lock",
      match: ["kaba","kaba mas","kaba lock","mas lock"],
      desc: "High-security electronic lock on commercial and government safes.",
      dialSequence: "Enter 6-digit code on keypad. Lock beeps to confirm. Turn handle within 5 seconds.\nSome models (X-09): turn dial to each number and press button.\n\nAfter 3+ wrong attempts, penalty lockout kicks in — wait 5-10 minutes.",
      tip: "Kaba Mas locks have built-in penalty lockout. Don't keep guessing." },
    { name: "Tubular Key Lock",
      match: ["tubular","tubular key","ace lock","chicago lock","round key","barrel key"],
      desc: "Round key with 7-8 pins in a circle. Common on fire safes.",
      usage: "Insert key fully (push firmly), turn clockwise. If stiff, pins may need cleaning.\nLost key? Code is stamped on the key head. A locksmith can cut a new one.",
      tip: "Tubular keys bend easily. Push straight in, don't angle." }
  ],
  safeTypes: [
    { name: "Antique Safes", match: ["antique","vintage","old","19th","cast iron","heritage","mosler","diebold","hall","herring","yale"], desc: "Antique safes from 19th/early 20th centuries. Cast iron or early steel.", common: ["Combination lost over generations","Rust on internal components","Worn dial mechanism","Original key lost"], tip: "Antique safes are valuable. Never force them open." },
    { name: "Gun Safes", match: ["gun safe","firearm","rifle","pistol","liberty safe","cannon safe","stack-on","winchester","browning"], desc: "Modern gun safes, steel with locking bolts. Usually electronic keypads.", common: ["Keypad failure — dead battery","Forgotten combination","Bolts jammed","Biometric scanner failure","Key override lost"], tip: "Test combo every 3 months. Replace batteries annually." },
    { name: "Fire Safes", match: ["fire safe","fireproof","fire resistant","sentry","sentrysafe","first alert","honeywell","document safe","media safe"], desc: "UL-rated fire safes. Tubular key or simple electronic locks.", common: ["Tubular key lost","Electronic lock failure","Plastic gears stripped","Water damage from sprinklers"], tip: "Fire safes protect against fire, not burglary. Bolt them down." },
    { name: "Floor Safes", match: ["floor safe","in ground","in-ground","concrete","buried safe"], desc: "Safes set in concrete floors. Excellent burglary protection.", common: ["Concrete settling jams bolts","Moisture rusts lock","Dial hard to read","Hinge pins rusted","Flood water"], tip: "Floor safes get moisture. Open and inspect every 6 months." },
    { name: "Commercial Safes", match: ["commercial","tl-15","tl-30","trtl","amsce","gardall","schwab","business safe","retail safe"], desc: "High-security UL-rated safes. TL-15/30/TRTL ratings.", common: ["Drop slot jammed","Electronic lock worn","Dial smooth from wear","Relocker triggered","Door sagging"], tip: "Commercial safes need annual service." }
  ],
  battery: { steps: ["Most digital locks have batteries on the BACK of the door — need safe open to replace","If locked out: look for small metal contacts below the keypad","Touch a fresh 9V battery to those contacts (polarity usually doesn't matter)","Enter code while holding the 9V in place — lock should activate","Once open, replace internal batteries (usually 4x AA)"], tip: "Change batteries every 12 months. Use Duracell/Energizer, not cheap brands. Check for corrosion." },
  comboChange: { dial: "Changing a dial combo requires disassembling the lock. Not a simple DIY job. Call a pro — $50-$150, takes 15-30 minutes.", electronic: "For most electronic locks: open the safe, press the program/change button (often hidden), enter current code + #, enter new code + #, test 5 times with door open before closing." },
  forgotCombo: { try: ["Common factory combos: 50-25-50, 20-40-60, 10-20-30, 0-0-0","Check your paperwork — combo sometimes on warranty card","Look on the back of the dial or inside battery compartment","Locksmith can get factory combo from lock serial number"], open: "To get it open:\n1. Manipulation (no damage): $150-$350\n2. Drilling (with patch): $250-$500+\nI try manipulation first every time." },
  jammed: { check: ["Is something inside blocking the door?","Is the safe on uneven floor? Shimming helps.","Is handle in right position? Some need horizontal.","Did you dial 4 full turns past zero before starting?"], warning: "DO NOT hammer the handle or pry the door. You'll turn a $200 repair into $500+. Call a pro." },
  pricing: [["Simple lockout (no damage)","$100-$200"],["Manipulation (non-destructive)","$150-$350"],["Drill opening with repair","$250-$500+"],["New lock installed","$100-$250"],["Combination change","$50-$150"],["Annual maintenance","$75-$150"]],
  maintenance: { monthly: ["Open and close once","Wipe keypad"], quarterly: ["Test combo","Check for rust","Inspect hinges"], annually: ["Replace batteries","Lubricate bolts/hinges","Professional service"] }
};

/* ==================== ENGINE ==================== */
function respond(input) {
  const q = input.toLowerCase().trim();
  function m(list) { return list.some(k => q.includes(k)); }

  // Lock types
  for (const lt of K.lockTypes) {
    if (m(lt.match)) {
      let r = lt.name + "\n" + lt.desc + "\n";
      if (lt.dialSequence) r += "\nDialing:\n" + lt.dialSequence + "\n";
      if (lt.usage) r += "\n" + lt.usage + "\n";
      r += "\nTip: " + lt.tip;
      return r;
    }
  }

  // Safe types
  for (const st of K.safeTypes) {
    if (m(st.match)) {
      return st.name + "\n" + st.desc + "\n\nCommon issues:\n• " + st.common.slice(0,4).join("\n• ") + "\n\nTip: " + st.tip;
    }
  }

  // Dialing sequence
  if (q.includes("dial sequence")||q.includes("dialing")||q.includes("how to dial")||q.includes("turn the dial")||(q.includes("left")&&q.includes("right")&&q.includes("turn"))) {
    return K.lockTypes[0].dialSequence + "\n\nTip: " + K.lockTypes[0].tip;
  }

  // Battery
  if (q.includes("battery")||q.includes("dead")||q.includes("no power")||q.includes("not lighting")||q.includes("not beeping")) {
    return "Battery help:\n" + K.battery.steps.map((s,i)=>(i+1)+". "+s).join("\n") + "\n\nTip: " + K.battery.tip;
  }

  // Change combo
  if (q.includes("change combination")||q.includes("change combo")||q.includes("change code")||q.includes("new combination")||q.includes("new combo")||q.includes("new code")||q.includes("reset combo")||q.includes("set new")) {
    if (q.includes("digital")||q.includes("electronic")||q.includes("keypad")) return "For digital locks:\n" + K.comboChange.electronic;
    if (q.includes("dial")||q.includes("mechanical")) return "For dial locks:\n" + K.comboChange.dial;
    return "For dial locks:\n" + K.comboChange.dial + "\n\nFor digital locks:\n" + K.comboChange.electronic;
  }

  // Forgot combo
  if (q.includes("forgot")||q.includes("forget")||q.includes("lost combination")||q.includes("lost code")||q.includes("can't remember")||q.includes("don't know the")) {
    return "Try these:\n• " + K.forgotCombo.try.join("\n• ") + "\n\n" + K.forgotCombo.open;
  }

  // Won't open
  if (q.includes("won't open")||q.includes("can't open")||q.includes("safe locked")||q.includes("stuck closed")||q.includes("locked out")||q.includes("wont open")||q.includes("won't unlock")) {
    return "Quick checks:\n• " + K.jammed.check.join("\n• ") + "\n\nWarning: " + K.jammed.warning;
  }

  // Jammed
  if (q.includes("jammed")||q.includes("stuck")||q.includes("won't turn")||q.includes("not turning")) {
    return "Don't force it!\nCheck:\n• " + K.jammed.check.join("\n• ") + "\n\nWarning: " + K.jammed.warning;
  }

  // Lost key
  if (q.includes("lost key")||q.includes("broken key")||q.includes("key broke")||q.includes("key lost")||q.includes("missing key")) {
    return "• Key code on the key head? Locksmith can cut a new one\n• Tubular keys have code on head — easy to duplicate\n• No code? Locksmith can 'impression' a key or drill the lock\n\nCall (916) 534-4900 — I can often make a key without drilling.";
  }

  // Buying
  if (q.includes("buy")||q.includes("purchase")||q.includes("get a safe")||q.includes("new safe")||q.includes("what safe")||q.includes("recommend")||q.includes("looking for a")) {
    return "Ask yourself:\n• What will you store? (guns/documents/cash/jewelry)\n• Where will it go? (garage/closet/floor/wall)\n• Main threat? (fire/burglary/both)\n• How often accessed?\n\nGuide: Documents → fire-rated | Guns → Liberty/Cannon/AMSEC | Cash → TL-15/30 | Quick access → digital keypad\n\nCall (916) 534-4900.";
  }

  // Maintenance
  if (q.includes("maintenance")||q.includes("maintain")||q.includes("service")||q.includes("lubricate")||q.includes("oil")||q.includes("grease")||q.includes("care")) {
    return "Monthly: " + K.maintenance.monthly.join(", ") + "\nQuarterly: " + K.maintenance.quarterly.join(", ") + "\nAnnually: " + K.maintenance.annually.join(", ") + "\n\nPro service: $75-$150.";
  }

  // Pricing
  if (q.includes("cost")||q.includes("price")||q.includes("how much")||q.includes("estimate")||q.includes("quote")||q.includes("rate")||q.includes("fee")||q.includes("charge")) {
    return "Typical pricing:\n" + K.pricing.map(([s,p])=>s+": "+p).join("\n") + "\n\nCall (916) 534-4900 for exact quote.";
  }

  // License
  if (q.includes("license")||q.includes("licensed")||q.includes("insured")||q.includes("lco")||q.includes("bsis")) {
    return "CA Locksmith License #LCO 4160 — issued by BSIS (CA DCA). Fully insured.";
  }

  // Hours
  if (q.includes("hours")||q.includes("open")||q.includes("when")||q.includes("available")||q.includes("weekend")||q.includes("emergency")) {
    return "Mon-Fri 9AM-4PM. Emergency after-hours safe service available. Call (916) 534-4900.";
  }

  // Contact
  if (q.includes("call")||q.includes("phone")||q.includes("email")||q.includes("contact")||q.includes("number")) {
    return "📞 (916) 534-4900\n✉️ frantzlocksmith@hotmail.com\nSacramento & West Sacramento, mobile service.\n\nIf I can't answer, leave a message and I'll call you back.";
  }

  // Thanks
  if (q.includes("thanks")||q.includes("thank you")||q.includes("appreciate")) {
    return "You're welcome! Call (916) 534-4900 anytime you need safe service in Sacramento.";
  }

  // Hello
  if (q.includes("hi")||q.includes("hello")||q.includes("hey")) {
    return "Hi! I'm Frantz's Safe Assistant. Ask me about safe opening, combination changes, lock types, or anything safe-related.";
  }

  // Fallback
  return "I can help with:\n• \"My safe won't open\"\n• \"Forgot my combination\"\n• \"Dialing sequence for S&G lock\"\n• \"Dead battery on digital lock\"\n• \"How to change the code\"\n• \"How much to open a safe?\"\n• \"Tell me about antique safes\"\n\nAsk me anything about your safe!";
}

/* ==================== UI ==================== */
const css = `#fcht-toggle{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#d4a843,#b8922e);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(212,168,67,0.4);z-index:9999;display:flex;align-items:center;justify-content:center;font-size:28px;transition:all .3s ease;color:#0f2440}
#fcht-toggle:hover{transform:scale(1.1)}
#fcht-toggle.open .ci{display:none}
#fcht-toggle.open .xi{display:block}
#fcht-toggle .xi{display:none}
#fcht-pop{position:fixed;bottom:96px;right:24px;width:380px;height:560px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.2);z-index:9998;display:none;flex-direction:column;overflow:hidden;animation:fsu .3s ease}
#fcht-pop.open{display:flex}
@keyframes fsu{from{opacity:0;transform:translateY(20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
#fcht-phdr{background:linear-gradient(135deg,#0f2440,#1a3a5c);color:#fff;padding:10px 14px;display:flex;align-items:center;gap:8px;flex-shrink:0}
#fcht-phdr .av{width:30px;height:30px;background:rgba(212,168,67,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
#fcht-phdr .ht h3{font-size:.82rem;font-weight:700}
#fcht-phdr .ht p{font-size:.7rem;color:rgba(255,255,255,.7)}
#fcht-msgs{flex:1;padding:8px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;background:#f8f9fa}
#fcht-msgs .m{max-width:88%;padding:7px 10px;border-radius:10px;font-size:.8rem;line-height:1.45;animation:fdi .25s ease;white-space:pre-wrap}
@keyframes fdi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
#fcht-msgs .m.b{align-self:flex-start;background:#fff;border:1px solid #e0e3e8;border-bottom-left-radius:3px;color:#1a1d21}
#fcht-msgs .m.b strong{color:#1a3a5c}
#fcht-msgs .m.u{align-self:flex-end;background:#1a3a5c;color:#fff;border-bottom-right-radius:3px}
#fcht-inp{border-top:1px solid #e0e3e8;padding:6px 8px;display:flex;gap:5px;flex-shrink:0;background:#fff}
#fcht-inp input{flex:1;border:2px solid #e0e3e8;border-radius:7px;padding:7px 10px;font-size:.8rem;font-family:inherit}
#fcht-inp input:focus{outline:none;border-color:#d4a843}
#fcht-inp button{background:#d4a843;border:none;border-radius:7px;color:#0f2440;padding:7px 12px;font-weight:700;cursor:pointer;font-size:.8rem}
#fcht-inp button:hover{background:#b8922e}
#fcht-qr{display:flex;flex-wrap:wrap;gap:3px;padding:5px 8px;background:#fff;border-top:1px solid #e0e3e8;flex-shrink:0}
#fcht-qr .qr{background:#f0f2f5;border:1px solid #e0e3e8;padding:4px 8px;border-radius:50px;font-size:.7rem;cursor:pointer;color:#1a3a5c;transition:all .2s;white-space:nowrap}
#fcht-qr .qr:hover{background:#1a3a5c;color:#fff}
@media(max-width:480px){#fcht-pop{width:100%;height:85vh;bottom:0;right:0;border-radius:16px 16px 0 0}#fcht-toggle{bottom:16px;right:16px}}`;

const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);

document.body.insertAdjacentHTML('beforeend', `
<button id="fcht-toggle" aria-label="Open safe chat"><span class="ci">💬</span><span class="xi">✕</span></button>
<div id="fcht-pop">
  <div id="fcht-phdr">
    <div class="av">🔐</div>
    <div class="ht"><h3>Frantz Safe Assistant</h3><p>Ask about your safe</p></div>
    <!-- X removed — toggle button closes the popup -->
  </div>
  <div id="fcht-msgs">
    <div class="m b"><strong>🔐 Safe Assistant</strong>\nHi! Ask me about safe opening, dial sequences, battery help, or anything safe-related.</div>
  </div>
  <div id="fcht-qr">
    <span class="qr" data-m="My safe won't open">🔒 Won't open</span>
    <span class="qr" data-m="What's the dialing sequence for an S&G lock?">🔢 Dial Sequence</span>
    <span class="qr" data-m="Battery dead on my digital lock">🔋 Battery</span>
    <span class="qr" data-m="How much does safe service cost?">💰 Pricing</span>
  </div>
  <div id="fcht-inp">
    <input id="fcht-input" placeholder="Ask about your safe..."/>
    <button id="fcht-send">Send</button>
  </div>
</div>`);

const toggle = document.getElementById('fcht-toggle');
const popup = document.getElementById('fcht-pop');
const msgsEl = document.getElementById('fcht-msgs');
const input = document.getElementById('fcht-input');
const sendBtn = document.getElementById('fcht-send');

function addMsg(text, role) {
  const d = document.createElement('div'); d.className = 'm ' + (role === 'user' ? 'u' : 'b');
  if (role === 'bot') {
    text = text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
    text = text.replace(/\n/g,'<br>');
    text = text.replace(/\(916\) 534-4900/g,'<a href="tel:+19165344900" style="display:inline-block;margin-top:3px;background:#d4a843;color:#0f2440;padding:4px 10px;border-radius:5px;font-weight:700;text-decoration:none;font-size:.78rem">📞 (916) 534-4900</a>');
    d.innerHTML = text;
  } else { d.textContent = text; }
  msgsEl.appendChild(d); msgsEl.scrollTop = msgsEl.scrollHeight;
}

function send() {
  const t = input.value.trim(); if (!t) return;
  addMsg(t, 'user'); input.value = '';
  setTimeout(() => { addMsg(respond(t), 'bot'); }, 400);
}

toggle.onclick = () => { toggle.classList.toggle('open'); popup.classList.toggle('open'); if (popup.classList.contains('open')) input.focus(); };
// Close button removed — toggle button closes the popup
sendBtn.onclick = send;
input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); send(); } };
document.querySelectorAll('#fcht-qr .qr').forEach(el => { el.onclick = () => { input.value = el.dataset.m; send(); }; });

})();
