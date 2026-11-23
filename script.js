/* ===================================================
   PERİ BAHÇESİ KUTLAMA - JAVASCRIPT ETKİLEŞİMLERİ
   4 EKRANLI SPA & MASAL KİTABI MİMARİSİ
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScreenNavigation();
  initBounceTitle();
  initSparkles();
  initCursorTrail();
  initStorybook();
  initJourneyMilestones();
  initTarhanaCoupons();
  initHeartBurst();
  initSecretLetter();
  initMusicController();
});

/* ===================================================
   1. 4 EKRANLI SPA VE GEZİNME SİSTEMİ (HASH ROUTING)
   =================================================== */

let currentScreenIndex = 1;

function initScreenNavigation() {
  const backBtn = document.getElementById('nav-back-btn');
  const stepperBtns = document.querySelectorAll('.step-flower-btn');
  const btnToScreen2 = document.getElementById('btn-to-screen-2');
  const btnToScreen3 = document.getElementById('btn-to-screen-3');
  const btnToScreen4 = document.getElementById('btn-to-screen-4');
  const restartBtn = document.getElementById('restart-journey-btn');

  // Sayfa yüklendiğinde URL hash'ini oku (#1, #2, #3, #4)
  function getHashScreen() {
    const hash = window.location.hash.replace('#', '');
    const num = parseInt(hash, 10);
    return (num >= 1 && num <= 4) ? num : 1;
  }

  // Ekrana geçiş fonksiyonu
  window.navigateToScreen = function(screenNum, updateHash = true) {
    if (screenNum < 1 || screenNum > 4) return;
    currentScreenIndex = screenNum;

    // 1. Ekranları göster/gizle
    const screens = document.querySelectorAll('.fairy-screen');
    screens.forEach(s => s.classList.remove('active'));

    const targetScreen = document.getElementById(`screen-${screenNum}`);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }

    // 2. Geri butonunu güncelle (Ekran 1'de gizli, diğerlerinde görünür)
    if (backBtn) {
      backBtn.style.visibility = screenNum === 1 ? 'hidden' : 'visible';
    }

    // 3. Üst çiçek göstergesini (stepper) güncelle
    stepperBtns.forEach(btn => {
      const stepVal = parseInt(btn.getAttribute('data-step'), 10);
      btn.classList.toggle('active', stepVal === screenNum);
    });

    // 4. URL Hash'ini güncelle (Tarayıcı geçmişi ve geri tuşu için)
    if (updateHash && window.location.hash !== `#${screenNum}`) {
      window.location.hash = `#${screenNum}`;
    }

    // 5. Sayfayı en tepeye kaydır
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 6. Ekran geçişinde minik ışıltı efekti
    triggerScreenTransitionSparkle();

    // 7. Ekran 3 açıldıysa rozetleri sırayla aç
    if (screenNum === 3) {
      triggerMilestonesReveal();
    }
  };

  // Buton tıklamaları
  if (btnToScreen2) {
    btnToScreen2.addEventListener('click', () => navigateToScreen(2));
  }
  if (btnToScreen3) {
    btnToScreen3.addEventListener('click', () => navigateToScreen(3));
  }
  if (btnToScreen4) {
    btnToScreen4.addEventListener('click', () => navigateToScreen(4));
  }
  if (restartBtn) {
    restartBtn.addEventListener('click', () => navigateToScreen(1));
  }

  // Geri butonu
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (currentScreenIndex > 1) {
        navigateToScreen(currentScreenIndex - 1);
      }
    });
  }

  // Üst çiçek butonları ile doğrudan geçiş
  stepperBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.getAttribute('data-step'), 10);
      navigateToScreen(targetStep);
    });
  });

  // Tarayıcı geri/ileri tuşunu dinle
  window.addEventListener('hashchange', () => {
    const screenFromHash = getHashScreen();
    if (screenFromHash !== currentScreenIndex) {
      navigateToScreen(screenFromHash, false);
    }
  });

  // İlk yüklemede hash ekranına git
  navigateToScreen(getHashScreen(), false);
}

function triggerScreenTransitionSparkle() {
  const icons = ['✨', '🌸', '💫', '💖'];
  for (let i = 0; i < 6; i++) {
    const sp = document.createElement('span');
    sp.className = 'touch-sparkle';
    sp.innerText = icons[Math.floor(Math.random() * icons.length)];
    sp.style.left = `${30 + Math.random() * 40}vw`;
    sp.style.top = `${20 + Math.random() * 30}vh`;
    sp.style.fontSize = `${16 + Math.random() * 12}px`;
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 750);
  }
}

