// ============================================================
// Frantz Safe Chatbot — Floating Widget for Website
// Embeds a chat toggle button + popup on any page
// ============================================================
(function() {
  'use strict';

  // Prevent double-load
  if (window.__frantzChatLoaded) return;
  window.__frantzChatLoaded = true;

  // --- Load the chatbot engine ---
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // --- CSS injected into the page ---
  const styles = `
    #frantz-chat-toggle {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d4a843, #b8922e);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(212,168,67,0.4);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      transition: all 0.3s ease;
    }
    #frantz-chat-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 28px rgba(212,168,67,0.5);
    }
    #frantz-chat-toggle .close-icon { display: none; }
    #frantz-chat-toggle.open .chat-icon { display: none; }
    #frantz-chat-toggle.open .close-icon { display: block; }

    #frantz-chat-popup {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 380px;
      height: 560px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.2);
      z-index: 9998;
      display: none;
      flex-direction: column;
      overflow: hidden;
      animation: slideUp 0.3s ease;
    }
    #frantz-chat-popup.open { display: flex; }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    #frantz-chat-popup-header {
      background: linear-gradient(135deg, #0f2440, #1a3a5c);
      color: white;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    #frantz-chat-popup-header .bot-avatar {
      width: 36px;
      height: 36px;
      background: rgba(212,168,67,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    #frantz-chat-popup-header .header-text h3 {
      font-size: 0.9rem;
      font-weight: 700;
    }
    #frantz-chat-popup-header .header-text p {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.7);
    }
    #frantz-chat-popup-header .header-close {
      margin-left: auto;
      background: none;
      border: none;
      color: rgba(255,255,255,0.6);
      cursor: pointer;
      font-size: 20px;
    }

    #frantz-chat-messages {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #f8f9fa;
    }

    #frantz-chat-messages .msg {
      max-width: 88%;
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 0.88rem;
      line-height: 1.5;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    #frantz-chat-messages .msg.bot {
      align-self: flex-start;
      background: white;
      border: 1px solid #e0e3e8;
      border-bottom-left-radius: 4px;
    }
    #frantz-chat-messages .msg.bot strong { color: #1a3a5c; }
    #frantz-chat-messages .msg.user {
      align-self: flex-end;
      background: #1a3a5c;
      color: white;
      border-bottom-right-radius: 4px;
    }
    #frantz-chat-messages .msg .call-btn {
      display: inline-block;
      margin-top: 6px;
      background: #d4a843;
      color: #0f2440;
      padding: 6px 14px;
      border-radius: 6px;
      font-weight: 700;
      text-decoration: none;
      font-size: 0.85rem;
    }

    #frantz-chat-input-area {
      border-top: 1px solid #e0e3e8;
      padding: 10px 12px;
      display: flex;
      gap: 6px;
      flex-shrink: 0;
      background: white;
    }
    #frantz-chat-input-area input {
      flex: 1;
      border: 2px solid #e0e3e8;
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.88rem;
      font-family: inherit;
    }
    #frantz-chat-input-area input:focus {
      outline: none;
      border-color: #d4a843;
    }
    #frantz-chat-input-area button {
      background: #d4a843;
      border: none;
      border-radius: 10px;
      color: #0f2440;
      padding: 10px 16px;
      font-weight: 700;
      cursor: pointer;
      font-size: 0.88rem;
    }
    #frantz-chat-input-area button:hover { background: #b8922e; }

    #frantz-chat-quick-replies {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 8px 12px;
      background: white;
      border-top: 1px solid #e0e3e8;
      flex-shrink: 0;
    }
    #frantz-chat-quick-replies .qr {
      background: #f0f2f5;
      border: 1px solid #e0e3e8;
      padding: 6px 12px;
      border-radius: 50px;
      font-size: 0.78rem;
      cursor: pointer;
      color: #1a3a5c;
      transition: all 0.2s;
    }
    #frantz-chat-quick-replies .qr:hover {
      background: #1a3a5c;
      color: white;
    }

    @media (max-width: 480px) {
      #frantz-chat-popup {
        width: 100%;
        height: 85vh;
        bottom: 0;
        right: 0;
        border-radius: 16px 16px 0 0;
      }
      #frantz-chat-toggle {
        bottom: 16px;
        right: 16px;
      }
    }
  `;

  // --- Inject CSS ---
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // --- Create DOM elements ---
  const toggle = document.createElement('button');
  toggle.id = 'frantz-chat-toggle';
  toggle.innerHTML = '<span class="chat-icon">💬</span><span class="close-icon">✕</span>';
  toggle.setAttribute('aria-label', 'Open safe service chat');

  const popup = document.createElement('div');
  popup.id = 'frantz-chat-popup';
  popup.innerHTML = `
    <div id="frantz-chat-popup-header">
      <div class="bot-avatar">🔐</div>
      <div class="header-text">
        <h3>Frantz Safe Assistant</h3>
        <p>Ask about your safe</p>
      </div>
      <button class="header-close" onclick="document.getElementById('frantz-chat-toggle').click()">✕</button>
    </div>
    <div id="frantz-chat-messages">
      <div class="msg bot">
        <strong>🔐 Safe Assistant</strong><br>
        Hi! I can help with safe issues, maintenance, or buying advice. What's up?
      </div>
    </div>
    <div id="frantz-chat-quick-replies">
      <span class="qr" data-q="My safe won't open">🔒 Won't open</span>
      <span class="qr" data-q="Forgot my combination">🔢 Forgot combo</span>
      <span class="qr" data-q="How much does it cost?">💰 Pricing</span>
      <span class="qr" data-q="What are your hours?">🕐 Hours</span>
    </div>
    <div id="frantz-chat-input-area">
      <input id="frantz-chat-input" placeholder="Type your question..." />
      <button id="frantz-chat-send">Send</button>
    </div>
  `;

  document.body.appendChild(toggle);
  document.body.appendChild(popup);

  // --- Toggle ---
  toggle.addEventListener('click', function() {
    this.classList.toggle('open');
    popup.classList.toggle('open');
    if (popup.classList.contains('open')) {
      document.getElementById('frantz-chat-input').focus();
    }
  });

  // --- Quick replies ---
  document.querySelectorAll('#frantz-chat-quick-replies .qr').forEach(el => {
    el.addEventListener('click', function() {
      document.getElementById('frantz-chat-input').value = this.dataset.q;
      sendFrantzMessage();
    });
  });

  // --- Send function ---
  function sendFrantzMessage() {
    const input = document.getElementById('frantz-chat-input');
    const text = input.value.trim();
    if (!text || !window.__frantzBot) return;

    const msgsEl = document.getElementById('frantz-chat-messages');

    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = text;
    msgsEl.appendChild(userMsg);

    input.value = '';

    // Response (with simulated delay)
    setTimeout(() => {
      const response = window.__frantzBot.respond(text);
      const botMsg = document.createElement('div');
      botMsg.className = 'msg bot';
      // Format: bold, phone as call button
      let formatted = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/\n/g, '<br>');
      formatted = formatted.replace(/•/g, '&bull;');
      formatted = formatted.replace(/\(916\) 534-4900/g, '<a href="tel:+19165344900" class="call-btn">📞 (916) 534-4900</a>');
      botMsg.innerHTML = formatted;
      msgsEl.appendChild(botMsg);
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }, 600);

    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  document.getElementById('frantz-chat-send').addEventListener('click', sendFrantzMessage);
  document.getElementById('frantz-chat-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); sendFrantzMessage(); }
  });

  // --- Load knowledge and engine ---
  loadScript('chatbot/safe-knowledge.js', function() {
    loadScript('chatbot/safe-chatbot.js', function() {
      window.__frantzBot = new SafeChatbot(SAFE_KNOWLEDGE);
    });
  });

})();
