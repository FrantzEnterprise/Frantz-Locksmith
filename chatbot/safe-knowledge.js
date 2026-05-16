// ============================================================
// Frantz Safe Service Chatbot — Knowledge Base
// Comprehensive safe knowledge: types, mechanisms, troubleshooting
// ============================================================

const SAFE_KNOWLEDGE = {

  // --- SAFE TYPES ---
  safeTypes: [
    {
      name: "Antique Safes",
      keywords: ["antique", "vintage", "old", "vintage safe", "19th century", "cast iron", "heritage"],
      description: "Antique safes from the 19th and early 20th centuries. Typically cast iron or early steel with ornate detailing. Common brands include Mosler, Diebold, Hall's, Herring, and Yale. Many have unique locking mechanisms that require specialized knowledge to service.",
      commonIssues: [
        "Combination lost over generations — the most common reason for service",
        "Rust and corrosion on internal components",
        "Worn dial mechanism that doesn't engage the lock",
        "Original key lost — key-operated override models",
        "Springs degraded from decades of tension",
        "Handle mechanisms seized from lack of lubrication"
      ],
      tip: "Antique safes are valuable. Never force them open — drilling damages collector value. Call someone who understands vintage mechanisms."
    },
    {
      name: "Gun Safes",
      keywords: ["gun safe", "gun safe", "firearm", "weapon", "rifle", "pistol", "liberty", "cannon", "stack-on"],
      description: "Modern gun safes designed to secure firearms. Usually heavy-gauge steel with active locking bolts. Common brands: Liberty, Cannon, Stack-On, Winchester, Browning. Most have electronic keypads, some have combination dials or biometric locks.",
      commonIssues: [
        "Electronic keypad failure — dead battery or circuit board failure",
        "Forgotten combination after not opening for months",
        "Bolts jammed from misalignment — safe door shifted",
        "Biometric scanner not recognizing fingerprint",
        "Key override lost — many gun safes have a backup key",
        "Shelf or interior damage from heavy items shifting"
      ],
      tip: "Test your gun safe combination every 3 months. Replace batteries annually on a fixed date (like New Year's Day). Keep the backup key in a secure but accessible location."
    },
    {
      name: "Fire Safes",
      keywords: ["fire safe", "fireproof", "fire resistant", "fire-rated", "document", "media safe", "sentrysafe"],
      description: "UL-rated fire safes designed to protect documents and media from fire damage. Most are lighter weight. Common brands: SentrySafe, First Alert, Honeywell. Usually have tubular key locks or simple electronic locks.",
      commonIssues: [
        "Tubular key lost — these are hard to duplicate without the code",
        "Electronic lock failure on budget models",
        "Lock mechanism plastic gears stripped from over-tightening",
        "Water damage from fire sprinklers — safes can leak if not rated for water",
        "Dragging the safe (they're lighter) can misalign the lock"
      ],
      tip: "Fire safes protect against fire, not burglary. They're usually lightweight and can be carried away. Bolt them down if security matters."
    },
    {
      name: "Floor Safes",
      keywords: ["floor safe", "in-ground", "in ground", "concrete", "buried"],
      description: "Safes installed in concrete floors, typically in closets or under carpets. Excellent burglary protection since they can't be removed. Usually have heavy combination dials or high-security electronic locks.",
      commonIssues: [
        "Concrete settling shifts the safe — jams the lock or bolts",
        "Moisture rusts the lock mechanism from below",
        "Combination dial hard to read after years of wear",
        "Door hinge pins rusted — door won't open fully",
        "Flood water in the safe — no drainage in floor safes"
      ],
      tip: "Floor safes are prone to moisture. Open and inspect yours every 6 months. Dehumidifier packs inside help prevent rust."
    },
    {
      name: "Wall Safes",
      keywords: ["wall safe", "wall safe", "in-wall", "between studs", "hidden safe", "hollow wall"],
      description: "Safes designed to fit between wall studs. Usually shallow but can be hidden behind pictures or panels. Popular for jewelry and documents. Typically have tubular key locks or small combination dials.",
      commonIssues: [
        "Key lost for the tubular lock",
        "Safe door hinge screws pulled from drywall — door sagging",
        "Paint overspray on the combination dial — hard to read numbers",
        "Items shifted inside and blocking the door from opening",
        "Low security — easily cut out of wall"
      ],
      tip: "Wall safes offer convenience, not high security. A motivated thief can cut them out in minutes. Use for low-value items or quick access."
    },
    {
      name: "Commercial Safes",
      keywords: ["commercial safe", "business", "retail", "cash safe", "deposit", "drop safe", "TL rated", "TRTL", "tx", "amscc"],
      description: "High-security safes rated by UL (Underwriters Laboratories) for burglary and fire resistance. TL-15, TL-30, TRTL-30x6 ratings indicate increasing protection. Common brands: AMSEC, Gardall, Mosler, Diebold, Schwab.",
      commonIssues: [
        "Drop slot jammed from too many envelopes/deposits",
        "Electronic lock failure on high-traffic safe (worn keypad)",
        "Combination lock dial worn smooth — hard to read numbers",
        "Relocker accidentally triggered — secondary lock engaged",
        "Door sagging from heavy use — misaligns the bolts",
        "GSA container lock maintenance required (X-07, X-08, X-09, X-10 certified)"
      ],
      tip: "Commercial safes should be serviced annually. A failed safe during business hours means lost revenue and security risk."
    },
    {
      name: "Deposit / Drop Safes",
      keywords: ["drop safe", "deposit", "night drop", "drop slot", "cash drop"],
      description: "Safes with a one-way deposit slot for cash and envelopes. Common in retail, restaurants, and gas stations. Usually have double-lock systems — one for the drop door, one for the main door.",
      commonIssues: [
        "Drop slot jammed from overstuffing",
        "Anti-fish baffle broken — allows retrieval through slot",
        "Main door combination forgotten (not opened often)",
        "Electronic lock on drop door fails from frequent use",
        "Envelopes/cash stacking up behind the slot — blocking deposits"
      ],
      tip: "Open the main door regularly to clear the area behind the drop slot. A jammed drop safe means deposits stay in the register overnight."
    }
  ],

  // --- LOCK TYPES ---
  lockTypes: [
    {
      name: "Combination Dial Lock",
      keywords: ["combination dial", "dial", "spin", "turning", "wheel pack", "sargent", "la gard", "group 1", "group 2"],
      description: "The classic safe lock. A dial is turned to align internal wheels (wheel pack) with the fence and bolt. UL-rated Group 1 (manipulation-proof) and Group 2 (standard). Common brands: Sargent & Greenleaf, LaGard, Kaba Mas.",
      howItWorks: "The dial connects to a spindle that turns a series of wheels (usually 3 or 4). Each wheel has a gate (notch). When all gates align, the fence drops in and the bolt retracts.",
      troubleshooting: [
        "Dial turns but doesn't stop at numbers — spindle may be stripped or disconnected",
        "Dial stops at numbers but won't open — wheel pack may be out of alignment",
        "Dial is stiff or hard to turn — needs cleaning and lubrication",
        "Dial spins freely — spring in the back cover may be broken",
        "Safe won't lock — might be dialed past zero without resetting"
      ],
      tip: "Most combination locks have a 'drive cam' that must be reset. Always dial past zero at least 4 full turns before starting your combination."
    },
    {
      name: "Electronic Keypad Lock",
      keywords: ["electronic", "keypad", "digital", "keypad lock", "digital lock", "s&g electronic", "la gard electronic", "kaba", "ilco"],
      description: "Battery-powered keypad locks that replace traditional dials. More convenient but dependent on electronics and batteries. Common brands: Sargent & Greenleaf, LaGard, Kaba Mas, Ilco, Lockly.",
      howItWorks: "Enter a code on the keypad. The circuit board sends power to a solenoid that retracts the locking bar, allowing the handle to open the bolts.",
      troubleshooting: [
        "No response when entering code — most common: dead battery",
        "Keypad beeps but lock won't open — solenoid may be stuck or failed",
        "Keypad flashes rapidly — low battery warning",
        "Keypad works sometimes but not others — loose wire connection",
        "Battery compartment corrosion — check and clean contacts"
      ],
      tip: "Change batteries annually. Most electronic locks have a 'jump start' terminal for a 9V battery if the battery dies — or an emergency key override."
    },
    {
      name: "Tubular Key Lock",
      keywords: ["tubular", "tubular key", "barrel key", "round key", "ace lock", "chicago lock"],
      description: "A lock that uses a round tubular key (like a Chicago lock). Common on fire safes, wall safes, and deposit safes. The key has 7 or 8 pins arranged in a circle.",
      howItWorks: "The tubular key pushes spring-loaded pins to the correct depth. When all pins align, the cylinder turns and retracts the locking bar.",
      troubleshooting: [
        "Key won't insert fully — debris in the keyway",
        "Key turns but won't open — the cam or bar may be damaged",
        "Key broken off in lock — needs extraction",
        "Key lost — can be picked or decoded if you have a code number",
        "Paint or dirt in the pin chambers — prevents proper alignment"
      ],
      tip: "If you have a tubular key, write down the key code number (etched on the key) and store it separately. A locksmith can cut a new key from the code."
    },
    {
      name: "Key Lock (Standard Safe Key)",
      keywords: ["key lock", "safe key", "bit key", "flat key", "lever lock", "warded"],
      description: "A standard key-operated lock on safes. Can be simple warded locks (low security) or lever locks (higher security on older safes).",
      howItWorks: "The key lifts levers or passes wards to the correct position, allowing the bolt to slide.",
      troubleshooting: [
        "Key won't turn — may need lubrication or there's a broken spring",
        "Key turns but won't retract bolt — the linkage may be disconnected",
        "Key broken in lock — remove with extraction tools",
        "Key stuck after opening — lubricate and gently work it out",
        "Lost key — new key can be made from the lock code or impression"
      ],
      tip: "Standard safe keys have codes on them. Keep a record. Without the code, making a key takes longer and costs more."
    },
    {
      name: "Biometric Lock",
      keywords: ["biometric", "fingerprint", "thumbprint", "biometric lock", "touch", "finger scanner"],
      description: "Modern locks that read fingerprints to unlock. Common on newer gun safes and premium home safes. Convenient but can have accuracy issues.",
      howItWorks: "The scanner reads the unique pattern of ridges on your fingerprint. It compares against stored templates. On match, it activates a solenoid to release the lock.",
      troubleshooting: [
        "Fingerprint not recognized — dry skin, dirt, angle, or scar/cut on finger",
        "Scanner shows green but lock won't open — solenoid failure",
        "Scanner doesn't light up — battery issue",
        "Stored fingerprints lost — some models wipe on battery change",
        "Slow response — may need cleaning or recalibration"
      ],
      tip: "Store fingerprints of both hands, multiple fingers. Keep your backup key accessible. Biometrics fail more often than other lock types in the long run."
    }
  ],

  // --- COMMON PROBLEMS & SOLUTIONS ---
  problems: {
    "forgot combination": {
      answers: [
        "Try common combinations first: 50-25-50, 20-40-60, 10-20-30, 0-0-0 (if it has a handle)",
        "Check if you have the combination written down somewhere safe",
        "If you know the serial number on the lock face, a locksmith can look up the original factory combination (for some brands)",
        "If none of that works, a safe technician can manipulate the lock open — no damage to the safe",
        "If manipulation doesn't work, drilling may be required (don't try this yourself)"
      ],
      proTip: "Safe technicians charge LESS for manipulation (listening to the wheels) than for drilling and repair. Call before you force anything."
    },
    "dead battery": {
      answers: [
        "Check for a 'jump start' terminal — usually small contacts below the keypad. Touch a 9V battery to them",
        "Look for a key override — most electronic locks have a hidden keyhole covered by a sliding panel",
        "If no jump start or key override, external power can sometimes be applied through the keypad cable entry point",
        "Once open, replace the battery immediately with a fresh one (Duracell or Energizer recommended, not budget brands)"
      ],
      proTip: "Many electronic locks beep or flash when the battery is low. Don't ignore it — change it right away."
    },
    "jammed safe": {
      answers: [
        "Check if something inside is blocking the door — a fallen shelf, a box, a gun shifted sideways",
        "Try gently pushing on the door while turning the handle — sometimes weight shifting causes binding",
        "DO NOT hammer the handle or use a crowbar. You'll break the locking mechanism",
        "If the safe is on an uneven floor, try shimming one corner — the door may be racked out of square",
        "Some safes have a 'delay' feature. Wait 1-2 minutes and try again (anti-theft feature on some models)"
      ],
      proTip: "A jammed safe is almost always fixable with patience. Breaking things only makes it worse (and more expensive)."
    },
    "safe locked and won't unlock": {
      answers: [
        "For combination dials: make sure you're dialing past zero 4 full turns before starting (resets the wheels)",
        "For electronic keypads: check the battery first (90% of issues)",
        "Try turning the dial or entering the code in a quiet room — listen for the click of the solenoid or the drop-in of the fence",
        "Some safes require the handle to be in a specific position (usually horizontal) before the lock will release",
        "If you've tried 5-6 times, STOP. Repeated attempts can damage the lock. Call a professional."
      ],
      proTip: "On combination dials: dial left (counterclockwise) 4 times to reset. Then dial right (clockwise) to the first number, left past the second, right to the third."
    },
    "safe combination changed": {
      answers: [
        "On most dials, changing the combination requires disassembling the lock — not a DIY job for most people",
        "Some electronic locks have a 'change code' feature through the keypad (check your manual)",
        "If the lock was recently changed by someone else, check: did they leave written instructions?",
        "The new combination may need to be 'set' by turning the handle or closing the door — some locks require a finalization step"
      ],
      proTip: "After changing a combination, test it 5 times with the door open before closing and locking it."
    },
    "safe key lost": {
      answers: [
        "Check if there's a code number on another key that came with the safe",
        "Tubular keys (round keys) have a code on the head — a locksmith can cut a new one from the code",
        "For standard safe keys: the lock itself has a code if you can access it. The number is on the face of the lock cylinder",
        "If no code exists, a locksmith can impression a key (takes skill but saves drilling)",
        "As a last resort, the lock can be drilled and replaced (drilled lock = total replacement needed)"
      ],
      proTip: "Before you lose your only key: make a duplicate. Bit keys are cheap to cut. Tubular keys need the code but are still affordable."
    },
    "safe service cost": {
      answers: [
        "Simple lockout (open the safe, no damage): typically $100-$200 for standard safes",
        "Safe opening with manipulation (non-destructive): $150-$350 depending on lock type",
        "Drill opening with repair: $250-$500+ (includes filling and covering the drill hole)",
        "New lock installation: $100-$250 for parts and labor",
        "Combination change: $50-$150 depending on lock type",
        "Annual maintenance: $75-$150 to inspect, lubricate, and test",
        "Prices vary by location. In Sacramento/West Sacramento, call (916) 534-4900 for an estimate"
      ],
      proTip: "Annual maintenance is cheap insurance. A failed safe during an emergency costs much more than regular service."
    },
    "biometric not working": {
      answers: [
        "Try a different finger — index fingers work best, thumbs second best",
        "Wipe the scanner with a dry cloth — oil, dirt, or moisture affects reading",
        "If you have dry skin, breathe on the scanner first to create slight moisture",
        "Re-enroll your fingerprints — stored templates can degrade over time",
        "Check the battery — biometric scanners drain batteries faster than keypads"
      ],
      proTip: "Biometric locks are convenient but less reliable than combos or keypads. Always keep the backup key accessible."
    }
  },

  // --- SAFE BUYING GUIDE ---
  buyingGuide: {
    questions: [
      "What will you store? (guns, documents, cash, jewelry?)",
      "Where will the safe go? (garage, closet, floor, wall?)",
      "What's the primary threat? (fire, burglary, both?)",
      "How much do items weigh? (shelf capacity matters)",
      "How often will you access it? (daily, weekly, rarely?)",
      "What's your budget?"
    ],
    fireRating: {
      explanation: "UL fire ratings indicate how long a safe can withstand fire at specific temperatures:",
      ratings: [
        "UL Class 350 1-hour: withstands 1700°F for 1 hour — standard for paper documents",
        "UL Class 350 2-hour: 2 hours of protection — better for irreplaceable items",
        "UL Class 150 1-hour: 150°F internal max — needed for media (DVDs, USB drives, photos)"
      ],
      tip: "For sentimental items, get the highest fire rating you can afford. A 2-hour rated safe costs more but is worth it."
    },
    burglaryRating: {
      explanation: "UL burglary ratings indicate the safe's ability to resist attack:",
      ratings: [
        "RSC (Residential Security Container): basic protection, entry-level gun safes",
        "TL-15: 15 minutes of tool attack — for home cash and jewelry",
        "TL-30: 30 minutes of tool attack — good for home or small business",
        "TLTR-30x6: 30 minutes against tools and torch — serious protection",
        "TXTL-60x6: 60 minutes against tools, torch, and explosives — highest standard"
      ],
      tip: "Most home gun safes are RSC-rated, not true burglary safes. If security matters, look for TL-rated."
    }
  },

  // --- MAINTENANCE SCHEDULE ---
  maintenance: {
    monthly: [
      "Open and close the safe once — keeps mechanisms limber",
      "Wipe the keypad or dial clean",
      "Check that batteries are working (non-electronic: skip this)"
    ],
    quarterly: [
      "Test the combination/code to make sure it still works",
      "Check for rust or moisture inside",
      "Inspect hinges for signs of wear or sagging"
    ],
    annually: [
      "Replace batteries (even if they still work — cheap insurance)",
      "Lightly lubricate the bolt mechanism and hinges (white lithium grease)",
      "Check floor safes for moisture or rust",
      "Inspect fire seal (the expanding strip around the door edge)",
      "Professional service call recommended"
    ]
  },

  // --- ABOUT FRANTZ ---
  about: {
    name: "Frantz Locksmith Service",
    specialty: "Safe Services Specialist",
    since: "1985",
    license: "CA LCO 4160",
    phone: "(916) 534-4900",
    email: "frantzlocksmith@hotmail.com",
    area: "Sacramento & West Sacramento, CA",
    hours: "Mon-Fri 9AM-4PM",
    emergency: "After-hours emergency safe service available",
    services: [
      "Safe opening (antique, gun, fire, floor, wall, commercial)",
      "Combination changes",
      "Digital lock upgrades",
      "Safe repair (handles, hinges, bolts, relockers)",
      "Safe sales (AMSEC, Gardall, and more)",
      "Light locksmith work for safe clients"
    ],
    whyChoose: [
      "40+ years specializing in safes",
      "Licensed by California DCA / BSIS",
      "Mobile service — I come to you",
      "Fair, transparent pricing",
      "Non-destructive opening whenever possible"
    ]
  }
};

// Export for use in chatbot
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SAFE_KNOWLEDGE;
}
