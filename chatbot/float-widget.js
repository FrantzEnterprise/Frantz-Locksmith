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
             keywords: ["network","protege","glazer","glazer safe","probate","out of town","backup","coverage","can't make it"],
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
           keywords: ["bent wire","crush washer",".20","$0.20","stout wire","guide slot","locking tab","no damage","no drill","no cut"],
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
  const safeTopics = ["safe","lock","key","dial","combo","combination","code","keypad","biometric","bolt","handle","hinge","door","open","close","jammed","stuck","rust","corrosion","relocker","solenoid","spring","battery","dead","fire","burglary","burglar","thief","drill","manipulation","spin","right","left","turn","call","phone","email","number","hours","price","cost","quote","estimate","license","lco","insured","buy","purchase","choose","select","recommend","maintenance","service","repair","antique","vintage","floor","gun","rifle","pistol","document","cash","jewelry","commercial","tl-15","tl-30","trtl","amsce","gardall","sentry","s&g","sargent","lagard","kaba","mosler","liberty","cannon","stack-on","digital","electronic","mechanical","wheel pack","drive cam","change","reset","forgot","lost","hello","hi","hey","thanks","thank you","drop slot","deposit","tubular","emergency","weekend","after hours","frantz","sacramento","west sacramento","x-07","x-08","x-09","x-10","gsa","porta vault","probate","heirloom","scrapyard","restoration","walkthrough","photo","$3k","$6k","$3,000","$5,000","$7,000","$10,000","3,000","5,000","7,000","10,000","crush washer","bent wire","surgical","network","coverage","backup","protege","glazer","johnson pacific","macneale","macneale & urban","urban","tips","tip","tricks","article","story","read","blog","post"];

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
  if (m(["dial sequence","dialing","how to dial","turn the dial"]) || (q.indexOf("left") !== -1 && q.indexOf("right") !== -1 && q.indexOf("turn") !== -1 && q.indexOf("handle") === -1)) {
    return TIPS.dial_combo.content + "\n\n\u{0001F4D6} Full walkthrough: " + TIPS.dial_combo.url;
  }

  if (m(["buy","purchase","get a safe","new safe","what safe","recommend","looking for a"])) {
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
  if (m(["forgot","forget","lost combination","lost code","can't remember","don't know the","don't remember"])) {
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

  // Jammed / stuck
  if (m(["jammed","stuck","won't turn","not turning","dial stuck"])) {
    return "Don't force it! Check:\n\u2022 Is something inside the safe blocking the door? (shelf fell, box shifted)\n\u2022 Dial turns but doesn't engage wheel pack? Reset by turning left 4 full times.\n\u2022 Handle won't turn? The lock bar may be caught on a relocker.\n\u2022 Is the safe on uneven ground? A shim under one corner can fix alignment.\n\n\u26A0\uFE0F If you force it, you'll break the handle or lock. Call me instead.\n\n\u{0001F4DE} (916) 534-4900";
  }

  // Change combination
  if (m(["change combination","change combo","change code","new combination","new code","set new","reset code"])) {
    if (m(["digital","electronic","keypad"])) {
      return "For most digital locks: open the safe, press the program/change button (often hidden behind a panel or inside the battery compartment), enter current code + #, enter new code + #, test 5 times with the door open before closing. Button locations vary by brand \u2014 check your manual. Call if you get stuck.";
    }
    return "For dial (mechanical) locks: changing the combination requires taking the lock apart. Not a simple DIY job \u2014 I can do it on-site for $50-$150. Takes about 15-30 minutes. Call (916) 534-4900 to schedule.";
  }

  // Pricing
  if (m(["cost","price","how much","estimate","quote","rate","fee","charge"])) {
    return "Typical pricing:\n\u2022 Simple lockout (no damage): $100-$200\n\u2022 Manipulation (non-destructive): $150-$350\n\u2022 Drill opening with patch/repair: $250-$500+\n\u2022 New lock installed: $100-$250\n\u2022 Combination change: $50-$150\n\u2022 Annual maintenance: $75-$150\n\n\u26A0\uFE0F If an amateur has already attacked the safe, costs go up \u2014 relockers and fire damage are expensive to fix.\n\n\u{0001F4D6} Full cost guide: " + TIPS.costs.url + "\n\n\u{0001F4DE} (916) 534-4900 for exact quote";
  }

  // License / about
  if (m(["license","licensed","insured","lco","4160","bsis","license number"])) {
    return "Frantz Locksmith Service\n\u2022 CA Locksmith License: LCO 4160\n\u2022 Issued by: California DCA \u2014 Bureau of Security & Investigative Services\n\u2022 Fully insured\n\u2022 GSA certified (X-07, X-08, X-09, X-10)\n\u2022 40+ years experience\n\nVerify my license: search.dca.ca.gov/advanced \u2014 search by name 'Robert Frantz' or license number 'LCO 4160'.";
  }

  // Hours
  if (m(["hours","open","available","weekend","after hours","emergency","call out"])) {
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
  if (m(["relocker","secondary lock","triggered","fired relocker"]) || (q.indexOf("drill") !== -1 && q.indexOf("lock") !== -1 && q.indexOf("won't open") !== -1)) {
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
  if (m(["lost key","broken key","key broke","key lost","missing key","key won't turn"])) {
    return "\u2022 Tubular keys: code is on the key head \u2014 a locksmith can cut a new one\n\u2022 Standard safe keys: code may be on the lock cylinder face\n\u2022 No code? I can 'impression' a key by hand (takes skill, saves drilling)\n\u2022 Worst case: drill the lock and replace\n\nCall (916) 534-4900 \u2014 I can often make a key without damaging the lock.";
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
  if (m(["antique","vintage","old safe","cast iron","heirloom","old lock"])) {
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
  if (m(["hi","hello","hey","yo","sup","good morning","good afternoon"])) {
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
