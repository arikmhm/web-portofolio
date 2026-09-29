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
const pinnable = matchMedia('(prefers-reduced-motion:no-preference) and (min-height:545px)');
const TRANSITION = .6; // share of each step's scroll spent moving; the rest holds still
const END = stages.length + .2; // the last step folds too, then all titles hold briefly before releasing the page
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
    const fold = ease(clamp01((stageCurrent - i - 1) / TRANSITION + 1));
    stage.style.setProperty('--enter', enter.toFixed(4));
    stage.style.setProperty('--enter-fr', `${enter.toFixed(4)}fr`);
    stage.style.setProperty('--fold', fold.toFixed(4));
    stage.style.setProperty('--fold-fr', `${(1 - fold).toFixed(4)}fr`);
  });
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

// Hero: strike out the decoy words, then settle on the highlighted "right".
const heroTitle = document.querySelector('#hero-title');
const heroSwap = heroTitle.querySelector('.hero-swap');
const swapWords = [...heroSwap.children];
const answer = swapWords[swapWords.length - 1];
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
let swapWidths = [];
const heroCta = document.querySelector('.hero-cta');

function nudgeCta() {
  if (heroCta.matches(':hover, :focus')) return;
  heroCta.classList.remove('is-nudging');
  heroCta.offsetWidth;
  heroCta.classList.add('is-nudging');
}
// Both arrows end where they started, so dropping the class after the copy lands is seamless.
heroCta.addEventListener('animationend', (event) => { if (event.animationName === 'cta-in') heroCta.classList.remove('is-nudging'); });

function fitHeroSwap() {
  // If the widest word would push "solution." onto its own line, keep it there for every word so the heading never reflows mid-loop.
  const width = heroSwap.style.width;
  heroSwap.style.transition = 'none';
  heroTitle.classList.remove('is-stacked');
  const heights = swapWidths.map(em => { heroSwap.style.width = `${em}em`; return heroTitle.offsetHeight; });
  heroTitle.classList.toggle('is-stacked', Math.max(...heights) > heights[heights.length - 1]);
  heroSwap.style.width = width;
  heroSwap.offsetWidth;
  heroSwap.style.transition = '';
}

function showWord(word, animate = true) {
  // Reset an exited word below the line without animating, then bring it in.
  word.style.transition = 'none';
  word.classList.remove('is-out', 'is-struck', 'is-marked');
  word.offsetWidth;
  word.style.transition = animate ? '' : 'none';
  heroSwap.style.width = `${swapWidths[swapWords.indexOf(word)]}em`;
  word.classList.add('is-in');
}

async function runHeroSwap() {
  heroSwap.classList.add('is-live');
  const fontSize = parseFloat(getComputedStyle(heroSwap).fontSize);
  swapWidths = swapWords.map(word => word.offsetWidth / fontSize);
  fitHeroSwap();
  window.addEventListener('resize', fitHeroSwap);
  heroSwap.style.transition = 'none';
  showWord(answer, false);
  answer.classList.add('is-marked');
  heroSwap.offsetWidth;
  heroSwap.style.transition = answer.style.transition = '';
  for (;;) {
    await wait(700); // let the highlight finish, then point to the next step
    nudgeCta();
    await wait(4100);
    answer.classList.remove('is-marked');
    await wait(600);
    answer.classList.replace('is-in', 'is-out');
    for (const word of swapWords.slice(0, -1)) {
      showWord(word);
      await wait(900);
      word.classList.add('is-struck');
      await wait(850);
      word.classList.replace('is-in', 'is-out');
    }
    showWord(answer);
    await wait(450);
    answer.classList.add('is-marked');
  }
}
if (matchMedia('(prefers-reduced-motion:no-preference)').matches) document.fonts.ready.then(runHeroSwap);
