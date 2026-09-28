const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

header.classList.add('js-ready');
menuButton.hidden = false;

function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');

if (navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      copyStatus.textContent = 'Alamat email berhasil disalin.';
    } catch {
      copyStatus.textContent = 'Belum bisa menyalin. Pilih alamat email di atas.';
    }
  });
}

const workflow = document.querySelector('.workflow');
const playback = workflow.querySelector('.workflow-toggle');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = false;
let workflowVisible = false;

function updatePlayback() {
  const reduced = motionPreference.matches;
  const running = !userPaused && !reduced && workflowVisible && !document.hidden;
  workflow.classList.toggle('is-running', running);
  playback.disabled = reduced;
  playback.innerHTML = reduced ? 'Gerak dikurangi' : userPaused ? 'Putar <span aria-hidden="true">▷</span>' : 'Jeda <span aria-hidden="true">Ⅱ</span>';
  playback.setAttribute('aria-label', reduced ? 'Animasi mengikuti pengaturan pengurangan gerak' : userPaused ? 'Putar animasi workflow' : 'Jeda animasi workflow');
  workflow.querySelector('.workflow-state').textContent = reduced ? 'Tampilan statis' : userPaused ? 'Dijeda' : 'Alur berulang';
}

playback.hidden = false;
playback.addEventListener('click', () => {
  userPaused = !userPaused;
  updatePlayback();
});
motionPreference.addEventListener('change', updatePlayback);
document.addEventListener('visibilitychange', updatePlayback);
new IntersectionObserver(([entry]) => {
  workflowVisible = entry.isIntersecting;
  updatePlayback();
}, { threshold: 0.15 }).observe(workflow);
updatePlayback();

const requestFilters = document.querySelector('.request-filters');
const requestRows = document.querySelectorAll('.request-table tbody tr');
requestFilters.hidden = false;
requestFilters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  requestFilters.querySelectorAll('button').forEach((filter) => {
    filter.setAttribute('aria-pressed', String(filter === button));
  });
  let visibleCount = 0;
  requestRows.forEach((row) => {
    row.hidden = button.dataset.filter !== 'all' && row.dataset.status !== button.dataset.filter;
    if (!row.hidden) visibleCount++;
  });
  document.querySelector('.request-count').textContent = `${visibleCount} permintaan ditampilkan`;
});
