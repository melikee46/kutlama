/* ===================================================
   PERİ BAHÇESİ KUTLAMA - JAVASCRIPT ETKİLEŞİMLERİ
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBounceTitle();
  initSparkles();
  initCursorTrail();
  initNavigation();
  initStoryChat();
  initJourneyMilestones();
  initHeartBurst();
  initSecretLetter();
  initMusicController();
});

/* 1. Başlık Harflerinin Tek Tek Zıplayarak Gelmesi */
function initBounceTitle() {
  const titleEl = document.getElementById('bounce-title');
  if (!titleEl) return;

  const rawText = "Maraş'ın En Çıtır Tarhanası İŞE GİRDİ!";
  titleEl.innerHTML = ''; // Temizle
  titleEl.setAttribute('aria-label', rawText);

  const words = rawText.split(' ');
  let globalCharIndex = 0;

  words.forEach((word) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'title-word';

    for (let i = 0; i < word.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.className = 'bounce-char';
      charSpan.innerText = word[i];
      // Her harfe sırayla gecikme (delay) ata
      charSpan.style.animationDelay = `${globalCharIndex * 0.045 + 0.15}s`;
      wordSpan.appendChild(charSpan);
      globalCharIndex++;
    }

    titleEl.appendChild(wordSpan);
  });
}

/* 2. Arka Planda Yükselen Peri Işıltıları */
function initSparkles() {
  const container = document.getElementById('sparkles-container');
  if (!container) return;

  const sparkleIcons = ['✨', '🌸', '💫', '🤍', '⭐', '🪻'];

  function createSparkle() {
    const el = document.createElement('span');
    el.className = 'sparkle-particle';
    el.innerText = sparkleIcons[Math.floor(Math.random() * sparkleIcons.length)];
    
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const size = 12 + Math.random() * 14;
    const duration = 3.5 + Math.random() * 3;

    el.style.left = `${posX}vw`;
    el.style.top = `${posY}vh`;
    el.style.fontSize = `${size}px`;
    el.style.animationDuration = `${duration}s`;

    container.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, duration * 1000);
  }

  for (let i = 0; i < 14; i++) {
    setTimeout(createSparkle, i * 200);
  }
  setInterval(createSparkle, 850);
}

