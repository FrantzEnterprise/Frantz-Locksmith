// ============================================================
// Frantz Safe Service Chatbot — Engine
// Intelligent conversation flow for safe service inquiries
// ============================================================

class SafeChatbot {
  constructor(knowledge) {
    this.knowledge = knowledge;
    this.context = {
      safeType: null,
      lockType: null,
      problem: null,
      name: null,
      phone: null,
      serviceArea: null,
      conversationStage: 'greeting',
      history: [],
      userNeeds: []
    };
  }

  // --- Main response generator ---
  respond(input) {
    const q = input.toLowerCase().trim();
    this.context.history.push({ role: 'user', message: input });

    // Track what the user needs
    this._classifyIntent(q);

    let response = this._generateResponse(q);
    this.context.history.push({ role: 'bot', message: response });

    return response;
  }

  // --- Classify what the user wants ---
  _classifyIntent(q) {
    const intents = {
      openSafe: ['open safe', 'safe locked', 'won\'t open', 'can\'t open', 'stuck', 'locked out', 'forgot combination', 'forgot code', 'lost combination', 'wont unlock'],
      repairSafe: ['repair', 'fix', 'broken', 'jammed', 'handle', 'hinge', 'not working'],
      comboChange: ['change combination', 'new combination', 'reset combo', 'change code', 'new code'],
      digitalUpgrade: ['digital', 'keypad upgrade', 'electronic lock', 'upgrade'],
      buySafe: ['buy safe', 'purchase safe', 'safe for sale', 'get a safe', 'new safe', 'how much for a safe'],
      maintenance: ['maintenance', 'service', 'inspect', 'check', 'annual'],
      aboutSafe: ['type of safe', 'kind of safe', 'what safe', 'which safe', 'antique', 'gun safe', 'fire safe'],
      pricing: ['cost', 'price', 'how much', 'estimate', 'quote'],
      license: ['license', 'licensed', 'insured', 'lc', 'lco', 'bonded'],
      hours: ['hours', 'open', 'when', 'available', 'weekend', 'after hours'],
      contact: ['call', 'phone', 'email', 'contact', 'reach', 'talk to'],
      identify: ['name is', 'my name', "i'm", 'i am'],
      thanks: ['thanks', 'thank you', 'appreciate', 'helpful'],
      hello: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(k => q.includes(k))) {
        if (!this.context.userNeeds.includes(intent)) {
          this.context.userNeeds.push(intent);
        }
      }
    }
  }

  // --- Generate appropriate response ---
  _generateResponse(q) {
    // Handle conversational flow based on context stage
    // If we asked for their name and they provided it
    if (this.context.conversationStage === 'asking_name') {
      const nameMatch = q.match(/(?:my name is|i['']m|i am|it['']s|this is)\s+(\w+)/i);
      if (nameMatch) {
        this.context.name = nameMatch[1];
        this.context.conversationStage = 'greeting_done';
        return `Nice to meet you, ${this.context.name}! How can I help you with your safe today?`;
      }
      // If they just gave a short answer, use it as name
      const words = q.split(' ').filter(w => w.length > 0);
      if (words.length <= 3) {
        this.context.name = q;
        this.context.conversationStage = 'greeting_done';
        return `Nice to meet you, ${this.context.name}! What's going on with your safe?`;
      }
      this.context.conversationStage = 'greeting_done';
    }

    // --- Match intents to responses ---

    // Hello/Greeting
    if (this.context.conversationStage === 'greeting' || 
        this.context.userNeeds.includes('hello') ||
        q.match(/^(hello|hi|hey|yo|sup)\b/)) {
      this.context.conversationStage = 'greeting_done';
      return this._greeting();
    }

    // Opening a safe (locked out / forgot combo)
    if (this.context.userNeeds.includes('openSafe')) {
      return this._handleOpenSafe(q);
    }

    // Repair
    if (this.context.userNeeds.includes('repairSafe')) {
      return this._handleRepair(q);
    }

    // Combination change
    if (this.context.userNeeds.includes('comboChange')) {
      return "I can change your safe combination. For dial locks, I'll disassemble and reset the wheel pack. For electronic locks, I can program a new code. Typically runs $50-$150 depending on the lock type. Give me a call at (916) 534-4900 to schedule.";
    }

    // Digital upgrade
    if (this.context.userNeeds.includes('digitalUpgrade')) {
      return "Upgrading from a dial to a digital keypad lock is one of the most popular services I do. It's faster to open, you can change the code yourself, and no more fumbling with a dial. The cost is usually $150-$250 installed depending on the lock brand. Call (916) 534-4900 and I'll walk you through options.";
    }

    // Buying a safe
    if (this.context.userNeeds.includes('buySafe')) {
      return this._handleBuySafe(q);
    }

    // Maintenance
    if (this.context.userNeeds.includes('maintenance')) {
      return this._handleMaintenance();
    }

    // Pricing/Estimate
    if (this.context.userNeeds.includes('pricing')) {
      return this._handlePricing(q);
    }

    // About safe types
    if (this.context.userNeeds.includes('aboutSafe')) {
      return this._handleAboutSafe(q);
    }

    // License info
    if (this.context.userNeeds.includes('license')) {
      return "I'm fully licensed and insured. California Locksmith License #LCO 4160, issued by the Bureau of Security and Investigative Services (California DCA). You can verify my license at: https://www.breeze.ca.gov/datamart/detailsCADCA.do";
    }

    // Hours
    if (this.context.userNeeds.includes('hours')) {
      return this._hours();
    }

    // Contact
    if (this.context.userNeeds.includes('contact') || this.context.userNeeds.includes('identify')) {
      return this._contactInfo();
    }

    // Thanks
    if (this.context.userNeeds.includes('thanks')) {
      return "You're very welcome! If you ever need safe service in Sacramento or West Sacramento, just call (916) 534-4900. I'm happy to help.";
    }

    // Fallback - try to match any safe type
    for (const safeType of this.knowledge.safeTypes) {
      if (safeType.keywords.some(k => q.includes(k))) {
        return this._safeTypeInfo(safeType);
      }
    }

    // Check for lock type keywords
    for (const lockType of this.knowledge.lockTypes) {
      if (lockType.keywords.some(k => q.includes(k))) {
        return this._lockTypeInfo(lockType, q);
      }
    }

    // Generic fallback
    return this._fallback();
  }

  _greeting() {
    const greetings = [
      "Hello! I'm Frantz's Safe Assistant. I can help with safe opening, repairs, combination changes, or answer any safe questions. What's going on with your safe?",
      "Hi there! Welcome to Frantz Locksmith Service. I specialize in safes — opening, repairing, selling, and maintaining them. What can I help you with?",
      "Thanks for stopping by! I'm here to answer all your safe questions. Whether you're locked out, need maintenance, or looking to buy a safe — just ask."
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  _handleOpenSafe(q) {
    // Check what kind of safe they have
    const safeType = this._detectSafeType(q);
    const lockType = this._detectLockType(q);

    let response = "Sounds like you need your safe opened. Here's the good news: I can almost always get it open without damaging the safe.\n\n";

    if (lockType) {
      response += `**For ${lockType.name}:**\n`;
      response += lockType.troubleshooting.slice(0, 3).map(t => `• ${t}`).join('\n') + '\n\n';
    }

    // Pull from knowledge base problems
    if (q.includes('forgot') || q.includes('lost') || q.includes('combination')) {
      const forgotInfo = this.knowledge.problems['forgot combination'];
      response += "**Here's what to try first:**\n";
      response += forgotInfo.answers.slice(0, 3).map(a => `• ${a}`).join('\n') + '\n\n';
      response += `**Pro tip:** ${forgotInfo.proTip}`;
    } else if (q.includes('battery') || q.includes('dead')) {
      const batteryInfo = this.knowledge.problems['dead battery'];
      response += "**Battery tips:**\n";
      response += batteryInfo.answers.slice(0, 3).map(a => `• ${a}`).join('\n') + '\n\n';
      response += `**Pro tip:** ${batteryInfo.proTip}`;
    } else if (q.includes('jammed') || q.includes('stuck') || q.includes('won\'t')) {
      const jammedInfo = this.knowledge.problems['jammed safe'];
      response += "**Jammed safe tips:**\n";
      response += jammedInfo.answers.slice(0, 4).map(a => `• ${a}`).join('\n') + '\n\n';
      response += `**Pro tip:** ${jammedInfo.proTip}`;
    } else {
      response += "**Bottom line:** If you're in Sacramento or West Sacramento, give me a call at **(916) 534-4900**. I'll come to you and take a look. No charge for an honest assessment.";
    }

    return response;
  }

  _handleRepair(q) {
    let response = "I can repair most safe issues. Here's what I commonly fix:\n\n";
    response += "• **Broken handles** — replace or repair the handle assembly\n";
    response += "• **Jammed bolts** — realign or repair the bolt mechanism\n";
    response += "• **Failed electronic locks** — diagnose and replace\n";
    response += "• **Hinge problems** — sagging doors, worn pins\n";
    response += "• **Relocker triggers** — secondary lock accidentally engaged\n\n";

    if (q.includes('handle') || q.includes('hinge') || q.includes('bolt')) {
      response += "This type of repair is straightforward for an experienced tech. Call me and I can usually give you an estimate over the phone.";
    } else if (q.includes('drop') || q.includes('slot')) {
      response += "**Drop safe jams** are common in retail businesses. I'll clear the jam and check the anti-fish baffle.";
    } else {
      response += "If your safe isn't working right, don't force it. A call now can save you a much bigger repair bill later. **(916) 534-4900**";
    }

    return response;
  }

  _handleBuySafe(q) {
    let response = "I can help you find the right safe. Here's what I consider:\n\n";
    
    response += "**To figure out what you need, ask yourself:**\n";
    this.knowledge.buyingGuide.questions.slice(0, 4).forEach(q => {
      response += `• ${q}\n`;
    });

    response += "\n**A quick guide:**\n";
    response += "• **Documents only** → UL 350 fire-rated safe\n";
    response += "• **Guns** → A quality gun safe from Liberty, Cannon, or AMSEC\n";
    response += "• **Cash/jewelry in a home** → TL-15 or TL-30 burglary-rated safe\n";
    response += "• **Business cash deposits** → Drop safe with dual locks\n";
    response += "• **Quick access** → Digital keypad or biometric lock\n";

    response += "\nI stock smaller fire safes, gun safes, and drop safes. For larger ones, I can special order from AMSEC or Gardall. Call (916) 534-4900 to discuss what you need.";

    return response;
  }

  _handleMaintenance() {
    let response = "**Annual safe maintenance is cheap insurance.** Here's a quick checklist:\n\n";
    response += "**Monthly:**\n";
    this.knowledge.maintenance.monthly.forEach(t => response += `• ${t}\n`);
    response += "\n**Quarterly:**\n";
    this.knowledge.maintenance.quarterly.forEach(t => response += `• ${t}\n`);
    response += "\n**Annually (or call me):**\n";
    this.knowledge.maintenance.annually.forEach(t => response += `• ${t}\n`);
    response += "\nA professional service visit runs about $75-$150 and takes less than an hour. It's worth it for peace of mind.";
    return response;
  }

  _handlePricing(q) {
    const pricing = this.knowledge.problems['safe service cost'];
    let response = "**Typical safe service pricing:**\n\n";
    response += pricing.answers.map(a => `• ${a}`).join('\n') + '\n\n';
    response += `**Pro tip:** ${pricing.proTip}`;
    return response;
  }

  _handleAboutSafe(q) {
    const detected = this._detectSafeType(q);
    if (detected) {
      return this._safeTypeInfo(detected);
    }
    return "I can tell you about all types of safes. Just ask about: antique safes, gun safes, fire safes, floor safes, wall safes, commercial safes, or deposit/drop safes. What kind are you interested in?";
  }

  _safeTypeInfo(safeType) {
    let response = `**${safeType.name}**\n\n${safeType.description}\n\n`;
    response += "**Common issues I see:**\n";
    response += safeType.commonIssues.slice(0, 4).map(i => `• ${i}`).join('\n') + '\n\n';
    response += `💡 **Tip:** ${safeType.tip}`;
    return response;
  }

  _lockTypeInfo(lockType, q) {
    let response = `**${lockType.name}**\n\n${lockType.description}\n\n`;
    
    if (q.includes('how') || q.includes('work') || q.includes('mechanism')) {
      response += `**How it works:** ${lockType.howItWorks}\n\n`;
    }

    response += "**Troubleshooting:**\n";
    response += lockType.troubleshooting.slice(0, 4).map(t => `• ${t}`).join('\n') + '\n\n';
    response += `💡 **Tip:** ${lockType.tip}`;
    return response;
  }

  _detectSafeType(q) {
    for (const safeType of this.knowledge.safeTypes) {
      if (safeType.keywords.some(k => q.includes(k))) {
        return safeType;
      }
    }
    // Check common safe brands
    const brands = ['liberty', 'cannon', 'stack-on', 'winchester', 'browning', 'sentrysafe', 'sentry safe', 'first alert', 'honeywell', 'mosler', 'diebold', 'hall', 'herring', 'yale', 'amsce', 'amscec', 'gardall', 'schwab'];
    for (const brand of brands) {
      if (q.includes(brand)) {
        return this.knowledge.safeTypes.find(s => s.keywords.some(k => k.includes(brand)));
      }
    }
    return null;
  }

  _detectLockType(q) {
    for (const lockType of this.knowledge.lockTypes) {
      if (lockType.keywords.some(k => q.includes(k))) {
        return lockType;
      }
    }
    // Direct brand checks
    const lockBrands = ['sargent', 's&g', 'lagard', 'la gard', 'kaba', 'kaba mas', 'ilco', 'lockly'];
    for (const brand of lockBrands) {
      if (q.includes(brand)) {
        return this.knowledge.lockTypes.find(l => l.keywords.some(k => k.includes(brand)));
      }
    }
    return null;
  }

  _contactInfo() {
    return `**Frantz Locksmith Service**\n\n📞 **(916) 534-4900**\n✉️ frantzlocksmith@hotmail.com\n📍 West Sacramento, CA (mobile service)\n\n**Hours:** Mon-Fri 9AM-4PM\n**Emergency:** After-hours safe service available\n**License:** CA LCO 4160\n\nGive me a call or send a message through the contact form and I'll get back to you quickly.`;
  }

  _hours() {
    return `**Business Hours:**\n\nMonday - Friday: 9:00 AM - 4:00 PM\n\n**After-hours & weekend emergency safe service available** — just call (916) 534-4900. If I can't answer right away, leave a message and I'll call you back.`;
  }

  _fallback() {
    const fallbacks = [
      "I'm not sure I understood that. I can help with safe problems — locked out, need repairs, combination changes, or buying a safe. Just describe what's going on with your safe.",
      "Let me help you out. Are you having trouble with a safe? Tell me what's happening — is it locked and won't open? Need maintenance? Looking to buy one?",
      "I specialize in safes. If you tell me what kind of safe you have and what's wrong, I can give you specific advice. Or just call me at (916) 534-4900.",
      "I'd love to help. Some things I can answer: safe opening, combination changes, lock repairs, buying advice, maintenance tips. What's on your mind?"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  reset() {
    this.context = {
      safeType: null,
      lockType: null,
      problem: null,
      name: null,
      phone: null,
      serviceArea: null,
      conversationStage: 'greeting',
      history: [],
      userNeeds: []
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SafeChatbot;
}
