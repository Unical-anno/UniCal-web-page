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
// Local overview video served from the site (static/videos/).
const VIDEO_SRC = "static/videos/unical_video_v3_1.mp4";

function openVideo() {
  const frame = document.getElementById('video-modal-frame');
  frame.innerHTML =
    '<video src="' + VIDEO_SRC + '" controls autoplay playsinline preload="auto"></video>';
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
