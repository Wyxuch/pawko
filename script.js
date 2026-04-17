// ---- PASSWORD GATE ----
// Change this to whatever password you want
const PASSWORD = 'las2026';

function checkPassword() {
  const input = document.getElementById('gate-input').value;
  if (input === PASSWORD) {
    sessionStorage.setItem('pawko_auth', '1');
    unlockSite();
  } else {
    const err = document.getElementById('gate-error');
    err.textContent = '❌ ZŁE HASŁO, NIEZNAJOMY!';
    document.getElementById('gate-input').value = '';
    document.getElementById('gate-input').focus();
  }
}

function unlockSite() {
  const gate = document.getElementById('gate');
  gate.classList.add('gate--out');
  setTimeout(() => gate.remove(), 400);
}

// Check on load — skip gate if already authenticated this session
if (sessionStorage.getItem('pawko_auth') === '1') {
  document.getElementById('gate').remove();
} else {
  // Block scrolling while gate is up
  document.body.style.overflow = 'hidden';
  document.getElementById('gate').addEventListener('transitionend', () => {
    document.body.style.overflow = '';
  });
}

// Allow Enter key on the input
document.getElementById('gate-input')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkPassword();
});

// Video sound toggle
const video = document.getElementById('hero-video');
const soundBtn = document.getElementById('sound-btn');

function toggleSound() {
  if (!video) return;
  video.muted = !video.muted;
  soundBtn.textContent = video.muted ? '🔇 DŹWIĘK' : '🔊 DŹWIĘK';
}

// Duplicate marquee content so the loop is seamless
document.querySelectorAll('.marquee').forEach(el => {
  el.innerHTML += el.innerHTML;
});

// Scattered blinking stars in the hero background
const hero = document.querySelector('.hero');
if (hero) {
  const count = 28;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.textContent = '★';
    const size = 0.7 + Math.random() * 1.6;
    const top  = 5 + Math.random() * 88;
    const left = Math.random() * 100;
    const dur  = (0.6 + Math.random() * 1.8).toFixed(2);
    const delay = (Math.random() * 2).toFixed(2);
    star.style.cssText = `
      top: ${top}%;
      left: ${left}%;
      font-size: ${size}rem;
      --dur: ${dur}s;
      --delay: -${delay}s;
    `;
    hero.appendChild(star);
  }
}
