// Copy BibTeX to clipboard
function copyBib(btn) {
  const pre = btn.previousElementSibling;
  const text = pre.innerText.trim();
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied ✓';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 1800);
  }).catch(() => {
    btn.textContent = 'Copy failed';
  });
}

// ---- Overview video modal ----
// Paste the embed URL here once the video is uploaded:
//   YouTube:  https://www.youtube.com/embed/VIDEO_ID
//   Bilibili: https://player.bilibili.com/player.html?bvid=BVxxxxxxxx&autoplay=0
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/VIDEO_ID";

function openVideo() {
  const frame = document.getElementById('video-modal-frame');
  const sep = VIDEO_EMBED_URL.includes('?') ? '&' : '?';
  frame.innerHTML =
    '<iframe src="' + VIDEO_EMBED_URL + sep + 'autoplay=1" ' +
    'frameborder="0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" ' +
    'allowfullscreen></iframe>';
  document.getElementById('video-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideo(e) {
  // If the click came from inside the player (not the backdrop or close button), ignore
  if (e && e.target.closest('.video-modal-inner') && !e.target.closest('.video-modal-close')) return;
  document.getElementById('video-modal-frame').innerHTML = ''; // stops playback
  document.getElementById('video-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideo();
});

// Lazy-load non-hero images (progressive enhancement)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });
});
