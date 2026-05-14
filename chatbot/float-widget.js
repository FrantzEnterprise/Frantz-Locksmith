// ============================================================
// Frantz Safe Chatbot — Floating Widget v4 (fully trained)
// Knowledge includes tips, stories, pricing, maintenance, etc.
// ============================================================
(function() {
'use strict';
if (window.__frantzChatLoaded) return;
window.__frantzChatLoaded = true;
/* ==================== KNOWLEDGE ==================== */

// --- Blog Stories (for Q&A) ---
const STORIES = {
  gsa: { title: "The Impossible Shot \u2014 Opening a GSA Porta-A-Vault With One 1/4\" Hole",
         keywords: ["gsa","porta","vault","postal","government container","post office","dual custody","x-07","x-08","x-09","x-10"],
         summary: "A US Postal Service GSA Porta-A-Vault with two locks that both needed to open. Instead of drilling two holes, I drilled one surgical 1/4\" hole dead center on the settings screw of the Group 1 locks. Five photos show the entire process. This is what GSA certification (X-07 through X-10) means \u2014 knowing exactly where to drill, from what angle, and how deep.",
         url: "blog/gsa-porta-vault-impossible-shot.html" },
  cheaper: { title: "That \"Cheaper\" Safe Guy Just Cost You $7,000",
             keywords: ["cheaper","amateur","destructive","sawzall","grinder","drill blind","triggered relocker","totaled safe","fire lining","$7,000","7,000","safe destroyed"],
             summary: "I've seen what happens when an amateur drills into a safe blind \u2014 drilled through the bolts, trigger the relockers, destroy the fire lining, and turn a $500 repair into a $10,000 replacement. The article shows 4 photos of amateur damage and 4 photos of professional repair. The bottom line: when you need a safe opened, the cheapest guy is the most expensive choice you can make.",
             url: "blog/why-hire-a-pro-safe-tech.html" },
  network: { title: "The Call That Tested the Network",
             keywords: ["network","protege","glazer","glazer safe","probate","out of town","backup","coverage","can't make it","the call","tested the network"],
             summary: "A probate safe opening, Friday 4PM deadline, and I was out of town. My protege Mr. Glazer (Glazer Safe & Lock) stepped in and handled it. This is what a professional network looks like \u2014 even when I can't be there, a trusted expert with the same standards covers for you.",
             url: "blog/the-call-that-tested-the-network.html" },
  surgical: { title: "Surgical Drilling \u2014 A Liberty Safe Repair Walkthrough",
              keywords: ["surgical drilling","surgical","tapered pin","offset mounting plate","sargent & greenleaf","repair walkthrough","7 photos","drill hole repair","liberty plate safe"],
              summary: "A Liberty Plate Safe restored to factory condition. One clean 1/4\" hole, a tapered pin driven in, an offset mounting plate, and a new Sargent & Greenleaf lock. Seven photos show the entire process \u2014 from the initial drill hole to the finished, working safe.",
              url: "blog/liberty-safe-surgical-drilling.html" },
  johnson: { title: "The Johnson Pacific That Almost Nobody Would Touch",
             keywords: ["johnson pacific","floor safe","gas station","antique","non-destructive","restored","almost nobody"],
             summary: "A historic gas station with an antique Johnson Pacific floor safe that multiple people said 'can't be opened without destroying it.' I opened it non-destructively and restored it to working condition.",
             url: "blog/johnson-pacific-floor-safe.html" },
  crush: { title: "A Bent Wire and a $0.20 Part \u2014 How This Liberty Safe Opened Without a Scratch",
           keywords: ["bent wire","crush washer",".20","$0.20","stout wire","guide slot","locking tab","no damage","no drill","no cut","saw","guy with a saw","wire through","poked a wire","fished a wire"],
           summary: "A Liberty Safe with a faulty crush washer had the locking tab stuck. A guy with a saw wanted to cut it open. I fished a stout wire through the guide slot, lifted the locking tab, and had it open in minutes. No damage. No drilling. No cutting. The fix was a $0.20 part.",
           url: "blog/liberty-safe-crush-washer.html" },
  macneale: { title: "From the Scrapyard to a Family Heirloom \u2014 Saving a Macneale & Urban Antique Safe",
              keywords: ["macneale","urban","macneale & urban","scrapyard","heirloom","restoration","antique","early 1900s","lettered dial","halls handle"],
              summary: "A Macneale & Urban antique safe from the early 1900s, saved from being scrapped. I opened it, serviced the mechanism, and gave it a new lease on life with a lettered dial and HHM handle hardware. Three photos show the restoration.",
              url: "blog/macneale-urban-antique-safe.html" }
};

// --- Tips & Tricks Knowledge ---
const TIPS = {
  dial_combo: { title: "How to Dial a Safe Combination",
               keywords: ["dial","combination","dialing","how to dial","group 1","group 2","4-3-2-1","5-4-3-2","L-R-L-R","R-L-R","turn left","turn right","s&g","sargent","lagard"],
               content: "For a standard Group 2 lock (3-number combo, L-R-L pattern):\n1st number \u2192 4 turns LEFT, pass it 3 times, stop on 4th\n2nd number \u2192 3 turns RIGHT, pass it 2 times, stop on 3rd\n3rd number \u2192 2 turns LEFT, pass it once, stop on 2nd\nTurn RIGHT slowly until the dial stops (85-95 range)\n\nGroup 1 locks (high security, GSA): 4 numbers, 5-4-3-2 pattern.\nAlways dial past zero 4 full turns before starting!",
               url: "blog/how-to-dial-safe-combination.html" },
  buying: { title: "Choosing the Right Safe",
            keywords: ["buy","purchase","choose","select","recommend","which safe","what safe","looking for","new safe","guide"],
            content: "Ask yourself: 1) What are you protecting? 2) Where will it go? 3) Main threat: fire/burglary/both? 4) How often accessed? 5) Budget?\n\nQuick guide: Documents \u2192 fire-rated safe | Guns \u2192 quality gun safe (Liberty, Cannon, AMSEC) | Cash/jewelry \u2192 TL-15 or TL-30 burglar rated | Quick daily access \u2192 electronic keypad\nFire ratings: Class 350 (documents), Class 150 (media). Burglary ratings: RSC (basic), TL-15/30 (serious), TRTL (maximum).",
            url: "blog/choosing-right-safe.html" },
  fire: { title: "Safe Fire Ratings Explained",
          keywords: ["fire rating","fire rated","UL","class 350","class 150","1 hour","2 hour","fire protection","fireproof","fire resistant","media safe"],
          content: "UL fire ratings: Class 350 1-hour = 1700\u00b0F for 1 hour, interior under 350\u00b0F (good for paper). Class 350 2-hour = stronger. Class 150 1-hour = interior stays under 150\u00b0F (needed for digital media, photos, USB drives). Warning: storing digital media in a 350-rated safe can destroy it even in a 'successful' fire because 350\u00b0F melts electronics.",
          url: "blog/safe-fire-ratings.html" },
  opening: { title: "Safe Opening Methods: Expert vs Amateur vs Destructive",
             keywords: ["opening methods","safe opening methods","manipulation","drill","precision drilling","amateur destructive","professional destructive","4 methods","cost comparison"],
             content: "Four ways to open a safe: 1) Manipulation \u2014 listening to the wheels, no damage ($150-$350). 2) Precision drilling \u2014 one clean hole, then patched ($250-$500+). 3) Amateur destructive \u2014 sawzall, grinder, crowbar (totaled safe, $10K+ replacement). 4) Professional destructive \u2014 torch or rescue tools for emergency access. Always start with method 1 if possible.",
             url: "blog/safe-opening-methods.html" },
  burglary: { title: "Safe Burglaries in Sacramento",
              keywords: ["burglary","burglar","thief","break in","theft","break-in","target","carry out","grinder","safe cracked"],
              content: "How thieves attack safes: 1) Carry it out (bolt it down!). 2) Pry it open with crowbars. 3) Grind through the door with angle grinders. 4) Punch the lock with a hammer and punch. Prevention: bolt the safe down, choose a TL-rated safe, install it in a visible area, use a high-quality lock. Most burglaries happen in under 10 minutes.",
              url: "blog/safe-burglary-news.html" },
  maintenance: { title: "Safe Maintenance & Inspection",
                keywords: ["maintenance","maintain","service","inspect","check","lubricate","oil","grease","care","monthly","quarterly","annual"],
                content: "Monthly (2 min): open and close once, wipe keypad. Quarterly (5 min): test combination, check for rust, inspect hinges. Annually: replace batteries, lubricate bolts/hinges (white lithium grease), check fire seal, professional service call recommended ($75-$150). Floor safes: check every 6 months for moisture. Gun safes: check interior lining and dehumidifier.",
                url: "blog/safe-maintenance.html" },
  child: { title: "Safes and Child Safety",
           keywords: ["child","children","kid","baby","safety","safe lock in","safe storage","firearm storage","gun child","child resistant"],
           content: "Three main risks with children and safes: 1) Child locked inside (climbed in and door closed behind them) \u2014 get a safe that can be opened from the inside. 2) Child accessing firearms \u2014 lock guns in a separate safe or use a cable lock. 3) Child fingers pinched in door mechanism. Best lock for families with kids: keypad electronic lock (no key to lose, no dial to hurt fingers).",
           url: "blog/safe-child-safety.html" },
  costs: { title: "Safe Repair vs Replacement Costs",
           keywords: ["repair cost","replacement cost","fix","replace","cost comparison","repair vs replace","when to repair","when to replace"],
           content: "Common scenarios: 1) Simple lockout (manipulation) \u2014 $100-$200. 2) Drill opening with repair \u2014 $250-$500+. 3) Amateur-destroyed safe \u2014 $1,000-$10,000+ for replacement. 4) Combination change \u2014 $50-$150. 5) New lock installed \u2014 $100-$250. Rule of thumb: if the safe body is intact and the repair costs less than half of a new safe, repair it. If the door is welded shut or the fire lining is destroyed, replace it.",
           url: "blog/safe-repair-costs.html" }
};

/* ==================== RESPONSE ENGINE ==================== */
function respond(input) {
  const q = input.toLowerCase().trim();

  function m(list) {
    return list.some(function(k) { return q.indexOf(k) !== -1; });
  }

  // Off-topic detection
  const safeTopics = ["safe","lock","key","dial","combo","combination","code","keypad","biometric","bolt","handle","hinge","door","open","close","jammed","stuck","rust","corrosion","relocker","solenoid","spring","battery","dead","fire","burglary","burglar","thief","drill","manipulation","spin","right","left","turn","call","phone","email","number","hours","price","cost","quote","estimate","license","lco","insured","buy","purchase","choose","select","recommend","maintenance","service","repair","antique","vintage","floor","gun","rifle","pistol","document","cash","jewelry","commercial","tl-15","tl-30","trtl","amsce","gardall","sentry","s&g","sargent","lagard","kaba","mosler","liberty","cannon","stack-on","digital","electronic","mechanical","wheel pack","drive cam","change","reset","forgot","lost","hello","hi","hey","thanks","thank you","drop slot","deposit","tubular","emergency","weekend","after hours","frantz","sacramento","west sacramento","x-07","x-08","x-09","x-10","gsa","porta vault","probate","heirloom","scrapyard","restoration","walkthrough","photo","$3k","$6k","$3,000","$5,000","$7,000","$10,000","3,000","5,000","7,000","10,000","crush washer","bent wire","surgical","network","coverage","backup","protege","glazer","johnson pacific","macneale","macneale & urban","urban","tips","tip","tricks","article","story","read","blog","post","saw","guy","how to","ways to","method","noise","sound","warranty","guarantee","void"];

  if (!safeTopics.some(function(k) { return q.indexOf(k) !== -1; }) && !/^\d/.test(q)) {
    return "I'm sorry, I only answer questions about safes and locks. I'm Frantz's Safe Assistant. Try asking about safe opening, combination help, maintenance, or some of my real job stories. Or call (916) 534-4900 to talk to Robert directly.";
  }

  // ============ BLOG STORIES ============
  for (const sk in STORIES) {
    if (m(STORIES[sk].keywords)) {
      return STORIES[sk].title + "\n\n" + STORIES[sk].summary + "\n\n\u{0001F4D6} Read the full story: " + STORIES[sk].url + "\n\n\u{0001F4DE} (916) 534-4900";
    }
  }

  // ============ TIPS & TRICKS ============
  if (m(["dial sequence","dialing","how to dial","turn the dial","dial my safe","dial a combo","dial a combination","dial safe"]) || (q.indexOf("left") !== -1 && q.indexOf("right") !== -1 && q.indexOf("turn") !== -1 && q.indexOf("handle") === -1)) {
    return TIPS.dial_combo.content + "\n\n\u{0001F4D6} Full walkthrough: " + TIPS.dial_combo.url;
  }

  if (m(["buy","purchase","get a safe","new safe","what safe","recommend","looking for a","best safe","best brand","which brand","top brand","bought a safe","just bought"])) {
    return TIPS.buying.content + "\n\n\u{0001F4D6} Full buying guide: " + TIPS.buying.url + "\n\u{0001F4D6} Fire ratings: " + TIPS.fire.url;
  }

  if (m(["fire rating","fire rated","class 350","class 150"]) || (q.indexOf("fire") !== -1 && q.indexOf("protect") !== -1 && q.indexOf("story") === -1)) {
    return TIPS.fire.content + "\n\n\u{0001F4D6} Full guide: " + TIPS.fire.url;
  }

  if (m(["maintenance","maintain","lubricate","oil","grease","care","monthly","quarterly","annual"]) && !m(["stubborn","handle broken"])) {
    return TIPS.maintenance.content + "\n\n\u{0001F4D6} Full checklist: " + TIPS.maintenance.url;
  }

  // ============ LOCK TYPES ============
  if (m(["s&g","sargent","sargent & greenleaf","group 1","group 2"])) {
    return "Sargent & Greenleaf (S&G) are the industry standard for safe combination locks. They make Group 2 locks (3 numbers, 4-3-2-1 pattern) and Group 1 locks (4 numbers, 5-4-3-2 pattern, used in GSA containers).\n\nDial sequence: " + TIPS.dial_combo.content;
  }

  if (m(["tubular","ace lock","chicago lock","barrel key","round key"])) {
    return "Tubular lock: uses a round key with 7-8 pins in a circle. Common on fire safes and deposit safes. The key has a code number etched on the head. If you lose the key, a locksmith can cut a new one from the code. If no code, the lock can be picked or decoded. Push the tubular key in firmly, then turn clockwise. Don't bend the key \u2014 they're delicate.";
  }

  if (m(["electronic","digital","keypad"]) && m(["how","what","work"])) {
    return "Electronic keypad locks are battery-powered. You enter a code, the circuit board sends power to a solenoid, which releases the lock bar so you can turn the handle. Common brands: S&G, LaGard, Kaba Mas, Ilco. Pros: easy to use, quick access, can change code yourself. Cons: batteries die, electronics fail, some don't work in extreme cold. Always keep a key override accessible. Change batteries every 12 months.";
  }

  // ============ COMMON PROBLEMS ============
  // Forgot combo
  if (m(["forgot","forget","lost combination","lost code","lost combo","lost my combination","lost my combo","lost the combination","can't remember","don't know the","don't remember","standard combination","standard combo","default combination","default combo","factory combination","factory combo"])) {
    return "Try common factory combos first: 50-25-50, 20-40-60, 10-20-30, or 0-0-0 (with handle).\nCheck your paperwork \u2014 sometimes on warranty card or inside battery compartment.\nIf you have the lock serial number, I can look up the factory combo.\n\nIf none work: I can open it by manipulation ($150-$350) with no damage, or drill it ($250-$500+) and patch it. I always try manipulation first.\n\n\u{0001F4D6} Full guide: " + TIPS.costs.url;
  }

  // Battery
  if (m(["battery","dead","no power","not lighting","not beeping","9v","9 volt","jump"])) {
    return "Dead battery on a digital lock? Try these:\n1. Look for small metal contacts below the keypad\n2. Touch a fresh 9V battery to those contacts (polarity usually doesn't matter)\n3. Enter your code while holding the 9V in place\n4. If it opens, replace the internal batteries (usually 4x AA)\n5. If no contacts, look for a key override \u2014 a hidden keyhole under a sliding panel\n\n\u{0001F4A1} Use Duracell or Energizer, not cheap brands. Change every 12 months.\n\n\u{0001F4D6} More help: " + TIPS.costs.url;
  }

  // Won't open
  if (m(["won't open","can't open","safe locked","stuck closed","locked out","wont open","not opening","won't unlock"])) {
    return "Quick checks before calling:\n\u2022 Dial safes: did you dial 4 full turns past zero before starting? Most common mistake.\n\u2022 Electronic: is the battery dead? Try a 9V jump start (see above).\n\u2022 Is something inside blocking the door? (shelf fell, item shifted)\n\u2022 Is the handle in the right position? Some need horizontal.\n\u2022 Is the safe on uneven ground? Try shimming a corner.\n\n\u26A0\uFE0F DO NOT hammer the handle, pry the door, or use a crowbar. A $200 fix becomes $500+.\n\n\u{0001F4DE} Call (916) 534-4900 \u2014 I'll walk you through it or come out.";
  }

  // Solenoid / keypad lights up (must come BEFORE jammed rule to catch "won't turn" + keypad queries)
  if (!m(["biometric","fingerprint"]) && (m(["solenoid","solenoid issue","solenoid stick","solenoid jam","solenoid failure","solenoid lock","keypad lights up","lights up but","beeps but","lights up nothing","handle does not turn","handle not turning","keypad works","keypad beeps"]) || (q.indexOf("keypad") !== -1 && q.indexOf("lights up") !== -1) || (q.indexOf("beep") !== -1 && (q.indexOf("handle") !== -1 || q.indexOf("no" !== -1))))) {
    return "This sounds like the solenoid isn't releasing. When the keypad lights up and beeps correctly but the handle won't turn, the solenoid (a small electromagnet) may have failed, or a wire came loose.\n\n\u2022 Quick check: is the battery fresh? Low voltage can cause the keypad to work but the solenoid to not have enough power to pull.\n\u2022 If new batteries don't fix it: the solenoid likely needs replacement. It's a $20-$50 part plus labor.\n\nDo NOT keep hammering the handle \u2014 you can bend the lock bar. Call (916) 534-4900.";
  }

  // Jammed / stuck (with exclusion for keypad-related queries)
  if (!q.includes("keypad") && !q.includes("lights up") && m(["jammed","stuck","won't turn","not turning","dial stuck"])) {
    return "Don't force it! Check:\n\u2022 Is something inside the safe blocking the door? (shelf fell, box shifted)\n\u2022 Dial turns but doesn't engage wheel pack? Reset by turning left 4 full times.\n\u2022 Handle won't turn? The lock bar may be caught on a relocker.\n\u2022 Is the safe on uneven ground? A shim under one corner can fix alignment.\n\n\u26A0\uFE0F If you force it, you'll break the handle or lock. Call me instead.\n\n\u{0001F4DE} (916) 534-4900";
  }

  // Change combination
  if (m(["change combination","change combo","change my combo","change code","new combination","new code","set new","reset code"])) {
    if (m(["digital","electronic","keypad"])) {
      return "For most digital locks: open the safe, press the program/change button (often hidden behind a panel or inside the battery compartment), enter current code + #, enter new code + #, test 5 times with the door open before closing. Button locations vary by brand \u2014 check your manual. Call if you get stuck.";
    }
    return "For dial (mechanical) locks: changing the combination requires taking the lock apart. Not a simple DIY job \u2014 I can do it on-site for $50-$150. Takes about 15-30 minutes. Call (916) 534-4900 to schedule.";
  }

  // Pricing
  if (q.indexOf("feel") === -1 && q.indexOf("feels") === -1 && m(["cost","price","how much","estimate","quote","rate","fee","charge"])) {
    return "Typical pricing:\n\u2022 Simple lockout (no damage): $100-$200\n\u2022 Manipulation (non-destructive): $150-$350\n\u2022 Drill opening with patch/repair: $250-$500+\n\u2022 New lock installed: $100-$250\n\u2022 Combination change: $50-$150\n\u2022 Annual maintenance: $75-$150\n\n\u26A0\uFE0F If an amateur has already attacked the safe, costs go up \u2014 relockers and fire damage are expensive to fix.\n\n\u{0001F4D6} Full cost guide: " + TIPS.costs.url + "\n\n\u{0001F4DE} (916) 534-4900 for exact quote";
  }

  // License / about
  if (m(["license","licensed","insured","lco","4160","bsis","license number"])) {
    return "Frantz Locksmith Service\n\u2022 CA Locksmith License: LCO 4160\n\u2022 Issued by: California DCA \u2014 Bureau of Security & Investigative Services\n\u2022 Fully insured\n\u2022 GSA certified (X-07, X-08, X-09, X-10)\n\u2022 40+ years experience\n\nVerify my license: search.dca.ca.gov/advanced \u2014 search by name 'Robert Frantz' or license number 'LCO 4160'.";
  }

  // ============ SAFE OPENING METHODS ============
  if (m(["how to open","how safes are opened","safe opening methods","opening a safe","how do you open","ways to open","open a locked safe","opening method","safe opened","methods to open","how to get into","how to break into"])) {
    return "Safe Opening Methods:\n\n" + TIPS.opening.content + "\n\n\u{0001F4D6} Full article: " + TIPS.opening.url + "\n\u{0001F4DE} (916) 534-4900";
  }

  // Warranty / guarantee (catches general warranty questions, not just drilling)
  if (m(["warranty","guarantee","void","null and void","manufacturer warranty","safe warranty","warranty void","guarantee void"])) {
    return "Professional safe service does not void your warranty if done by an authorized, certified technician. Robert works directly with manufacturers who expect their techs to meet strict standards.\n\nKey points:\n\u2022 A clean, precision drill hole patched correctly = safe works like new, warranty stays intact.\n\u2022 An amateur drilling blind, hitting the relocker or fire lining = warranty voided, safe totaled.\n\u2022 Manipulation (non-destructive) is always attempted first when possible.\n\nIf you have a safe under warranty and need service, call (916) 534-4900. Robert knows the manufacturer requirements and will keep your warranty valid.";
  }

  // Drill — safe ruined? (also covers warranty/guarantee questions about drilling)
  if (m(["drill destroyed","drill ruin","drilling destroy","drill damage","drill safe damage","drill break","amateur drill","drill ruin safe","destroyed safe","totaled safe","drill fire","drill relocker","blind drill","drill trigger","drilling ruin","drilling ruined","ruin a safe","ruin my safe","destroy a safe","wreck my safe","safe wrecked","amateur destroyed","safe totaled","safe ruined"]) || (q.indexOf("drill") !== -1 && (q.indexOf("destroyed") !== -1 || q.indexOf("ruined") !== -1 || q.indexOf("totalled") !== -1 || q.indexOf("wreck") !== -1)) || (q.indexOf("destroyed") !== -1 && q.indexOf("safe") !== -1 && q.indexOf("still") === -1)) {
    return "Does drilling destroy a safe or void the warranty? It depends on who does it.\n\nProfessional drilling by an authorized tech: one clean 1/4-inch hole in the right spot, then patched. The safe works fine and the warranty stays intact. $250-$500+. Manufacturers expect their certified techs to service safes properly — that's why they train and certify us.\n\nAmateur drilling: misses the lock, hits the relocker, destroys fire lining, totals the safe, and absolutely voids the warranty. $10K+ to replace.\n\nAlways start with manipulation (no damage, $150-$350) before anyone drills.\n\n\u{0001F4D6} Full article: " + TIPS.opening.url + "\n\u{0001F4D6} Read the cheaper guy story: " + STORIES.cheaper.url + "\n\n\u{0001F4DE} (916) 534-4900";
  }

  // Hours
  if (m(["hours","available","weekend","after hours","emergency","call out"])) {
    return "\u{0001F4DE} (916) 534-4900\nMon-Fri: 9AM-4PM\nEmergency after-hours safe service available \u2014 call and leave a message, I'll call you back.\n\nMobile service only \u2014 I come to you in Sacramento, West Sacramento, and surrounding areas.";
  }

  // Contact
  if (m(["call","phone","email","contact","number","reach","message"])) {
    return "\u{0001F4DE} (916) 534-4900\n\u2709\uFE0F frantzlocksmith@hotmail.com\n\nSacramento & West Sacramento. I come to you. If I can't answer, leave a message and I'll call you back.";
  }

  // Broken handle
  if (m(["handle broken","handle won't turn","broken handle","handle spins","handle turns","handle not working"])) {
    return "Handle issues:\n\u2022 Handle spins freely: linkage is disconnected (broken weld or sheared pin)\n\u2022 Handle won't turn: locking bar is jammed or relocker is fired\n\u2022 Handle turns but bolts don't move: the drive cam is stripped\n\n\u26A0\uFE0F Don't use vice grips or a pipe wrench \u2014 you'll damage the handle spindle.\nMost handle repairs are under an hour. Call (916) 534-4900.";
  }

  // Relocker
  if (m(["relocker","secondary lock","triggered","fired relocker","drill blind","drill my safe"]) || (q.indexOf("drill") !== -1 && q.indexOf("lock") !== -1 && q.indexOf("won't open") !== -1) || (q.indexOf("drill") !== -1 && q.indexOf("own") !== -1 && q.indexOf("safe") !== -1)) {
    return "A relocker is a secondary lock that springs when someone drills or forces the main lock. Signs: handle turns freely but bolts won't retract. This is NOT a DIY fix. If someone already drilled your safe and it still won't open, the relocker fired. Call (916) 534-4900 \u2014 I deal with this regularly.";
  }

  // Rust
  if (m(["rust","corrosion","moisture","water","humid"])) {
    return "Rust in floor safes is common. Light surface rust: spray WD-40, work the dial back and forth. Corroded battery terminals: clean with vinegar on a Q-tip. Seized lock from rust: DO NOT force it \u2014 you'll snap the spindle. Prevention: silica gel packs inside the safe, open and check floor safes every 6 months.";
  }

  // Biometric
  if (m(["biometric","fingerprint","finger print","scanner"])) {
    return "Biometric lock troubleshooting:\n\u2022 Try a different finger (index and middle work best)\n\u2022 Dry skin? Breathe on the scanner for moisture\n\u2022 Dirty? Wipe with a dry cloth\n\u2022 Green light but lock won't open? Solenoid failed \u2014 needs service\n\u2022 Batteries drain fast on biometric locks \u2014 change every 6 months\n\nBiometric locks are convenient but the least reliable type. Always keep your backup key somewhere safe.";
  }

  // Lost key
  if (m(["lost key","broken key","key broke","key lost","missing key","key won't turn","lost the key","misplaced key"])) {
    return "\u2022 Tubular keys: code is on the key head \u2014 a locksmith can cut a new one\n\u2022 Standard safe keys: code may be on the lock cylinder face\n\u2022 No code? I can 'impression' a key by hand (takes skill, saves drilling)\n\u2022 Worst case: drill the lock and replace\n\nCall (916) 534-4900 \u2014 I can often make a key without damaging the lock.";
  }

  // Loose dial / wobbly dial
  if (m(["loose dial","dial loose","dial feels loose","dial wobbly","dial wobbles","loose combination dial"])) {
    return "A loose or wobbly dial usually means one of three things:\n\n\u2022 The dial is screwed onto the spindle loosely \u2014 tighten the set screw on the side of the dial knob.\n\u2022 The drive cam spring is worn \u2014 the dial feels sloppy when turning. This needs a spring replacement ($75-$150).\n\u2022 The spindle bearings are worn \u2014 common on floor safes and very old safes. Needs professional service.\n\nDo NOT keep turning a loose dial. You can strip the spindle threads. Call (916) 534-4900.";
  }

  // Broken spring/dial spins
  if (m(["dial spins","broken spring","no tension","drive cam spring"])) {
    return "Dial spins freely with no stop: the drive cam spring is broken. The dial won't engage the wheel pack, so the lock can't be opened normally. This is a straightforward repair \u2014 $75-$150 to take the lock apart and replace the spring. Don't keep spinning the dial \u2014 you can damage the wheel pack.";
  }

  // Floor safe
  if (m(["floor safe","in ground","inground","in-ground"]) || (q.indexOf("concrete") !== -1 && q.indexOf("safe") !== -1)) {
    return STORIES.johnson.summary.substring(0, 100) + "...\n\nFloor safes are excellent for burglary protection since they can't be carried away. Common issues: moisture rusts the lock, concrete settling jams bolts, hinge pins rust. Open and inspect yours every 6 months. Use silica gel packs inside.\n\n\u{0001F4D6} " + STORIES.johnson.url;
  }

  // Antique
  if (m(["antique","vintage","old safe","older","old safes","cast iron","heirloom","old lock"])) {
    return "I work on antique safes regularly. Two recent stories:\n\u2022 " + STORIES.macneale.summary + "\n\n\u2022 " + STORIES.johnson.summary + "\n\nBoth opened without damage. Antique safes are valuable \u2014 never force them open.\n\n\u{0001F4D6} " + STORIES.macneale.url + "\n\u{0001F4D6} " + STORIES.johnson.url;
  }

  // GSA / certs
  if (m(["gsa","x-07","x-08","x-09","x-10","government container","government certified","post office safe"])) {
    return STORIES.gsa.title + "\n\n" + STORIES.gsa.summary + "\n\nRobert is GSA certified X-07, X-08, X-09, and X-10 \u2014 these are the highest levels for government container service. If you need a GSA container serviced, call (916) 534-4900.\n\n\u{0001F4D6} " + STORIES.gsa.url;
  }

  // Liberty Safe
  if (m(["liberty","liberty safe"]) && !m(["liberty bell","statue of liberty"])) {
    return "I've worked on many Liberty safes. Two stories worth reading:\n\n\u2022 " + STORIES.crush.summary + "\n\n\u2022 " + STORIES.surgical.summary + "\n\nI'm a preferred service technician for Liberty Safe. Call (916) 534-4900 for Liberty safe service.\n\n\u{0001F4D6} " + STORIES.crush.url + "\n\u{0001F4D6} " + STORIES.surgical.url;
  }

  // Sacramento / service area
  if (m(["sacramento","west sacramento","natomas","service area","where do you serve","surrounding"])) {
    return "I serve Sacramento, West Sacramento, Natomas, and surrounding areas. Mobile service only \u2014 I come to you. Call (916) 534-4900 to schedule.";
  }

  // The cheaper guy / mistake
  if (m(["$3k","$6k","3,000","6,000","mistake","cheaper","cheap safe guy"])) {
    return STORIES.cheaper.title + "\n\n" + STORIES.cheaper.summary + "\n\n\u{0001F4D6} " + STORIES.cheaper.url;
  }

  // Blog / stories
  if (m(["blog","story","article","read","stories","safe stories"])) {
    return "Welcome to the blog! Here are my safe stories:\n\n1. " + STORIES.gsa.title + "\n2. " + STORIES.cheaper.title + "\n3. " + STORIES.network.title + "\n4. " + STORIES.surgical.title + "\n5. " + STORIES.johnson.title + "\n6. " + STORIES.crush.title + "\n7. " + STORIES.macneale.title + "\n\nWhat would you like to hear about?\n\n\u{0001F4D6} All stories: blog/index.html";
  }

  // Tips & Tricks
  if (m(["tips","tip","tricks","education","learn"])) {
    return "\u{0001F4A1} Tips & Tricks articles:\n1. How to Dial a Safe Combination\n2. Choosing the Right Safe\n3. Safe Fire Ratings Explained\n4. Safe Opening Methods\n5. Safe Burglaries in Sacramento\n6. Safe Maintenance & Inspection\n7. Safes and Child Safety\n8. Safe Repair vs Replacement Costs\n\n\u{0001F4D6} All tips: tips.html";
  }

  // Hello / greeting
  if (q.length < 20 && m(["hi","hello","hey","sup","good morning","good afternoon"])) {
    return "Hi there! I'm Frantz's Safe Assistant. I can help with:\n\u2022 Safe won't open\n\u2022 Forgotten combination\n\u2022 Dead battery\n\u2022 Dialing instructions\n\u2022 Pricing and quotes\n\u2022 Safe buying advice\n\u2022 Real stories from Robert's 40+ years\n\nWhat can I help you with?";
  }

  // Thanks
  if (m(["thanks","thank you","appreciate it","helpful","appreciate"])) {
    return "You're welcome! I'm glad I could help. If you need anything else safe-related, just ask. Or call Robert directly at (916) 534-4900.";
  }

  // About Robert
  if (m(["who are you","who is","robert","about","tell me about","owner","company"])) {
    return "I'm Frantz's Safe Assistant. Robert Frantz is the owner of Frantz Locksmith Service \u2014 a safe specialist in Sacramento since 1985. He's got 40+ years of experience, CA LCO 4160 license, GSA certified (X-07 through X-10), licensed and insured. He services safes of all types: gun safes, floor safes, antique safes, commercial safes, and government containers. Mobile service only \u2014 he comes to you.\n\n\u{0001F4DE} (916) 534-4900";
  }

  
  

  // ============ COMBINATION LOCK DIAL TYPES ============
  if (m(["s&g green dial","s&g silver dial","la gard dial","kaba mas dial","digital safe","dial markings","preset dial","direct drive dial"])) {
    return "Dial types you will encounter:\n\n\u2022 S&G (Sargent & Greenleaf): green or silver body. 3 numbers for Group 2, 4 numbers for Group 1 (GSA). Standard industry dial.\n\u2022 LaGard: common on older safes. Dial spins smoothly.\n\u2022 Kaba Mas: high-security electronic + mechanical hybrid. Touchscreen models available.\n\u2022 Preset Dials (S&G 3070): numbers are fixed at the factory, not changeable without a locksmith. Always labeled on the side.\n\u2022 Direct Drive: the dial is directly connected to the wheel pack. No spring drive. Must be careful not to overshoot the numbers.\n\nIf your dial feels different than usual or the numbers do not line up, call (916) 534-4900 to get it checked.";
  }

  // ============ WHEELPACK / DRIVE CAM / FLYWHEEL ============
  if (m(["wheel pack","wheelpack","wheels","flywheel","drive cam","spider spring","snail cam","wheel alignment","wheel gate","false gate"])) {
    return "Inside a safe combination lock:\n\n\u2022 Wheel Pack: stack of rotating wheels, each with a gate (notch). When all gates align, the fence drops in and allows retraction.\n\u2022 Drive Cam: connects the dial to the wheel pack. Has a flywheel that creates the snail motion feel when dialing.\n\u2022 Flywheel: allows the dial to spin freely when disengaged. You will feel it snap into engagement as you start dialing.\n\u2022 Gates: slots cut into each wheel. The lock opens when all gates line up under the fence. False gates exist to confuse manipulation attempts.\n\u2022 Spider Spring: holds the wheel pack together. If it breaks, the wheels can slide out of position.\n\nA misaligned wheel pack means the dial feels wrong and the safe will not open. This requires professional service.";
  }

  // ============ SAFE INSULATION / FIRE LINING ============
  if (m(["fire insulation","fire lining material","concrete safe","gypsum","drywall safe","vermiculite","perlite","ceramic wool","insulation material","poured insulation"])) {
    return "Safe fire insulation materials:\n\n\u2022 Gypsum/Drywall: common in entry-level gun safes. Minimal real fire protection.\n\u2022 Vermiculite: volcanic mineral, lightweight, excellent insulator. Used in older quality safes.\n\u2022 Perlite: similar to vermiculite, used in modern fire safes.\n\u2022 Ceramic wool: premium insulation used in high-end safes. Withstands extreme temperatures.\n\u2022 Poured concrete/cement mix: used in burglar-rated and TRTL safes. Massive, heavy, fire-resistant.\n\nThe difference between a cheap drywall-lined safe and a proper fire safe is the difference between a $300 replacement and keeping your documents through a house fire. When an amateur cuts into a fire safe with a sawzall, they destroy the insulation and void the fire rating permanently.";
  }

  // ============ SAFE LINKAGES ============
  if (m(["linkage","locking bolt","bolt work","bolt retraction","drive bar","locking bar","linkage bar","connecting bar","scissor lock","scissor bolt"])) {
    return "Safe locking mechanisms:\n\n\u2022 Standard bolts: solid steel bars that slide into the door frame. 3 sides (top, bottom, side) on most gun safes.\n\u2022 Re-locking linkage: a secondary bar or dead bar that activates when the primary lock is attacked.\n\u2022 Scissor link / lazy bolt: multiple bolts connected by a scissor mechanism. All retract simultaneously. Used in TL-rated safes.\n\u2022 Direct drive: handle connects directly to the bolt work through a simple cam. Less mechanical advantage but simpler.\n\u2022 Gear-driven: handle turns a gear that retracts a rack-and-pinion mechanism. Smoother and more reliable.\n\nCommon failure: connecting bars bend, shear pins break, welds fail on the drive cam. The handle may spin freely but the bolts do not move. This is fixable without replacing the safe.";
  }

  // ============ SAFE SHELL / BODY CONSTRUCTION ============
  if (m(["safe shell","body wrap","body construction","welded body","seamless body","corner seam","seam welds","sheet metal safe","monolithic safe","wrapped shell","safe body","safe build"])) {
    return "Safe body construction quality:\n\n\u2022 Wrapped shell: a single piece of sheet metal bent into a U-shape, welded at one corner. Found on budget safes. Attacked easily at the single welded seam.\n\u2022 Welded plate: individual steel plates welded together at every edge. Significantly stronger than a wrapped shell.\n\u2022 Monolithic: a single casting or forging. Extremely rare and expensive (TRTL-60 level).\n\u2022 Lamination: layers of steel and composite material bonded together. Used by AMSEC, Gardall, and other premium brands.\n\nThe number of welds and the thickness of the steel directly correlates with time to defeat. Most homeowners do not know their expensive-looking safe has a single seam that can be peeled open with a pry bar.";
  }

  // ============ HARDPLATE ============
  if (m(["hardplate","hard plate","drill plate","drill shield","ballistic plate","torch shield","hardened steel plate","armor plate"])) {
    return "Hardplate is a piece of hardened steel (often 1/8-inch to 1/2-inch thick) positioned over the lock area of a quality safe. Purpose: prevent drilling attacks on the combination lock.\n\n\u2022 A standard drill bit will not penetrate hardplate. It just skids off.\n\u2022 Techs use: carbide burrs, solid carbide drills, magnetic drills, or center punches to get through.\n\u2022 Some high-end safes have multiple hardplates layered with torch-resistant materials.\n\nA real safe tech knows exactly which type of hardplate is in your safe and has the right tools to drill through it without destroying the safe. An amateur hits hardplate and either gives up or starts grinding through the door like a madman.";
  }

  // ============ SAFE HINGES ============
  if (m(["safe hinge","hinge","exposed hinge","hidden hinge","soss hinge","external hinge","internal hinge","hinge pin","piano hinge","ball bearing hinge","knuckle hinge"])) {
    return "Safe hinge types:\n\n\u2022 External hinges: visible when the door is closed. The hinge pin can be cut (but quality safes have hardened pins). Common on gun safes and budget models.\n\u2022 Internal hinges: hidden inside the door jamb when closed. Cannot be cut when the safe is locked. Found on TL-rated and higher safes.\n\u2022 Soss hinges: hidden hinges that are invisible when the door is closed. Rare on safes.\n\u2022 Hinge pin removal: a common amateur attack (grind off the hinge). Only works on safes with external hinges. Internal hinges eliminate this vulnerability.\n\nFor maximum security, always choose a safe with internal hinges. They cost more but eliminate a major vulnerability.";
  }

  // ============ DEPOSIT / DROP SLOT SAFES ============
  if (m(["deposit safe","drop safe","deposit slot","drop slot","night drop","cash drop","rotary hopper","dip safe","drop drawer"])) {
    return "Deposit safes allow money or items to be inserted without opening the main door. Types:\n\n\u2022 Rotary hopper: a rotating drum that accepts items, then dumps them inside when rotated. Common in convenience stores.\n\u2022 Drop slot: a trap-door slot. Items fall directly into the safe body. Less secure.\n\u2022 Drop drawer: a drawer that pulls out and the contents drop inside when pushed back in. Better for larger items.\n\nDeposit safes are vulnerable at the hopper/drawer mechanism. An informed thief knows to fish or string items through the slot. Some models have anti-fish baffles or trap plates inside. Good deposit safes are TL-15 or TL-30 rated with an anti-fish trap. Have yours inspected yearly.";
  }

  // ============ KEY OVERRIDE / KEY BYPASS ============
  if (m(["key override","override key","bypass key","backup key","key bypass","keyed bypas","secondary override"])) {
    return "Key overrides are emergency keys that bypass the electronic or combination lock. Common on digital keypad safes and some combination locks.\n\n\u2022 Location: often hidden behind a sliding panel, beneath the keypad, or on the side of the lock housing.\n\u2022 Tubular key: most common (7-pin round key). Code stamped on the key head. Duplicate from code.\n\u2022 Standard pin key: less common. May be Medeco or other restricted keyway.\n\nWARNING: If someone has access to your override key, they have access to your safe. Do NOT store the override key inside the safe. Do NOT tape it to the bottom. Do NOT hang it on a hook nearby. Give it to a trusted family member or put it in a safety deposit box.";
  }

  // ============ MANIPULATION LOCK READING ============
  if (m(["manipulation","manipulation technique","manipulate","listening to wheels","feel manipulation","graphing manipulation","scope manipulation","lock reading","wheel reading"])) {
    return "Manipulation is the art of opening a combination lock without damaging it by feeling and hearing the wheel pack through the dial. It is the highest skill in safe tech.\n\n\u2022 Contact points: the feel of each wheel dropping into position as you dial.\n\u2022 Gate detection: when a wheel gate passes under the fence, there is a subtle but detectable change in tension or sound.\n\u2022 Graphing: some techs use a dial indicator gauge to plot wheel positions on paper, then use those graphs to calculate the combination mathematically.\n\u2022 Average time: 15 minutes to 4 hours depending on lock complexity. No damage.\n\nRobert attempts manipulation on every service call before drilling. It costs more upfront ($150-$350) but saves the safe. Only experienced techs with 10+ years can do it reliably. A safe guy with a sawzall will not even try.";
  }

  // ============ SAFE SCOPING / BOROSCOPE ============
  if (m(["boroscope","borescope","fiberscope","endoscope","wall scope","scope hole","scope safe","camera scope","inspection camera"])) {
    return "Safe scoping uses a tiny camera (boroscope) inserted through a small drilled hole (1/8-inch or smaller) to see inside the lock mechanism.\n\n\u2022 Purpose: visually locate wheel positions, relockers, and wiring without fully dismantling anything.\n\u2022 Hole size: typically 1/16-inch to 1/8-inch. Barely visible afterwards and easy to plug.\n\u2022 What we see: wheel gates, relocker spring positions, solenoid placement, wiring conditions.\n\nScoping is a precision technique between manipulation and drilling. It gives the tech visual confirmation before committing to a drill point. Not all techs have or use a boroscope. Robert does for complex jobs.";
  }



  // ============ SAFE BRAND KNOWLEDGE ============
  if (m(["amsce","amsec","gardall","mosler","diebold","stellar","major safe","browning","fort knox","hayman","mcmahon","herring","merril","national safe","j j taylor","chubb","ratner","kaso","apacs","ketcham","ball","patterson","waltz","lebeaux"])) {
    return "Quality safe brands Robert knows and works on:\n\n\u2022 AMSEC: American Security. Premium. Used by GSA. TL and TRTL ratings. One of the best.\n\u2022 Gardall: excellent U.S. made. Great value for serious protection.\n\u2022 Mosler: historic brand. Some of the best safes ever built (the GSA 5C vaults).\n\u2022 Diebold: bank vaults and safes. Massive and virtually impenetrable.\n\u2022 Liberty: most common gun safe brand. Robert is a preferred service tech.\n\u2022 Fort Knox: high-end gun safes. Full plate steel construction.\n\u2022 Hayman / Herring: antique safes. Cast iron, ornate, valuable.\n\u2022 National Safe: U.S. made commercial safes.\n\nI have 40+ years experience on all of these. Call (916) 534-4900.";
  }

  // ============ SAFE STANDARDS (UL / ETL / GSA) ============
  if (m(["ul standard","ul 687","ul 768","ul 1030","ul 1040","etl","csa","ansi","iso 9001","safety standard","testing standard","safe certification"])) {
    return "Safe safety standards:\n\n\u2022 UL 687: commercial burglar-resistant safes (TL-15, TL-30, TL-30x6, TRTL-30x6).\n\u2022 UL 768: combination locks (Group 1, Group 2, Group 2M).\n\u2022 UL 1030: residential security containers (RSC). Minimum standards.\n\u2022 UL 1037: anti-theft alarms.\n\u2022 ETL / CSA: alternate testing labs. Less recognized than UL for insurance purposes.\n\u2022 GSA Specification: Federal Specification AA-D-600-D (for government security containers). More stringent than UL.\n\nWhen buying a safe, trust UL or GSA ratings over marketing claims. A safe that says residential security container without a UL label is weaker than one with UL RSC certification.";
  }

  // ============ LOCKSMITH TOOLS ============
  if (m(["locksmith tools","lock pick set","tension wrench","pick gun","electric pick","broken key extract","plug spinner","key extract","lock shim","decoder tool","lock lubricant","graphite","wd40","wd-40","wd 40","houdini lock"])) {
    return "Common locksmith tools:\n\n\u2022 Pick Set: hooks, rakes, diamonds, city rakes. Used for manual picking.\n\u2022 Tension Wrench: applies rotational pressure. Essential. A locksmith always has several sizes.\n\u2022 Pick Gun (electric/manual): strikes all pins simultaneously. Faster but less precise.\n\u2022 Broken Key Extractor: thin hook-ended tool to fish out snapped keys.\n\u2022 Plug Spinner: rotates the plug 180 degrees to align pins after picking.\n\u2022 Key Decoder: measures pin depths from a key or lock to cut replacement keys.\n\nRegarding lubricants: NEVER use WD-40 on locks. It attracts dust and gums up over time. Use graphite powder or Houdini lock lubricant. WD-40 is a cleaner, not a lubricant. For safes, white lithium grease on the bolts, silicone spray on hinges.";
  }

  // ============ SAFE MOVING / INSTALLATION ============
  if (m(["safe moving","move a safe","safe delivery","safe install","install safe","safe position","leveling safe","anchor safe","bolt down","bolting safe","bolt to floor","concrete anchor","hilti anchor","safe dolly","lifting strap","safe skates"])) {
    return "Safe moving and installation:\n\n\u2022 I do not move safes myself. But I can advise.\n\u2022 Professional safe movers use: piano dollies, safe skates, lifting straps, ratchet straps.\n\u2022 Always bolt your safe to the floor: use concrete wedge anchors (Hilti or similar) into the slab. A 500 lb unsecured safe can be tipped and wheeled out by two thieves in 3 minutes.\n\u2022 Leveling: if the safe door frame twists from being on uneven ground, the door will not close or open properly. Use steel shims under the corners.\n\u2022 Fire rating: bolting a fire safe to concrete does not affect its fire rating. Do it.\n\nFor safe installation anchoring and leveling advice, call (916) 534-4900.";
  }

  // ============ KEY CONTROL / RESTRICTED KEYWAYS ============
  if (m(["key control","restricted key","key duplicate","cannot copy","do not duplicate","patented key","key patent","keyway patent","medeco keyway","mul-t-lock keyway","abloy keyway","m a s t e r keyway","security key","key access control"])) {
    return "Key control systems prevent unauthorized key duplication:\n\n\u2022 Restricted keyways: special key blank profiles only available to authorized dealers and locksmiths.\n\u2022 Patented keyways: protected by patent. Only the manufacturer can produce blanks.\n\u2022 Medeco: patented key control. Keys have angled cuts plus standard bitting. Cannot be duplicated without authorization card.\n\u2022 Mul-T-Lock: telescoping pins, dimple key. Extremely difficult to pick or copy.\n\u2022 Abloy: disc detainer. Key can only be made by authorized Abloy dealers using a code card.\n\nThe Do Not Duplicate stamp is not legally enforceable. Only patented or restricted designs actually prevent duplication. Pros: tenant moves do not require rekeying entire buildings. Employees cannot make copies without escrow.";
  }

  // ============ PADLOCKS ============
  if (m(["padlock","pad lock","combination padlock","key padlock","shrouded padlock","close shackle","hasp lock","master lock","american lock","abus","puck lock","laminated padlock","hardened padlock","s&g padlock"])) {
    return "Padlock types and security:\n\n\u2022 Laminated: layers of steel riveted together. Master Lock, American Lock. Cheap and common, but susceptible to shimming and hammer attacks.\n\u2022 Hardened body: solid steel body, hardened shackle. Abloy, Abus, Sargent & Greenleaf. Much more secure.\n\u2022 Shrouded / Close Shackle: the shackle is covered by the lock body. Cannot be cut with bolt cutters. S&G 8077 is an example.\n\u2022 Combination: no key, resettable combo. Convenient but less secure.\n\nFor commercial security: use at least a hardened body padlock with close shackle. Pair it with a hardened hasp. The lock is only as strong as the hasp it connects to. Never use a Master Lock for anything you actually care about.";
  }

  // ============ KEY BLANK IDENTIFICATION ============
  if (m(["key blank","identify key","what key is this","what lock uses this key","key identification","key type","flat key","key identify","ilco","curtis key","silca"])) {
    return "Key identification basics:\n\n\u2022 Flat steel key: standard household key (Schlage, Kwikset). Blade has 5-6 cuts on one edge. Most common.\n\u2022 Double-sided key: cuts on both edges. Found on some deadbolts and padlocks.\n\u2022 Four-sided key: key works in 4 orientations. Rare. Found on some high-security locks.\n\u2022 Tubular key: round shaft with 7 pins on the end. Safes, vending machines, computers. Code on key head.\n\u2022 Dimple key: flat key with drilled holes instead of edge cuts. Mul-T-Lock, Kaba, some BMWs.\n\u2022 Laser-cut / sidewinder: groove in center of blade. Car keys mostly.\n\nIf you have a key and do not know what it is for, I can identify it. Call (916) 534-4900.";
  }

  // ============ COMMERCIAL LOCK INSTALLATION ============
  if (m(["commercial installation","commercial install","store front lock","storefront door","glass door lock","aluminum door lock","mortise lock","bore lock","door prep","closer install","door hardware install"])) {
    return "Commercial lock installation is different from residential:\n\n\u2022 Grades: Grade 1 (Heavy Duty Commercial), Grade 2 (Light Commercial), Grade 3 (Residential). Always use Grade 1 for business doors.\n\u2022 Mortise locks: the gold standard. Lock body fits inside a rectangular pocket cut into the door edge. Strongest option.\n\u2022 Bored / cylindrical locks: circular hole through the door. Common on interior offices. Grade 1 versions exist.\n\u2022 Panic bars: required by building code for most public-egress doors (NFPA 101). Fire code requires them to fail OPEN.\n\u2022 Electric trim: electrified lock trim on a panic bar. Allows remote release from a card reader or central system.\n\u2022 Door prep: requires precision. If the backset or bore is off by 1/16-inch, the lock will not work properly.\n\nI do precision commercial installs. Call (916) 534-4900 for business doors.";
  }

  // ============ SLIDING DOOR / WINDOW SECURITY ============
  if (m(["sliding door","sliding glass","patio door","window lock","casement window","double hung window","window security","pin lock","charley bar","charlie bar","window latch","compression latch"])) {
    return "Window and sliding door security:\n\n\u2022 Sliding glass door: place a Charley Bar (rigid metal bar) in the track. It prevents the door from being pried open even if the latch is bypassed. Or drill through the frame and insert a pin.\n\u2022 Double hung windows: drill a hole at an angle through the top of the lower sash into the bottom of the upper sash, insert a pin.\n\u2022 Casement windows: lock the crank handle. Many can be latched from the inside only.\n\nFor basic residential window security, the pin method is free and highly effective. For businesses with large windows, consider laminated glass or window film. Standard window locks are easily bypassed with a credit card or butter knife.";
  }

  // ============ SMART LOCKS ============
  if (m(["smart lock","wifi lock","wi-fi lock","bluetooth lock","zwave lock","z wave lock","august lock","schlage encode","keyless entry","phone lock","app lock","smart home lock","homekit","alexa lock","google lock","geofence"])) {
    return "Smart lock types and concerns:\n\n\u2022 WiFi locks (Schlage Encode, August Wi-Fi): connect directly to your home network. Convenient for remote access and monitoring.\n\u2022 Bluetooth/Z-Wave locks (Yale, Kwikset Halo): connect through a hub or phone. Usually simpler, less cloud dependency.\n\u2022 Biometric: fingerprint or face recognition. Convenience trade-off for reliability.\n\n\u2022 Smart lock downsides: firmware bugs, wifi outage, power outage, app updates breaking connectivity. Always keep the physical key override for backup. A smart lock is only as reliable as your wifi and your phone battery. Also: insurance might not cover a break-in if the door was unlocked via a compromised app.\n\nRobert's recommendation: use a traditional deadbolt as the primary lock and add a smart lock for convenience. Never rely on a smart lock as your sole defense.";
  }

  // ============ LOCK BYPASS METHODS ============
  if (m(["lock bypass","bypass lock","credit card lock","loid","loiding","shim lock","slim jim","under the door","air wedge","door wedge","wire coat hanger","fish wire"])) {
    return "Common lock bypass methods (and how to defend):\n\n\u2022 LOIDing / Credit Card: sliding a credit card between the door and frame to push the latch back. Prevention: use a deadbolt or a latch guard.\n\u2022 Shimming: inserting a thin metal shim to slide the latch back. Prevention: closed-shackle latch, guard plate.\n\u2022 Wire under the door: hooking the latch release through a gap. Prevention: weatherstripping that seals the gap.\n\u2022 Slim Jim (car doors): long tool that reaches inside the door to manipulate the linkage. Prevention: newer cars have linkage guards.\n\nMost of these methods work on unsecured locks with visible latches. A properly installed deadbolt prevents almost all of them. For commercial doors, a wrap-around latch guard or armored front plate is recommended.";
  }

  // ============ INSURANCE AND SAFES ============
  if (m(["insurance","insurance requirement","safe for insurance","homeowner insurance","renters insurance","business insurance","jewelry rider","gun safe insurance","jewelry safe","safe contents","insurance rider"])) {
    return "Insurance considerations for safes:\n\n\u2022 Homeowners insurance: a UL-rated safe (even just RSC) can lower your policy rate. Ask your agent.\n\u2022 Jewelry and Guns: standard homeowners has limited coverage. You need a separate rider or inland marine policy.\n\u2022 Business insurance: policies often mandate minimum safe ratings. TL-15 or higher for cash over certain thresholds.\n\u2022 Fire coverage: a fire-rated safe proves you took reasonable precautions. Claims denied if valuables stored in an unrated box.\n\nPro tip: photograph everything inside the safe. Keep the photos off-site (cloud or safety deposit box). Serial numbers for guns. Appraisals for jewelry. Without proof of ownership, insurance may not pay the full value.\n\nCall (916) 534-4900 for a safe consultation. I can tell you what rating you need for your coverage.";
  }

  // ============ GENERAL SAFE TROUBLESHOOTING ============
  if (m(["troubleshoot","troubleshooting","safe checklist","quick check","safe diagnosis","diagnose safe","whats wrong","safe wont close","door wont close","door hits frame","sticks halfway","binds","drooping door","sagging door","door sag","door binding","safe drooping","safe sagging","drooping safe","door sagging","noise","weird noise","strange noise","grinding noise","clicking noise","rattling","making a noise","loud noise","odd noise","strange sound","funny sound","safe making","clicking","clicking sound","grinding sound","making a sound","scraping"]) || (q.indexOf("sound") !== -1 && q.indexOf("safe") !== -1) || (q.indexOf("click") !== -1 && q.indexOf("safe") !== -1) || (q.indexOf("grind") !== -1 && q.indexOf("safe") !== -1)) {
    return "Common problems and quick checks:\n\n\u2022 Will not open at all: dead battery? Did you dial correctly? Is something blocking the door inside?\n\u2022 Dial spins freely: broken drive cam spring. Needs repair.\n\u2022 Handle turns but nothing happens: the locking bar is disconnected or the relocker fired.\n\u2022 Door will not close or sticks: hinges need adjustment or the safe settled (especially floor safes). Check for debris in the bolt holes.\n\u2022 Safe drooping (door sag): the lower hinge has worn or bent. Needs hinge pin replacement or shimming.\n\u2022 Keypad lights up but handle will not turn: solenoid failure or the lock bolt is binding.\n\nIf it is not obvious from the checklist, call (916) 534-4900. Quick diagnosis over the phone is free.";
  }

  // ============ WALL / DIVERSION / SPECIALTY SAFES ============
  if (m(["wall safe","diversion safe","fake book safe","medicine cabinet safe","can safe","soda can safe","book safe","clock safe","hidden safe","in wall safe","wall cavity","recessed safe","closet safe"])) {
    return "Specialty safe types:\n\n\u2022 Wall safes: recessed between studs in a wall. Discreet, easy to conceal. Typically thin-walled and not fire-rated. Vulnerable to being cut out of the wall. Good for documents and spare cash, not for serious valuables.\n\u2022 Diversion safes: fake cans, books, rocks, outlets. Hidden in plain sight. Useful for small cash but a determined burglar knows to check the pantry and bookshelf. No fire protection.\n\u2022 Medicine cabinet safes: lockable cabinet. Gives a false sense of security. Thin metal, easily pried.\n\nRecommended: a wall safe from Gardall or AMSEC with proper anchoring. Ideally paired with a floor safe for heavier items. Anything screw-mounted or hollow can be ripped out.";
  }

  // ============ GUN SAFE SPECIFIC ============
  if (m(["gun safe","gun safe size","gun safe weight","gun safe rating","gun safe fire","firearm safe","weapon safe","rifle safe","pistol safe","quick access gun safe","nightstand safe","bedside safe","gun vault","stack on","browning gun safe","cannon gun safe","winchester safe"])) {
    return "Gun safe recommendations:\n\n\u2022 Size: a 24-gun safe holds about 12-15 long guns. Manufacturers count pistols to inflate numbers. Go one size larger than you think.\n\u2022 Fire rating: many gun safes advertise fire rating but the insulation is minimal sheetrock. Real fire-rated gun safes have poured ceramic or cement composite.\n\u2022 Steel thickness: 12-14 gauge is standard. 10-11 gauge is good. 7 gauge (1/8-inch) or thicker is excellent. Anything less than 14 gauge is a sheet metal box.\n\u2022 Quick-access bedside: mechanical simplex lock is more reliable than electronic. Electronic keypads fail at the worst time (adrenaline, dead batteries).\n\n\u2022 Brands Robert trusts: Liberty (preferred service tech), Fort Knox, AMSEC, Browning. Avoid Stack-On and Winchester for critical use (thin steel, poor locks).\n\nCall (916) 534-4900 for gun safe consultation. I can recommend the right size and lock type for your collection.";
  }

  // ============ EMERGENCY LOCKOUT ============
  if (m(["lock out","lockout","locked out","emergency lock out","urgent safe","emergency open","emergency safe","emergency call"])) {
    return "Locked out? Call immediately if:\n\n\u2022 You are locked out of your home or safe at an inconvenient time.\n\u2022 Someone is trapped inside a walk-in safe or vault.\n\u2022 A business cannot open for the day because the safe will not open.\n\u2022 You locked keys inside a car or building.\n\nDo NOT try to break in yourself. You will damage the door, frame, or lock. A $200 service call becomes a $2,000+ repair.\n\nCall (916) 534-4900. If I cannot answer, leave a message and I will call you back. Emergency after-hours service is available.";
  }

  // ============ COMBINATION CHANGE PROCEDURE ============
  if (m(["change combination procedure","changing combo","how to change combination","recombination","recombination of lock","change combo mechanically","read the combo","decode combo"])) {
    return "Changing a mechanical lock combination properly:\n\n\u2022 Tools required: wheel puller, combination change key (or special tool), new wheel pack set, lock mounting screws. Not a 5-minute DIY job.\n\u2022 Steps for a standard S&G lock:\n  1. Remove the lock from the door.\n  2. Use a wheel puller to remove each wheel.\n  3. Place each wheel at the correct new number on the drive cam.\n  4. Secure wheels with spacers and clip.\n  5. Test the new combination 5+ times with the door open.\n  6. Reinstall lock in safe.\n\n\u2022 Cost: $50-$150 including a technician coming to your site.\n\n\u2022 Warning: if you drop the wheels or put them back in the wrong order, the lock will jam and you will be locked out with an inoperable safe.\n\nCall (916) 534-4900 to schedule a combination change.";
  }

  // ============ KEYPAD vs DIAL (Mechanical vs Electronic) ============
  if (m(["keypad vs dial","mechanical vs electronic","dial vs keypad","dial vs electronic","mechanical lock vs electronic","which is better keypad","electronic lock pros and cons","mechanical lock pros and cons","simplex lock","push button lock","mechanical push button","dial lock vs","mechanical lock better","keypad or dial"])) {
    return "Mechanical (dial) vs Electronic (keypad) locks:\n\n\u2022 Mechanical dial: no batteries, never dies, no electronics to fail. Lasts decades. Slower to open. More secure (harder to bypass). Best for long-term storage and gun safes that are accessed rarely.\n\u2022 Electronic keypad: quick open, easy code change. Vulnerable to battery failure, solenoid failure, circuit board failure. Convenient for daily use safes.\n\u2022 Simplex / mechanical push button: no batteries, uses a mechanical combination mechanism. Popular for gun safes and secure rooms. Best balance of speed and reliability.\n\nRoberts recommendation: mechanical or Simplex for anything you absolutely must secure. Electronic for everyday convenience safes. For guns, a Simplex lock is the gold standard.";
  }
// ============ LOCKSMITH KNOWLEDGE ============

  // Pin tumbler locks
  if (m(["pin tumbler","pin lock","standard lock","cylinder lock","how a lock works","schlage","kwikset"])) {
    return "Pin tumbler locks are the most common type in homes and businesses. Inside the cylinder are 5-7 spring-loaded pins that align at the shear line when the correct key is inserted. When aligned, the plug turns and retracts the latch or deadbolt.\n\nHigher security versions use: security pins (spool, serrated, mushroom) to resist picking, restricted keyways (Medeco, Mul-T-Lock), or bump-resistant designs.\n\nCall (916) 534-4900 for lock service or replacement.";
  }

  // Wafer & disc locks
  if (m(["wafer lock","wafer tumbler","disc lock","disc tumbler","file cabinet lock","cabinet lock","mailbox lock","locker lock","cam lock","desk lock"])) {
    return "Wafer locks use flat wafers instead of pins. Found in file cabinets, mailboxes, lockers, desks, cam locks, and some padlocks. Wafers are spring-loaded and align at the shear line when the correct key is inserted. Less secure than pin tumbler locks. Common on inexpensive cabinets and utility applications. If a better lock is needed, I can rekey the cabinet to a higher-security cylinder or suggest an upgrade.";
  }

  // Disc detainer locks
  if (m(["disc detainer","detainer lock","rotating disc","rotating tumbler","aboy","abloy"])) {
    return "Disc detainer locks use rotating discs instead of pins. Each disc has a notch that must align to create a gate, allowing the sidebar to drop in and unlock. Abloy locks use this technology. Very pick-resistant when well made. Common on high-security padlocks, bike locks, and some commercial applications. These are harder to pick and drill than standard pin tumbler locks.";
  }

  // Dimple locks
  if (m(["dimple lock","dimple key","mullion","mul-t-lock"])) {
    return "Dimple locks use a flat key with dimples (drilled holes) instead of traditional biting. The pins are arranged parallel to the key surface, making them harder to pick. Common brands: Mul-T-Lock, Kaba. Used in high-security applications. Best for commercial settings requiring restricted key control.";
  }

  // Rekeying
  if (m(["rekey","rekeying","change locks","change lock","new key","re-pin","repin","change keys"])) {
    return "Rekeying means changing the pin configuration inside a lock so that old keys no longer work and new keys do. This is cheaper than replacing the entire lock. A locksmith removes the cylinder, replaces the pins, and cuts new keys. Pros: lower cost, same hardware, same look. Best after moving into a new home, losing a key, or when an employee leaves. Call (916) 534-4900 for rekeying.";
  }

  // Master keying
  if (m(["master key","master keying","one key opens all","grand master","submaster","key system"])) {
    return "Master keying is a system where multiple locks operate with their own individual keys AND a master key opens all of them. Common in apartments, office buildings, and schools. A grand master key opens multiple master-keyed groups. It works by adding extra pins (master wafers) inside the lock for an additional shear line. This requires careful planning by a professional locksmith. I can design and install a master key system for your property. Call (916) 534-4900.";
  }

  // Safe construction
  if (m(["safe construction","steel thickness","concrete safe","fire lining","how safes are made","safe composite","plate steel","safe body","body thickness","door thickness"])) {
    return "Safe construction varies widely by purpose and price:\n\n\u2022 Basic gun safes: thin sheet steel over particle board or drywall for fire resistance. Bolt holes visible from the outside.\n\u2022 Fire-rated safes: layered with concrete-like insulation between steel skins. The fire seal expands when heated.\n\u2022 Burglary-rated (TL-15/30): heavy steel plate (1/4-inch to 1/2-inch door), hardplate protecting the lock area.\n\u2022 High security (TRTL-30x6): 1-inch+ steel door, massive hardplate, relockers, ceramic composite layers. Weighs thousands of pounds.\n\nKey point: an expensive-looking safe with a beautiful paint job can be thin sheet metal. Good safes are measured in pounds and steel thickness, not looks.";
  }

  // Safe ratings depth
  if (m(["tl-15","tl-30","trtl","ul listed","ul rating","burglary rating","burglar rating","tool attack","net attack","torch attack"])) {
    return "UL Burglary Ratings (in order of increasing security):\n\n\u2022 RSC (Residential Security Container): minimum 15 min attack. Basic.\n\u2022 TL-15: tool attack for 15 minutes (safes under 750 lbs must be anchored). 1/4-inch+ steel door.\n\u2022 TL-30: tool attack for 30 minutes. 1/2-inch+ steel door.\n\u2022 TL-30x6: tool attack from all 6 sides for 30 minutes. Full body protection.\n\u2022 TRTL-30: tool + torch attack for 30 minutes.\n\nTRTL-30x6: tool + torch from all 6 sides for 30 minutes. The highest standard. Your safe's rating directly correlates with time a professional burglar would need to bypass it. Most residential burglars give up after 5-10 minutes.";
  }

  // Safe tooling / methodology
  if (m(["scope","boroscope","flex shaft","magnetic drill","hole saw","end mill","carbide burr","safe drill","hardplate drill","precision drilling method"])) {
    return "Professional safe technicians use specialized tools:\n\n\u2022 Boroscope/Scope: a tiny camera inserted through a 1/8-inch hole to see the lock wheels and relocker positions.\n\u2022 Flex shaft: a flexible rotary tool that drills precisely around corners.\n\u2022 Magnetic drill: drills through hardplate that a hand drill won't touch.\n\u2022 Carbide end mills/burrs: cut through hardened steel (regular drill bits won't work).\n\nAmateurs use sawzalls, grinders, and crowbars \u2014 which destroy the safe. A pro's toolkit means the difference between a $250 repair and a $10,000 replacement.";
  }

  // Key cutting / duplication
  if (m(["key cutting","duplicate key","copy key","make a key","cut a key","key code","code cut", "code to key","edge cut","laser cut","restricted keyway","medeco key","mul-t-lock key"])) {
    return "Key cutting can be done by code (using the key's code number) or by duplicating (copying an existing key).\n\n\u2022 Standard edge-cut keys: most common house keys, quick to duplicate.\n\u2022 Laser-cut / sidewinder keys: car keys with a groove in the center.\n\u2022 Restricted keyways (Medeco, Mul-T-Lock): cannot be duplicated without authorization. Extra secure.\n\nI can cut keys by code using the serial number. If you're locked out and have no key, I can impression a key by hand. Call (916) 534-4900.";
  }

  // Door hardware
  if (m(["deadbolt","panic bar","exit device","door closer","closer","hinge","electric strike","door hardware","rim lock","mortise lock","bored lock","cylindrical lock"])) {
    return "Common door hardware types:\n\n\u2022 Deadbolt: bolt slides into the door frame. Single cylinder (key outside, thumb turn inside) or double cylinder (key both sides).\n\u2022 Panic bar / exit device: horizontal bar that opens the latch when pushed. Required for commercial occupied spaces.\n\u2022 Door closer: hydraulic or spring device controlling door closing speed.\n\u2022 Electric strike: replaces the standard strike plate; releases the door when energized from access control.\n\nAll require proper installation for security and safety. I can install, repair, or upgrade any of these. Call (916) 534-4900.";
  }

  // Access control
  if (m(["access control","card reader","keyless entry","mag lock","magnetic lock","electronic lock","fob","rfid","proximity reader","keypad entry","wiegand","standalone access"])) {
    return "Access control systems manage who enters and when. Common types:\n\n\u2022 Keypad: enter a code to unlock (simplest, lowest cost).\n\u2022 Card reader / Fob: swipe or tap RFID card/fob.\n\u2022 Biometric: fingerprint, retina, face, or hand geometry (most secure).\n\u2022 Mag lock: powerful electromagnet holds door closed, releases on signal. Meets fire safety (fails open on power loss).\n\nSystems can be standalone (single door) or networked (central management, scheduled access, audit trail). I can advise on the right system for your needs.";
  }

  // Lock picking / non-destructive entry
  if (m(["lock picking","pick locks","rake","bump key","bumping","electric pick","gun pick","snap gun","non-destructive","non destructive"])) {
    return "Lock picking is the non-destructive method of opening locks using specialized tools to simulate the action of the key. Methods:\n\n\u2022 Single pin picking (SPP): manipulates each pin individually. Requires skill and feel.\n\u2022 Raking: rapid back-and-forth motion to bounce pins to the shear line. Faster but less reliable.\n\u2022 Bumping: uses a specially cut key to transfer energy to the pins. Requires accuracy.\n\nA pro always attempts non-destructive entry first. It leaves no damage and takes 5-30 minutes depending on the lock's complexity. For safes, this is called manipulation (listening to the wheel pack). If non-destructive fails, precision drilling is the next step.";
  }

  // Residential vs commercial
  if (m(["residential","commercial","home security","business security","apartment security","office security","storefront","commercial locks"])) {
    return "Residential and commercial security are different animals:\n\nResidential: deadbolts, knob locks, smart locks. Focus is convenience and basic deterrence. Grade 2 or 3 hardware is typical.\n\nCommercial: heavy-duty Grade 1 hardware, panic bars, access control, master key systems. Focus is code compliance, audit trails, and employee access management. Insurance often mandates commercial-grade hardware.\n\nSafe requirements also differ: residential = fire + theft deterrence in a home (gun safe or RSC generally enough). Commercial = TL-15 or higher, often bolted to concrete with alarm integration. I do both. Call (916) 534-4900 for a consultation.";
  }

  // Car keys / automotive
  if (m(["car key","car lock","transponder key","chip key","laser key","car unlock","locked out of car","automotive key","remote key","fob battery","program key"])) {
    return "I handle basic automotive lockout situations on-site.\n\nModern car keys:\n\u2022 Transponder chip: key has an embedded chip that communicates with the car's immobilizer. A simple copy won't start the car.\n\u2022 Proximity fob: keyless entry with push-button start. Expensive to replace.\n\nIf you're locked out of your vehicle in the Sacramento area, call (916) 534-4900. For basic unlock and standard keys I can help on-site. For complex transponder programming and chip keys it depends on the vehicle make/model \u2014 ask when you call.";
  }
// ============ FALLBACK ============
  return "I'm sorry, I don't know the answer to that specific question yet. Try asking about:\n\n\u{0001F512} My safe won't open\n\u{0001F523} Forgot my combination\n\u{0001F50B} Dead battery\n\u{0001F4DE} How much to open a safe?\n\u{0001F4A1} Tell me about antique safes\n\u{0001F4D6} What blog stories do you have?\n\nOr call Robert at (916) 534-4900.";
}
/* ==================== UI ==================== */
const css = `#fcht-toggle{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#d4a843,#b8922e);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(212,168,67,0.4);z-index:9999;display:flex;align-items:center;justify-content:center;font-size:28px;transition:opacity .3s ease,transform .3s ease;color:#0f2440;line-height:1}
#fcht-toggle:hover{transform:scale(1.1)}
#fcht-toggle.open{opacity:0;pointer-events:none;transform:scale(0.8)}
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
<button id="fcht-toggle" aria-label="Open safe chat">💬</button>
<div id="fcht-pop">
  <div id="fcht-phdr">
    <div class="av">🔐</div>
    <div class="ht"><h3>Frantz Safe Assistant</h3><p>Ask about your safe</p></div>
    <button class="hc" id="fcht-close" style="margin-left:auto;background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;font-size:18px;padding:2px 6px;line-height:1">✕</button>
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

toggle.onclick = () => { toggle.classList.toggle('open'); popup.classList.toggle('open'); if (popup.classList.contains('open')) input.focus(); var ada=document.querySelector('.ada-widget'); if(ada) ada.style.display='none'; var adaP=document.getElementById('adaPanel'); if(adaP) adaP.style.display='none'; };
document.getElementById('fcht-close').onclick = () => { toggle.classList.remove('open'); popup.classList.remove('open'); var ada=document.querySelector('.ada-widget'); if(ada) ada.style.display=''; };
sendBtn.onclick = send;
input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); send(); } };
document.querySelectorAll('#fcht-qr .qr').forEach(el => { el.onclick = () => { input.value = el.dataset.m; send(); }; });

})();