/* 3. Fare & Dokunmatik Parıltı İzi Efekti (Touch/Mouse Trail) */
function initCursorTrail() {
  const trailIcons = ['✨', '⭐', '💖', '💕', '🌸', '💫'];
  let lastSparkleTime = 0;
  const throttleMs = 38; // Akıcı 60fps için kısıtlama

  function spawnTrail(x, y) {
    const now = Date.now();
    if (now - lastSparkleTime < throttleMs) return;
    lastSparkleTime = now;

    const sparkle = document.createElement('span');
    sparkle.className = 'touch-sparkle';
    sparkle.innerText = trailIcons[Math.floor(Math.random() * trailIcons.length)];

    // Minik rastgele yatay kayma
    const driftX = (Math.random() - 0.5) * 40;
    sparkle.style.setProperty('--drift-x', `${driftX}px`);

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.fontSize = `${12 + Math.random() * 12}px`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 850);
  }

  // Masaüstü fare hareketi
  window.addEventListener('mousemove', (e) => {
    spawnTrail(e.clientX, e.clientY);
  }, { passive: true });

  // Mobil dokunmatik hareket & ilk dokunuş
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      spawnTrail(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      spawnTrail(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
}

/* 4. Yumuşak Kaydırma (Scroll) */
function initNavigation() {
  const startBtn = document.getElementById('start-journey-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const nextSection = document.getElementById('our-story');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

/* 5. Bizim Hikâyemiz - Pastel WhatsApp Sohbet Animasyonu */
function initStoryChat() {
  const streamContainer = document.getElementById('chat-bubble-stream');
  const typingIndicator = document.getElementById('typing-indicator');
  const typingName = document.getElementById('typing-name');
  const replayBtn = document.getElementById('replay-chat-btn');
  const storySection = document.getElementById('our-story');

  if (!streamContainer || !typingIndicator || !storySection) return;

  const chatStory = [
    {
      sender: 'friend',
      name: 'En Yakın Dost 🌸',
      text: 'İkkanım ses ver! Mülakat sonucu açıklandı mı, çatlayacağım meraktan?! 🥹',
      time: '14:28',
      ornament: '🌸',
      ornamentPos: 'ornament-top-left',
      sticker: null,
      typingDelay: 850
    },
    {
      sender: 'ikkan',
      name: 'İkkan 🧚‍♀️',
      text: 'KABUL ALDIMMM! YENİ İŞİM RESMİLEŞTİİİ! 🥳🎉🥂',
      time: '14:29',
      ornament: '💖',
      ornamentPos: 'ornament-top-right',
      sticker: '🥳',
      typingDelay: 1100
    },
    {
      sender: 'friend',
      name: 'En Yakın Dost 🌸',
      html: '<span class="highlight-shout">HAYIRLI OLSUN İKKAN! 💖✨</span> Gözümüz aydın, Maraş’ın en çıtır mühendisi resmi olarak sahnede! Gururdan ağlayacağım şimdi 🥹🧁',
      time: '14:30',
      ornament: '🌷',
      ornamentPos: 'ornament-top-left',
      sticker: '🧚‍♀️',
      typingDelay: 1200
    },
    {
      sender: 'ikkan',
      name: 'İkkan 🧚‍♀️',
      text: 'İyi ki varsın en güzel kalplimmm, senin desteğin olmasa başaramazdım 🥺🤍 Beraber kutlayacağımız nice başarılara!',
      time: '14:31',
      ornament: '💕',
      ornamentPos: 'ornament-top-right',
      sticker: '🥺',
      typingDelay: 1000
    }
  ];

  let isPlaying = false;
  let hasPlayedOnce = false;

  async function playConversation() {
    if (isPlaying) return;
    isPlaying = true;
    streamContainer.innerHTML = ''; // Temizle

    for (let i = 0; i < chatStory.length; i++) {
      const msg = chatStory[i];

      // 1. Yazıyor göstergesini göster
      typingName.innerText = msg.sender === 'ikkan' ? 'İkkan' : 'En Yakın Dost';
      typingIndicator.style.display = 'flex';
      
      // Göstergeyi mesajların altına kaydır
      streamContainer.appendChild(typingIndicator);

      // Yazıyor beklemesi
      await new Promise(resolve => setTimeout(resolve, msg.typingDelay));

      // 2. Yazıyor göstergesini gizle
      typingIndicator.style.display = 'none';

      // 3. Mesaj balonunu oluştur
      const row = document.createElement('div');
      row.className = `chat-row ${msg.sender === 'ikkan' ? 'row-right' : 'row-left'}`;

      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${msg.sender === 'ikkan' ? 'bubble-lavender' : 'bubble-pink'}`;

      // Köşe süsü
      if (msg.ornament) {
        const ornament = document.createElement('span');
        ornament.className = `bubble-ornament ${msg.ornamentPos}`;
        ornament.innerText = msg.ornament;
        bubble.appendChild(ornament);
      }

      // Gönderen adı
      const senderSpan = document.createElement('span');
      senderSpan.className = 'bubble-sender-name';
      senderSpan.innerText = msg.name;
      bubble.appendChild(senderSpan);

      // Metin
      const textSpan = document.createElement('div');
      textSpan.className = 'bubble-text';
      if (msg.html) {
        textSpan.innerHTML = msg.html;
      } else {
        textSpan.innerText = msg.text;
      }
      bubble.appendChild(textSpan);

      // Saat ve çift tik
      const meta = document.createElement('div');
      meta.className = 'bubble-meta';
      meta.innerHTML = `<span>${msg.time}</span> <span class="checkmarks">✓✓</span>`;
      bubble.appendChild(meta);

      // Sticker varsa
      if (msg.sticker) {
        const stickerSpan = document.createElement('span');
        stickerSpan.className = 'bubble-sticker';
        stickerSpan.innerText = msg.sticker;
        if (msg.sender === 'ikkan') {
          row.appendChild(stickerSpan);
          row.appendChild(bubble);
        } else {
          row.appendChild(bubble);
          row.appendChild(stickerSpan);
        }
      } else {
        row.appendChild(bubble);
      }

      streamContainer.appendChild(row);

      // Mesajlar arası tatlı bir duraklama
      await new Promise(resolve => setTimeout(resolve, 450));
    }

    isPlaying = false;
    hasPlayedOnce = true;
  }

  // Sayfa kaydırıldığında otomatik başlatma
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasPlayedOnce) {
        playConversation();
      }
    });
  }, { threshold: 0.25 });

  observer.observe(storySection);

  // Tekrar oynatma butonu
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      playConversation();
    });
  }
}

/* 6. Bacım Bütün Zorlukları Aştı - Kıvrımlı Patika & Rozet Etkileşimleri */
function initJourneyMilestones() {
  const milestoneItems = document.querySelectorAll('.milestone-item');
  if (!milestoneItems.length) return;

  // Kaydırdıkça rozetlerin sırayla 'pop' diye belirmesi
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('badge-revealed');
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

  milestoneItems.forEach((item, index) => {
    // Hafif basamaklı gecikme
    item.style.transitionDelay = `${index * 0.12}s`;
    observer.observe(item);

    const btn = item.querySelector('.milestone-badge-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isAlreadyOpen = item.classList.contains('is-open');
        
        // Tıklananı aç/kapat
        item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', !isAlreadyOpen);

        // Açıldığında minik parıltı efekti
        if (!isAlreadyOpen) {
          triggerMiniBurst(btn);
        }
      });

      // Klavye erişilebilirliği
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    }
  });

  // Rozet açıldığında etrafında minik ışıltı patlaması
  function triggerMiniBurst(element) {
    const rect = element.getBoundingClientRect();
    const burstIcons = ['✨', '🌸', '💖', '⭐'];
    
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'touch-sparkle';
      sparkle.innerText = burstIcons[Math.floor(Math.random() * burstIcons.length)];

      const offsetX = (Math.random() - 0.5) * (rect.width * 0.7);
      const offsetY = (Math.random() - 0.5) * 30;

      sparkle.style.left = `${rect.left + rect.width / 2 + offsetX}px`;
      sparkle.style.top = `${rect.top + rect.height / 2 + offsetY}px`;
      sparkle.style.fontSize = `${14 + Math.random() * 8}px`;

      document.body.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 800);
    }
  }
}

/* ===================================================
   7. KALBİNİ PATLAT 💖 & BÜYÜK KUTLAMA OVERLAY
   =================================================== */

function initHeartBurst() {
  const burstBtn = document.getElementById('heart-burst-btn');
  const overlay = document.getElementById('celebration-overlay');
  const closeBtn = document.getElementById('close-celebration-btn');

  if (!burstBtn) return;

  burstBtn.addEventListener('click', () => {
    // 1. Ekranın her yerinden yüzlerce kalp, çiçek, yıldız ve konfeti patlat
    launchGrandConfetti();

    // 2. Ardından "BACIM İŞE GİRDİ, YAŞASIN!!! 🎉" ekranını göster
    setTimeout(() => {
      if (overlay) {
        overlay.style.display = 'flex';
      }
    }, 450);
  });

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  }
}

function launchGrandConfetti() {
  const colors = ['#FFD6E8', '#FFB3D1', '#FFE5D9', '#C9B8FF', '#FFD166', '#FF4081', '#FFFFFF'];

  // canvas-confetti kütüphanesi yüklü mü kontrol et
  if (typeof confetti === 'function') {
    // Merkez patlama
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors
    });

    // Sol alttan fışkırtma
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
    }, 200);

    // Sağ alttan fışkırtma
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });
    }, 400);

    // Kalp ve peri tozu yağmuru (3 saniye sürsün)
    const end = Date.now() + 2500;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: colors
      });
    }, 250);

  } else {
    // CDN erişimi olmazsa saf JS yedek patlama
    triggerFallbackConfetti();
  }
}

function triggerFallbackConfetti() {
  const colors = ['#FFD6E8', '#FFB3D1', '#FFE5D9', '#C9B8FF', '#FFD166', '#FFFFFF'];
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 8 + Math.random() * 10;
    piece.style.position = 'fixed';
    piece.style.width = `${size}px`;
    piece.style.height = `${size}px`;
    piece.style.backgroundColor = color;
    piece.style.borderRadius = '50%';
    piece.style.zIndex = '999999';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.top = '-20px';
    piece.style.pointerEvents = 'none';
    document.body.appendChild(piece);

    piece.animate([
      { transform: 'translate(0, 0)', opacity: 1 },
      { transform: `translate(${(Math.random() - 0.5) * 200}px, 105vh) rotate(720deg)`, opacity: 0 }
    ], {
      duration: 2500 + Math.random() * 2000,
      easing: 'ease-out'
    });

    setTimeout(() => piece.remove(), 4500);
  }
}

/* ===================================================
   8. GİZLİ SÜRPRİZ MEKTUP (ÇİÇEK YA DA 3 DOKUNUŞ)
   =================================================== */

function initSecretLetter() {
  const modal = document.getElementById('secret-letter-modal');
  const closeBtn = document.getElementById('close-letter-btn');
  const flowerBtn = document.getElementById('secret-flower-btn');
  const mascotArea = document.getElementById('character-tap-area');

  if (!modal) return;

  function openLetter() {
    modal.style.display = 'flex';
    // Mektup açıldığında tatlı bir ışıltı patlaması
    launchGrandConfetti();
  }

  function closeLetter() {
    modal.style.display = 'none';
  }

  // 1. Çiçeğe tıklanınca açılma
  if (flowerBtn) {
    flowerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLetter();
    });
  }

  // 2. Karakter alanına 3 kez art arda dokununca / tıklanınca açılma
  if (mascotArea) {
    let tapCount = 0;
    let lastTapTime = 0;

    mascotArea.addEventListener('click', () => {
      const currentTime = Date.now();
      if (currentTime - lastTapTime < 1400) {
        tapCount++;
      } else {
        tapCount = 1;
      }
      lastTapTime = currentTime;

      // Karakteri hafifçe hoplat
      mascotArea.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.08) rotate(4deg)' },
        { transform: 'scale(1)' }
      ], { duration: 250 });

      if (tapCount >= 3) {
        tapCount = 0;
        openLetter();
      }
    });
  }

  // Kapatma butonu & dışarı tıklama
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLetter);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLetter();
    }
  });
}

/* ===================================================
   9. SAĞ ÜST MÜZİK KONTROLCÜSÜ (YOUTUBE)
   =================================================== */

function initMusicController() {
  const toggleBtn = document.getElementById('music-toggle-btn');
  const musicIcon = document.getElementById('music-icon');
  const playerContainer = document.getElementById('youtube-player-container');

  if (!toggleBtn || !playerContainer) return;

  let isPlaying = false;
  let hasLoadedIframe = false;
  const videoId = 'n2OiQTYeCvM';

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      // Çalmaya başla
      if (!hasLoadedIframe) {
        // YouTube iframe oluştur (autoplay ve loop ile)
        playerContainer.innerHTML = `
          <iframe id="yt-player-frame" width="200" height="200"
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&loop=1&playlist=${videoId}&playsinline=1"
            title="Kutlama Müziği"
            allow="autoplay; encrypted-media"
            allowfullscreen>
          </iframe>
        `;
        hasLoadedIframe = true;
      } else {
        const iframe = document.getElementById('yt-player-frame');
        if (iframe) {
          // Play komutu gönder
          iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      }

      isPlaying = true;
      toggleBtn.classList.add('is-playing');
      musicIcon.innerText = '🔊';
      toggleBtn.setAttribute('title', 'Müziği Durdur ⏸');

    } else {
      // Durdur / Sessize al
      const iframe = document.getElementById('yt-player-frame');
      if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }

      isPlaying = false;
      toggleBtn.classList.remove('is-playing');
      musicIcon.innerText = '🔇';
      toggleBtn.setAttribute('title', 'Müziği Aç 🎵');
    }
  });
}