/* ===================================================
   2. BAŞLIK HARF HARF ZIPLAMA EFEKTİ
   =================================================== */

function initBounceTitle() {
  const titleEl = document.getElementById('bounce-title');
  if (!titleEl) return;

  const rawText = "Maraş'ın En Çıtır Tarhanası İŞE GİRDİ!";
  titleEl.innerHTML = '';
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
      charSpan.style.animationDelay = `${globalCharIndex * 0.045 + 0.15}s`;
      wordSpan.appendChild(charSpan);
      globalCharIndex++;
    }

    titleEl.appendChild(wordSpan);
  });
}

/* ===================================================
   3. ARKA PLAN PERİ IŞILTILARI & PARILTILAR
   =================================================== */

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

  for (let i = 0; i < 12; i++) {
    setTimeout(createSparkle, i * 200);
  }
  setInterval(createSparkle, 850);
}

/* ===================================================
   4. FARE & DOKUNMATİK PARILTI İZİ (TOUCH/MOUSE TRAIL)
   =================================================== */

function initCursorTrail() {
  const trailIcons = ['✨', '⭐', '💖', '💕', '🌸', '💫'];
  let lastSparkleTime = 0;
  const throttleMs = 40;

  function spawnTrail(x, y) {
    const now = Date.now();
    if (now - lastSparkleTime < throttleMs) return;
    lastSparkleTime = now;

    const sparkle = document.createElement('span');
    sparkle.className = 'touch-sparkle';
    sparkle.innerText = trailIcons[Math.floor(Math.random() * trailIcons.length)];

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

  window.addEventListener('mousemove', (e) => {
    spawnTrail(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      spawnTrail(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
}

/* ===================================================
   5. EKRAN 2: MASAL KİTABI SAYFA ÇEVİRME & SWIPE
   =================================================== */

function initStorybook() {
  const bookPages = document.querySelectorAll('.book-page');
  const prevBtn = document.getElementById('book-prev-btn');
  const nextBtn = document.getElementById('book-next-btn');
  const openBookBtn = document.getElementById('open-book-btn');
  const bookContainer = document.getElementById('fairy-storybook');

  if (!bookPages.length || !bookContainer) return;

  let currentPageIndex = 0;
  const totalPages = bookPages.length; // 0 (Kapak) ... 8 (Son sayfa)

  function flipToPage(index) {
    if (index < 0) index = 0;
    if (index >= totalPages) index = totalPages - 1;

    currentPageIndex = index;

    bookPages.forEach((page, i) => {
      page.classList.toggle('active', i === currentPageIndex);
    });

    // Yön oklarının görünürlüğü
    if (prevBtn) {
      prevBtn.style.opacity = currentPageIndex === 0 ? '0.4' : '1';
    }
    if (nextBtn) {
      nextBtn.style.opacity = currentPageIndex === totalPages - 1 ? '0.4' : '1';
    }

    // Son sayfaya (Sayfa 8) gelince hafif konfeti ve çiçek yağmuru
    if (currentPageIndex === 8) {
      triggerSoftBookConfetti();
    }
  }

  // Oklara tıklama
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      flipToPage(currentPageIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      flipToPage(currentPageIndex + 1);
    });
  }

  if (openBookBtn) {
    openBookBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      flipToPage(1);
    });
  }

  // Mobilde Sağa / Sola Kaydırma (Swipe) Algılama
  let touchStartX = 0;
  let touchStartY = 0;

  bookContainer.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  bookContainer.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;

      // Yatay kaydırma dikey kaydırmadan belirgin olmalı
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          // Sola kaydırınca -> Sonraki sayfa
          flipToPage(currentPageIndex + 1);
        } else {
          // Sağa kaydırınca -> Önceki sayfa
          flipToPage(currentPageIndex - 1);
        }
      }
    }
  }, { passive: true });

  // Klavye Yön Tuşları (Masaüstü için)
  window.addEventListener('keydown', (e) => {
    if (currentScreenIndex === 2) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        flipToPage(currentPageIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        flipToPage(currentPageIndex - 1);
      }
    }
  });

  // İlk sayfayı hazırla
  flipToPage(0);
}

function triggerSoftBookConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD6E8', '#FFB3D1', '#FFE5D9', '#C9B8FF', '#FFFFFF']
    });
  }
}

