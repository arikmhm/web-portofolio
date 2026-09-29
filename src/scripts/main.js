const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const scrollButton = document.querySelector('.scroll-menu');
const menuPanel = document.querySelector('.menu-panel');
const headerInner = document.querySelector('.header-inner');
header.classList.add('js-ready');
menuButton.hidden = false;

function updateNavigation() {
  const scrolled = window.scrollY > 100;
  header.classList.toggle('is-scrolled', scrolled);
  headerInner.inert = scrolled;
  scrollButton.hidden = !scrolled;
}
window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

let previousOverflow = '';
function openMenu() {
  previousOverflow = document.body.style.overflow;
  menuPanel.showModal();
  document.body.style.overflow = 'hidden';
  [menuButton, scrollButton].forEach(button => button.setAttribute('aria-expanded', 'true'));
}
menuButton.addEventListener('click', openMenu);
scrollButton.addEventListener('click', openMenu);
menuPanel.querySelector('.panel-close').addEventListener('click', () => menuPanel.close());
menuPanel.addEventListener('click', (event) => {
  if (event.target.closest('a')) menuPanel.close();
  if (event.target === menuPanel) {
    const rect = menuPanel.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) menuPanel.close();
  }
});
menuPanel.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
  [menuButton, scrollButton].forEach(button => button.setAttribute('aria-expanded', 'false'));
  updateNavigation();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');

if (navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      copyStatus.textContent = 'Email copied.';
    } catch {
      copyStatus.textContent = 'Could not copy. Please select the email address above.';
    }
  });
}

const portfolioFilters = document.querySelector('.portfolio-filters');
const projects = document.querySelectorAll('.project');
portfolioFilters.hidden = false;
portfolioFilters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  portfolioFilters.querySelectorAll('button').forEach((filter) => {
    filter.setAttribute('aria-pressed', String(filter === button));
  });
  let count = 0;
  projects.forEach((project) => {
    project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    if (!project.hidden) count++;
  });
  document.querySelector('.portfolio-count').textContent = `${count} project previews shown`;
});

// A second identical group makes the logo loop seamless, without extra announcements.
const techGroup = document.querySelector('.tech-group');
const techCopy = techGroup.cloneNode(true);
techCopy.setAttribute('aria-hidden', 'true');
techCopy.querySelectorAll('[tabindex]').forEach((item) => item.removeAttribute('tabindex'));
techGroup.after(techCopy);

// Approach: while pinned, each step opens in turn, then folds to its title as the next arrives.
const approach = document.querySelector('.solution');
const approachTrack = approach.querySelector('.approach-track');
const approachPin = approach.querySelector('.approach-pin');
const stages = [...approach.querySelectorAll('.stage')];
const stageCount = approach.querySelector('.approach-count');
const pinnable = matchMedia('(prefers-reduced-motion:no-preference) and (min-height:640px)');
const TRANSITION = .6; // share of each step's scroll spent moving; the rest holds still
const END = stages.length - 1 + .4; // linger on the last step before releasing the page
const ease = x => x * x * (3 - 2 * x);
const clamp01 = x => Math.min(1, Math.max(0, x));
let stageTarget = 0, stageCurrent = 0, stageFrame = 0;
approach.style.setProperty('--steps', END);

function readApproach() {
  const stepLength = (approachTrack.offsetHeight - approachPin.offsetHeight) / END;
  stageTarget = -approachTrack.getBoundingClientRect().top / stepLength;
  if (!stageFrame) stageFrame = requestAnimationFrame(renderApproach);
}

function renderApproach() {
  // Follow the scroll position with easing rather than snapping to it.
  stageCurrent += (stageTarget - stageCurrent) * .12;
  if (Math.abs(stageTarget - stageCurrent) < .0005) stageCurrent = stageTarget;
  stages.forEach((stage, i) => {
    const enter = ease(clamp01((stageCurrent - i) / TRANSITION + 1));
    const fold = i < stages.length - 1 ? ease(clamp01((stageCurrent - i - 1) / TRANSITION + 1)) : 0;
    stage.style.setProperty('--enter', enter.toFixed(4));
    stage.style.setProperty('--enter-fr', `${enter.toFixed(4)}fr`);
    stage.style.setProperty('--fold', fold.toFixed(4));
    stage.style.setProperty('--fold-fr', `${(1 - fold).toFixed(4)}fr`);
  });
  approach.style.setProperty('--progress', clamp01(stageCurrent / (stages.length - 1)).toFixed(4));
  stageCount.textContent = String(Math.min(stages.length, Math.max(1, Math.round(stageCurrent) + 1))).padStart(2, '0');
  stageFrame = stageCurrent === stageTarget ? 0 : requestAnimationFrame(renderApproach);
}

function setupApproach() {
  approach.classList.toggle('is-pinned', pinnable.matches);
  if (!pinnable.matches) return stages.forEach(stage => stage.removeAttribute('style'));
  readApproach();
  stageCurrent = stageTarget;
}
window.addEventListener('scroll', () => { if (pinnable.matches) readApproach(); }, { passive:true });
window.addEventListener('resize', () => { if (pinnable.matches) readApproach(); });
pinnable.addEventListener('change', setupApproach);
setupApproach();
