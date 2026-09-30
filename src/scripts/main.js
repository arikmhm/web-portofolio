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

// Pinned stacks (Approach, Work, Experience): while pinned, each item opens in turn, then folds to its title as the next arrives.
const pinnable = matchMedia('(prefers-reduced-motion:no-preference) and (min-height:545px)');
const TRANSITION = .6; // share of each item's scroll spent moving; the rest holds still
const ease = x => x * x * (3 - 2 * x);
const clamp01 = x => Math.min(1, Math.max(0, x));

function pinnedStack(section, track, pin, items, list) {
  let end = items.length + .2; // the last item folds too, then all titles hold briefly before releasing the page
  let target = 0, current = 0, frame = 0;
  section.style.setProperty('--steps', end);

  // With a list, the next section scrolls up under the folded titles instead of leaving the rest of the frame empty:
  // the track is shortened by that spare space, and the final hold lasts long enough to cover it.
  function fitRelease() {
    items.forEach(item => { item.style.cssText = '--enter:1;--enter-fr:1fr;--fold:1;--fold-fr:0fr'; });
    track.style.marginBottom = '';
    // Capped at the content left below the track: the track still counts toward the page height, so pulling up more
    // than what follows would leave blank space after the footer.
    const after = document.documentElement.scrollHeight - (track.getBoundingClientRect().bottom + scrollY);
    const spare = Math.min(after, Math.max(0, pin.offsetHeight - (list.getBoundingClientRect().bottom - pin.getBoundingClientRect().top) - 48));
    end = items.length + Math.max(.2, spare / (pin.offsetHeight * .6)); // one item's scroll is 60% of the frame
    section.style.setProperty('--steps', end);
    track.style.marginBottom = `${-spare}px`;
  }

  function read() {
    const stepLength = (track.offsetHeight - pin.offsetHeight) / end;
    target = -track.getBoundingClientRect().top / stepLength;
    if (!frame) frame = requestAnimationFrame(render);
  }

  function render() {
    // Follow the scroll position with easing rather than snapping to it.
    current += (target - current) * .12;
    if (Math.abs(target - current) < .0005) current = target;
    items.forEach((item, i) => {
      const enter = i ? ease(clamp01((current - i) / TRANSITION + 1)) : 1; // the first item is already there as the section arrives
      const fold = ease(clamp01((current - i - 1) / TRANSITION + 1));
      item.style.setProperty('--enter', enter.toFixed(4));
      item.style.setProperty('--enter-fr', `${enter.toFixed(4)}fr`);
      item.style.setProperty('--fold', fold.toFixed(4));
      item.style.setProperty('--fold-fr', `${(1 - fold).toFixed(4)}fr`);
    });
    frame = current === target ? 0 : requestAnimationFrame(render);
  }

  function setup() {
    section.classList.toggle('is-pinned', pinnable.matches);
    if (!pinnable.matches) {
      track.style.marginBottom = '';
      return items.forEach(item => item.removeAttribute('style'));
    }
    if (list) fitRelease();
    read();
    current = target;
  }
  window.addEventListener('scroll', () => { if (pinnable.matches) read(); }, { passive:true });
  window.addEventListener('resize', () => {
    if (!pinnable.matches) return;
    if (list) fitRelease(); // render() restores the item styles on the next frame
    read();
  });
  pinnable.addEventListener('change', setup);
  setup();
}

const approach = document.querySelector('.solution');
pinnedStack(approach, approach.querySelector('.approach-track'), approach.querySelector('.approach-pin'), [...approach.querySelectorAll('.stage')]);
const work = document.querySelector('.portfolio');
pinnedStack(work, work.querySelector('.pin-track'), work.querySelector('.pin-frame'), [...work.querySelectorAll('.pin-item')], work.querySelector('.project-list'));
const experience = document.querySelector('.experience');
pinnedStack(experience, experience.querySelector('.pin-track'), experience.querySelector('.pin-frame'), [...experience.querySelectorAll('.pin-item')], experience.querySelector('.experience-list'));

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

// The hero stays put while the next sections scroll over it. When it is taller than the
// screen, it sticks by its bottom edge instead so the call to action is never hidden.
const hero = document.querySelector('.hero');
function fitStickyHero() { hero.style.setProperty('--hero-top', `${Math.min(0, innerHeight - hero.offsetHeight)}px`); }
addEventListener('resize', fitStickyHero);
new ResizeObserver(fitStickyHero).observe(hero);
