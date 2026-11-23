/* ===================================================
   PERİ BAHÇESİ KUTLAMA - JAVASCRIPT ETKİLEŞİMLERİ
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSparkles();
  initNavigation();
  initConfetti();
});

/* 1. Arka Planda Yükselen Peri Işıltıları */
function initSparkles() {
  const container = document.getElementById('sparkles-container');
  if (!container) return;

  const sparkleIcons = ['✨', '🌸', '💫', '🤍', '⭐'];

  function createSparkle() {
    const el = document.createElement('span');
    el.className = 'sparkle-particle';
    el.innerText = sparkleIcons[Math.floor(Math.random() * sparkleIcons.length)];
    
    // Rastgele konum ve boyut
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const size = 12 + Math.random() * 14;
    const duration = 3.5 + Math.random() * 3;

    el.style.left = `${posX}vw`;
    el.style.top = `${posY}vh`;
    el.style.fontSize = `${size}px`;
    el.style.animationDuration = `${duration}s`;

    container.appendChild(el);

    // Animasyon bitince temizle
    setTimeout(() => {
      el.remove();
    }, duration * 1000);
  }

  // İlk parıltıları ekle ve belirli aralıklarla üret
  for (let i = 0; i < 12; i++) {
    setTimeout(createSparkle, i * 250);
  }
  setInterval(createSparkle, 900);
}

/* 2. Yumuşak Kaydırma (Scroll) */
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

/* 3. Saf JavaScript Konfeti Yağmuru */
function initConfetti() {
  const celebrateBtn = document.getElementById('celebrate-btn');
  if (!celebrateBtn) return;

  celebrateBtn.addEventListener('click', () => {
    triggerConfetti();
  });
}

function triggerConfetti() {
  const colors = ['#FFD6E8', '#FFB3D1', '#FFE5D9', '#C9B8FF', '#FFD166', '#FFFFFF'];
  const confettiCount = 60;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    
    // Rastgele renk ve şekil
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 6 + Math.random() * 8;
    const isRound = Math.random() > 0.5;

    confetti.style.position = 'fixed';
    confetti.style.width = `${size}px`;
    confetti.style.height = `${isRound ? size : size * 1.5}px`;
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = isRound ? '50%' : '3px';
    confetti.style.zIndex = '9999';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = '-20px';
    confetti.style.pointerEvents = 'none';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.boxShadow = `0 2px 6px ${color}88`;

    document.body.appendChild(confetti);

    // Düşme ve dönme animasyonu
    const fallDuration = 2000 + Math.random() * 2500;
    const horizontalDrift = (Math.random() - 0.5) * 150;

    confetti.animate([
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${horizontalDrift}px, 105vh) rotate(${720 + Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: fallDuration,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    });

    setTimeout(() => {
      confetti.remove();
    }, fallDuration);
  }
}