/* ===================================================
   6. EKRAN 3: ROZETLER & SAMİMİ NOTLAR
   =================================================== */

function initJourneyMilestones() {
  const milestoneItems = document.querySelectorAll('.milestone-item');
  if (!milestoneItems.length) return;

  milestoneItems.forEach((item) => {
    const btn = item.querySelector('.milestone-badge-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isAlreadyOpen = item.classList.contains('is-open');
        item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', !isAlreadyOpen);

        if (!isAlreadyOpen) {
          triggerMiniBurst(btn);
        }
      });
    }
  });
}

function triggerMilestonesReveal() {
  const milestoneItems = document.querySelectorAll('.milestone-item');
  milestoneItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('badge-revealed');
    }, index * 160 + 100);
  });
}

function triggerMiniBurst(element) {
  const rect = element.getBoundingClientRect();
  const burstIcons = ['✨', '🌸', '💖', '⭐'];
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'touch-sparkle';
    sparkle.innerText = burstIcons[Math.floor(Math.random() * burstIcons.length)];
    const offsetX = (Math.random() - 0.5) * (rect.width * 0.7);
    sparkle.style.left = `${rect.left + rect.width / 2 + offsetX}px`;
    sparkle.style.top = `${rect.top + rect.height / 2}px`;
    sparkle.style.fontSize = `${14 + Math.random() * 8}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }
}

/* ===================================================
   7. EKRAN 4: TARHANA KUPONLARI ("KULLANILDI ✨")
   =================================================== */

function initTarhanaCoupons() {
  const coupons = document.querySelectorAll('.coupon-ticket');
  if (!coupons.length) return;

  coupons.forEach(coupon => {
    coupon.addEventListener('click', () => {
      const isStamped = coupon.classList.contains('is-stamped');
      coupon.classList.toggle('is-stamped');

      if (!isStamped) {
        triggerMiniBurst(coupon);
        // Titreşim (destekleyen cihazlarda)
        if (navigator.vibrate) {
          navigator.vibrate(40);
        }
      }
    });
  });
}

/* ===================================================
   8. KALBİNİ PATLAT 💖 & BÜYÜK KUTLAMA OVERLAY
   =================================================== */

function initHeartBurst() {
  const burstBtn = document.getElementById('heart-burst-btn');
  const overlay = document.getElementById('celebration-overlay');
  const closeBtn = document.getElementById('close-celebration-btn');

  if (!burstBtn) return;

  burstBtn.addEventListener('click', () => {
    launchGrandConfetti();
    setTimeout(() => {
      if (overlay) overlay.style.display = 'flex';
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

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });
    }, 400);

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
  }
}

/* ===================================================
   9. GİZLİ SÜRPRİZ MEKTUP (5 DOKUNUŞ YA DA ÇİÇEK)
   =================================================== */

function initSecretLetter() {
  const modal = document.getElementById('secret-letter-modal');
  const closeBtn = document.getElementById('close-letter-btn');
  const secretFlowers = document.querySelectorAll('.secret-flower-btn');
  const mascotTargets = document.querySelectorAll('.character-tap-target');

  if (!modal) return;

  function openLetter() {
    modal.style.display = 'flex';
    launchGrandConfetti();
  }

  function closeLetter() {
    modal.style.display = 'none';
  }

  // Çiçeğe tıklama
  secretFlowers.forEach(flower => {
    flower.addEventListener('click', (e) => {
      e.stopPropagation();
      openLetter();
    });
  });

  // Karaktere 5 kere dokunma
  let tapCount = 0;
  let lastTapTime = 0;

  mascotTargets.forEach(target => {
    target.addEventListener('click', () => {
      const currentTime = Date.now();
      if (currentTime - lastTapTime < 1600) {
        tapCount++;
      } else {
        tapCount = 1;
      }
      lastTapTime = currentTime;

      // Karakter zıplama efekti
      target.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.09) rotate(4deg)' },
        { transform: 'scale(1)' }
      ], { duration: 250 });

      if (tapCount >= 5) {
        tapCount = 0;
        openLetter();
      }
    });
  });

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
   10. MÜZİK KONTROLCÜSÜ (YOUTUBE)
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
      if (!hasLoadedIframe) {
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
          iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      }

      isPlaying = true;
      toggleBtn.classList.add('is-playing');
      musicIcon.innerText = '🔊';
      toggleBtn.setAttribute('title', 'Müziği Durdur ⏸');

    } else {
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
