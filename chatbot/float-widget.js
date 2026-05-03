// ============================================================
// Frantz Safe Chatbot — Floating Widget for Website v2
// Inline engine — no external script dependencies
// ============================================================
(function() {
  'use strict';

  if (window.__frantzChatLoaded) return;
  window.__frantzChatLoaded = true;

  // ==================== KNOWLEDGE BASE INLINE ====================
  const KNOWLEDGE = {
    safeTypes: [
      { name: "Antique Safes", keywords: ["antique","vintage","old","vintage safe","19th century","cast iron","heritage"], description: "Antique safes from the 19th and early 20th centuries. Typically cast iron or early steel with ornate detailing. Common brands include Mosler, Diebold, Hall's, Herring, and Yale.", commonIssues: ["Combination lost over generations","Rust and corrosion on internal components","Worn dial mechanism","Original key lost","Springs degraded from decades of tension","Handle mechanisms seized"], tip: "Antique safes are valuable. Never force them open — drilling damages collector value. Call someone who understands vintage mechanisms." },
      { name: "Gun Safes", keywords: ["gun safe","gun safe","firearm","weapon","rifle","pistol","liberty","cannon","stack-on","winchester","browning"], description: "Modern gun safes designed to secure firearms. Usually heavy-gauge steel with active locking bolts. Most have electronic keypads.", commonIssues: ["Electronic keypad failure — dead battery or circuit board","Forgotten combination after not opening for months","Bolts jammed from misalignment","Biometric scanner not recognizing fingerprint","Key override lost"], tip: "Test your gun safe combination every 3 months. Replace batteries annually. Keep the backup key accessible." },
      { name: "Fire Safes", keywords: ["fire safe","fireproof","fire resistant","fire-rated","document","media safe","sentrysafe"], description: "UL-rated fire safes designed to protect documents from fire damage. Most have tubular key locks or simple electronic locks.", commonIssues: ["Tubular key lost — hard to duplicate without the code","Electronic lock failure on budget models","Plastic gears stripped from over-tightening","Water damage from fire sprinklers"], tip: "Fire safes protect against fire, not burglary. Bolt them down if security matters." },
      { name: "Floor Safes", keywords: ["floor safe","in-ground","in ground","concrete","buried"], description: "Safes installed in concrete floors. Excellent burglary protection. Usually have heavy combination dials.", commonIssues: ["Concrete settling shifts the safe — jams bolts","Moisture rusts the lock mechanism","Combination dial hard to read after years of wear","Hinge pins rusted","Flood water with no drainage"], tip: "Floor safes are prone to moisture. Open and inspect yours every 6 months." },
      { name: "Wall Safes", keywords: ["wall safe","wall safe","in-wall","between studs","hidden safe"], description: "Safes that fit between wall studs. Usually shallow, can be hidden behind pictures.", commonIssues: ["Key lost for tubular lock","Screws pulled from drywall — door sagging","Paint overspray on dial","Items blocking the door"], tip: "Wall safes offer convenience, not high security. Use for low-value items." },
      { name: "Commercial Safes", keywords: ["commercial safe","business","retail","cash safe","deposit","drop safe","tl rated","trtl","amsce","gardall","mosler","diebold"], description: "High-security safes rated by UL for burglary/fire resistance. TL-15, TL-30, TRTL ratings.", commonIssues: ["Drop slot jammed","Electronic lock worn from high traffic","Combination dial smooth from wear","Relocker accidentally triggered","Door sagging from heavy use","GSA container lock maintenance"], tip: "Commercial safes should be serviced annually. A failed safe during business hours means lost revenue." },
      { name: "Drop / Deposit Safes", keywords: ["drop safe","deposit","night drop","drop slot","cash drop"], description: "Safes with a one-way deposit slot for cash and envelopes. Common in retail and restaurants.", commonIssues: ["Drop slot jammed from overstuffing","Anti-fish baffle broken","Main door combination forgotten","Electronic lock on drop door worn out"], tip: "Open the main door regularly to clear the area behind the drop slot." }
    ],
    lockTypes: [
      { name: "Combination Dial Lock", keywords: ["combination dial","dial","spin","turning","wheel pack","sargent","la gard","group 1","group 2"], description: "The classic safe lock. A dial turns internal wheels to align gates with the fence and bolt.", troubleshooting: ["Dial turns but doesn't stop at numbers — spindle may be stripped","Dial stops but won't open — wheel pack misaligned","Dial is stiff — needs cleaning","Dial spins freely — spring broken","Safe won't lock — dialed past zero without resetting"], tip: "Always dial past zero at least 4 full turns before starting your combination." },
      { name: "Electronic Keypad Lock", keywords: ["electronic","keypad","digital","keypad lock","digital lock","s&g electronic","la gard electronic","kaba","ilco"], description: "Battery-powered keypad locks. More convenient but dependent on batteries.", troubleshooting: ["No response — dead battery (most common)","Keypad beeps but lock won't open — solenoid stuck","Keypad flashes — low battery warning","Keypad works sometimes — loose wire","Battery corrosion — check contacts"], tip: "Change batteries annually. Most have a 'jump start' terminal for a 9V battery or an emergency key override." },
      { name: "Tubular Key Lock", keywords: ["tubular","tubular key","barrel key","round key","ace lock","chicago lock"], description: "A round tubular key with 7 or 8 pins arranged in a circle. Common on fire safes and wall safes.", troubleshooting: ["Key won't insert fully — debris in keyway","Key turns but won't open — cam damaged","Key broken off — needs extraction","Key lost — can be decoded from key code number"], tip: "Write down the key code number etched on the key. A locksmith can cut a new one from the code." },
      { name: "Key Lock", keywords: ["key lock","safe key","bit key","flat key","lever lock","warded"], description: "Standard key-operated safe lock. Can be simple warded locks or higher-security lever locks.", troubleshooting: ["Key won't turn — needs lube or broken spring","Key turns but won't retract bolt — linkage disconnected","Key broken in lock","Key stuck after opening"], tip: "Safe keys have codes on them. Keep a record." },
      { name: "Biometric Lock", keywords: ["biometric","fingerprint","thumbprint","biometric lock","finger scanner"], description: "Modern locks that read fingerprints. Convenient but can have accuracy issues.", troubleshooting: ["Fingerprint not recognized — dry skin, dirt, angle","Scanner shows green but lock won't open — solenoid failure","Scanner doesn't light up — battery","Stored fingerprints lost on battery change"], tip: "Store fingerprints of both hands. Keep your backup key accessible." }
    ],
    problems: {
      "forgot combination": { answers: ["Try common combos: 50-25-50, 20-40-60, 10-20-30, 0-0-0","Check if you wrote it down somewhere","A locksmith can manipulate the lock open — no damage","If manipulation won't work, drilling may be needed"], proTip: "Safe technicians charge LESS for manipulation than for drilling. Call before you force anything." },
      "dead battery": { answers: ["Check for a 'jump start' terminal — touch a 9V battery to contacts","Look for a key override — hidden keyhole under a sliding panel","External power can be applied through keypad cable entry"], proTip: "Many locks beep or flash when the battery is low. Don't ignore it." },
      "jammed safe": { answers: ["Check if something inside is blocking the door","Try gently pushing the door while turning the handle","DO NOT hammer the handle or use a crowbar","If on uneven floor, try shimming one corner"], proTip: "A jammed safe is almost always fixable with patience. Breaking things makes it worse." },
      "safe service cost": { answers: ["Simple lockout (open, no damage): $100-$200","Manipulation (non-destructive): $150-$350","Drill opening with repair: $250-$500+","New lock installation: $100-$250","Combination change: $50-$150","Annual maintenance: $75-$150"], proTip: "Annual maintenance is cheap insurance." }
    },
    about: { name: "Frantz Locksmith Service", specialty: "Safe Services Specialist", since: "1985", license: "CA LCO 4160", phone: "(916) 534-4900", email: "frantzlocksmith@hotmail.com", area: "Sacramento & West Sacramento, CA", hours: "Mon-Fri 9AM-4PM" }
  };

  // ==================== CHATBOT ENGINE INLINE ====================
  class SafeChatbot {
    constructor(k) {
      this.k = k;
      this.reset();
    }
    reset() { this.ctx = { stage: 'greeting', history: [], needs: [] }; }
    respond(input) {
      const q = input.toLowerCase().trim();
      this.ctx.history.push({role:'user',msg:input});
      this._classify(q);
      const r = this._gen(q);
      this.ctx.history.push({role:'bot',msg:r});
      return r;
    }
    _classify(q) {
      const intents = {
        openSafe: ['open safe','safe locked',"won't open","can't open",'stuck','locked out','forgot combination','forgot code','lost combination','wont unlock'],
        repairSafe: ['repair','fix','broken','jammed','handle','hinge','not working'],
        comboChange: ['change combination','new combination','reset combo','change code','new code'],
        digitalUpgrade: ['digital','keypad upgrade','electronic lock','upgrade'],
        buySafe: ['buy safe','purchase safe','safe for sale','get a safe','new safe','how much for a safe'],
        maintenance: ['maintenance','service','inspect','check','annual'],
        aboutSafe: ['type of safe','kind of safe','what safe','which safe','antique','gun safe','fire safe'],
        pricing: ['cost','price','how much','estimate','quote'],
        license: ['license','licensed','insured','lc','lco','bonded'],
        hours: ['hours','open','when','available','weekend','after hours'],
        contact: ['call','phone','email','contact','reach','talk to'],
        thanks: ['thanks','thank you','appreciate','helpful']
      };
      for (const [intent, kws] of Object.entries(intents)) {
        if (kws.some(k => q.includes(k)) && !this.ctx.needs.includes(intent)) {
          this.ctx.needs.push(intent);
        }
      }
    }
    _gen(q) {
      if (this.ctx.needs.includes('openSafe')) return this._openSafe(q);
      if (this.ctx.needs.includes('repairSafe')) return this._repair();
      if (this.ctx.needs.includes('comboChange')) return "I can change your safe combination. For dial locks, I'll disassemble and reset the wheel pack. For electronic locks, I can program a new code. Typically $50-$150. Call (916) 534-4900.";
      if (this.ctx.needs.includes('digitalUpgrade')) return "Upgrading from a dial to a digital keypad lock is very popular. Faster to open, easy code changes. Usually $150-$250 installed. Call (916) 534-4900 to discuss options.";
      if (this.ctx.needs.includes('buySafe')) return this._buySafe();
      if (this.ctx.needs.includes('maintenance')) return this._maintenance();
      if (this.ctx.needs.includes('pricing')) return this._pricing();
      if (this.ctx.needs.includes('license')) return "I'm fully licensed. California Locksmith License #LCO 4160, issued by the Bureau of Security and Investigative Services (CA DCA).";
      if (this.ctx.needs.includes('hours')) return "Mon-Fri: 9AM-4PM. After-hours emergency safe service available. Call (916) 534-4900.";
      if (this.ctx.needs.includes('contact')) return "Call (916) 534-4900 or email frantzlocksmith@hotmail.com. Mobile service in Sacramento & West Sacramento.";
      if (this.ctx.needs.includes('thanks')) return "You're welcome! If you ever need safe service, just call (916) 534-4900.";
      
      // Check safe types
      for (const st of this.k.safeTypes) {
        if (st.keywords.some(k => q.includes(k))) return `**${st.name}**\n${st.description}\n\nCommon issues:\n• ${st.commonIssues.slice(0,4).join('\n• ')}\n\nTip: ${st.tip}`;
      }
      // Check lock types
      for (const lt of this.k.lockTypes) {
        if (lt.keywords.some(k => q.includes(k))) return `**${lt.name}**\n${lt.description}\n\nTroubleshooting:\n• ${lt.troubleshooting.slice(0,4).join('\n• ')}\n\nTip: ${lt.tip}`;
      }
      
      if (this.ctx.stage === 'greeting') { this.ctx.stage = 'done'; return "Hi! I'm Frantz's Safe Assistant. I specialize in safes — opening, repairs, combination changes, and buying advice. What can I help you with?\n\nTry: \"My safe won't open\" • \"Forgot my combination\" • \"How much does it cost?\" • \"Tell me about gun safes\""; }
      
      return ["I'm here for safe questions. Tell me what's happening — locked out? Need a repair? Combination changed? Or just give me a call at (916) 534-4900.","I specialize in safes. Try asking about opening, repairs, combination changes, or pricing. Or call (916) 534-4900.","Not sure I understood. I can help with: safe opening, repairs, combination changes, buying advice, and maintenance. What's on your mind?"][Math.floor(Math.random()*3)];
    }
    _openSafe(q) {
      let r = "Sounds like you need your safe opened. Here's the good news: I can almost always get it open without damaging it.\n\n";
      if (q.includes('forgot')||q.includes('lost')||q.includes('combination')) {
        const info = this.k.problems['forgot combination'];
        r += "What to try:\n• " + info.answers.join('\n• ') + "\n\nPro tip: " + info.proTip;
      } else if (q.includes('battery')||q.includes('dead')) {
        const info = this.k.problems['dead battery'];
        r += "Battery tips:\n• " + info.answers.join('\n• ') + "\n\nPro tip: " + info.proTip;
      } else if (q.includes('jammed')||q.includes('stuck')) {
        const info = this.k.problems['jammed safe'];
        r += "Jammed safe tips:\n• " + info.answers.join('\n• ') + "\n\nPro tip: " + info.proTip;
      } else {
        r += "If you're in Sacramento or West Sacramento, call (916) 534-4900. I'll come take a look. No charge for an honest assessment.";
      }
      return r;
    }
    _repair() {
      return "I can fix most safe issues:\n• Broken handles — replace or repair\n• Jammed bolts — realign or repair\n• Failed electronic locks — diagnose and replace\n• Hinge problems — sagging doors\n• Relocker triggered — secondary lock engaged\n\nDon't force it. Call (916) 534-4900.";
    }
    _buySafe() {
      return "To find the right safe, ask yourself:\n• What will you store? (guns, documents, cash, jewelry?)\n• Where will it go? (garage, closet, floor, wall?)\n• Primary threat? (fire, burglary, both?)\n• How often will you access it?\n\nI stock fire safes, gun safes, and drop safes. Larger ones available via special order from AMSEC or Gardall. Call (916) 534-4900.";
    }
    _maintenance() {
      return "Annual maintenance is cheap insurance.\n\nMonthly: Open and close once. Wipe the keypad.\nQuarterly: Test the combo. Check for rust/moisture.\nAnnually: Replace batteries. Lubricate bolts and hinges. Professional service recommended.\n\nService visit: $75-$150. Call (916) 534-4900.";
    }
    _pricing() {
      return "Typical pricing:\n• Simple lockout (no damage): $100-$200\n• Manipulation (non-destructive): $150-$350\n• Drill opening with repair: $250-$500+\n• New lock: $100-$250\n• Combo change: $50-$150\n• Annual maintenance: $75-$150\n\nCall (916) 534-4900 for a quote.";
    }
  }

  const bot = new SafeChatbot(KNOWLEDGE);

  // ==================== WIDGET UI ====================
  const css = `
    #fcht-toggle{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#d4a843,#b8922e);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(212,168,67,0.4);z-index:9999;display:flex;align-items:center;justify-content:center;font-size:28px;transition:all .3s ease;color:#0f2440}
    #fcht-toggle:hover{transform:scale(1.1)}
    #fcht-toggle.open .ci{display:none}
    #fcht-toggle.open .xi{display:block}
    #fcht-toggle .xi{display:none}
    #fcht-pop{position:fixed;bottom:96px;right:24px;width:380px;height:560px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.2);z-index:9998;display:none;flex-direction:column;overflow:hidden;animation:fsu .3s ease}
    #fcht-pop.open{display:flex}
    @keyframes fsu{from{opacity:0;transform:translateY(20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
    #fcht-phdr{background:linear-gradient(135deg,#0f2440,#1a3a5c);color:#fff;padding:12px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0}
    #fcht-phdr .av{width:34px;height:34px;background:rgba(212,168,67,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
    #fcht-phdr .ht h3{font-size:.88rem;font-weight:700}
    #fcht-phdr .ht p{font-size:.72rem;color:rgba(255,255,255,.7)}
    #fcht-phdr .hc{margin-left:auto;background:none;border:none;color:rgba(255,255,255,.6);cursor:pointer;font-size:20px;padding:4px}
    #fcht-msgs{flex:1;padding:10px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;background:#f8f9fa}
    #fcht-msgs .m{max-width:88%;padding:8px 12px;border-radius:12px;font-size:.84rem;line-height:1.5;animation:fdi .3s ease;white-space:pre-wrap}
    @keyframes fdi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    #fcht-msgs .m.b{align-self:flex-start;background:#fff;border:1px solid #e0e3e8;border-bottom-left-radius:4px;color:#1a1d21}
    #fcht-msgs .m.b strong{color:#1a3a5c}
    #fcht-msgs .m.u{align-self:flex-end;background:#1a3a5c;color:#fff;border-bottom-right-radius:4px}
    #fcht-inp{border-top:1px solid #e0e3e8;padding:8px 10px;display:flex;gap:6px;flex-shrink:0;background:#fff}
    #fcht-inp input{flex:1;border:2px solid #e0e3e8;border-radius:8px;padding:8px 12px;font-size:.84rem;font-family:inherit}
    #fcht-inp input:focus{outline:none;border-color:#d4a843}
    #fcht-inp button{background:#d4a843;border:none;border-radius:8px;color:#0f2440;padding:8px 16px;font-weight:700;cursor:pointer;font-size:.84rem}
    #fcht-inp button:hover{background:#b8922e}
    #fcht-qr{display:flex;flex-wrap:wrap;gap:4px;padding:6px 10px;background:#fff;border-top:1px solid #e0e3e8;flex-shrink:0}
    #fcht-qr .qr{background:#f0f2f5;border:1px solid #e0e3e8;padding:5px 10px;border-radius:50px;font-size:.75rem;cursor:pointer;color:#1a3a5c;transition:all .2s}
    #fcht-qr .qr:hover{background:#1a3a5c;color:#fff}
    @media(max-width:480px){#fcht-pop{width:100%;height:85vh;bottom:0;right:0;border-radius:16px 16px 0 0}#fcht-toggle{bottom:16px;right:16px}}
  `;

  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);

  document.body.insertAdjacentHTML('beforeend', `
    <button id="fcht-toggle" aria-label="Open safe chat"><span class="ci">💬</span><span class="xi">✕</span></button>
    <div id="fcht-pop">
      <div id="fcht-phdr">
        <div class="av">🔐</div>
        <div class="ht"><h3>Frantz Safe Assistant</h3><p>Ask about your safe</p></div>
        <button class="hc" id="fcht-close">✕</button>
      </div>
      <div id="fcht-msgs">
        <div class="m b"><strong>🔐 Safe Assistant</strong><br>Hi! I specialize in safes — opening, repairs, and buying advice. What's going on with your safe?</div>
      </div>
      <div id="fcht-qr">
        <span class="qr" data-m="My safe won't open">🔒 Won't open</span>
        <span class="qr" data-m="Forgot my combination">🔢 Forgot combo</span>
        <span class="qr" data-m="How much does safe service cost?">💰 Pricing</span>
        <span class="qr" data-m="What are your hours?">🕐 Hours</span>
      </div>
      <div id="fcht-inp">
        <input id="fcht-input" placeholder="Ask about your safe..."/>
        <button id="fcht-send">Send</button>
      </div>
    </div>
  `);

  const toggle = document.getElementById('fcht-toggle');
  const popup = document.getElementById('fcht-pop');
  const msgsEl = document.getElementById('fcht-msgs');
  const input = document.getElementById('fcht-input');
  const sendBtn = document.getElementById('fcht-send');

  function addMsg(text, role) {
    const d = document.createElement('div');
    d.className = 'm ' + (role === 'user' ? 'u' : 'b');
    if (role === 'bot') {
      text = text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
      text = text.replace(/\n/g,'<br>');
      text = text.replace(/\(916\) 534-4900/g,'<a href="tel:+19165344900" style="display:inline-block;margin-top:4px;background:#d4a843;color:#0f2440;padding:5px 12px;border-radius:6px;font-weight:700;text-decoration:none;font-size:.82rem">📞 (916) 534-4900</a>');
      d.innerHTML = text;
    } else {
      d.textContent = text;
    }
    msgsEl.appendChild(d);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function send() {
    const t = input.value.trim();
    if (!t) return;
    addMsg(t, 'user');
    input.value = '';
    setTimeout(() => {
      const r = bot.respond(t);
      addMsg(r, 'bot');
    }, 500);
  }

  toggle.onclick = () => {
    toggle.classList.toggle('open');
    popup.classList.toggle('open');
    if (popup.classList.contains('open')) input.focus();
  };
  document.getElementById('fcht-close').onclick = () => {
    toggle.classList.remove('open');
    popup.classList.remove('open');
  };

  sendBtn.onclick = send;
  input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); send(); } };

  document.querySelectorAll('#fcht-qr .qr').forEach(el => {
    el.onclick = () => { input.value = el.dataset.m; send(); };
  });

})();
