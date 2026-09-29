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

// Matching SVG contours keep joints aligned across the desktop and mobile layouts.
const puzzle = document.querySelector('.solution-stages');
const pieces = [...puzzle.children];
const mobilePuzzle = matchMedia('(max-width:760px)');
const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
const svgNS = 'http://www.w3.org/2000/svg';
const shapes = pieces.map(piece => {
  const svg = document.createElementNS(svgNS, 'svg');
  svg.classList.add('puzzle-shape');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.append(document.createElementNS(svgNS, 'path'));
  piece.prepend(svg);
  return svg;
});

function puzzleEdge(x, y, dx, dy, joint = 0, position = .5) {
  const length = Math.hypot(dx, dy);
  const point = (along, out = 0) => `${x + dx / length * along + dy / length * out},${y + dy / length * along - dx / length * out}`;
  if (!joint) return `L${point(length)}`;
  const center = length * position;
  const depth = 23 * joint;
  return `L${point(center - 12)} C${point(center - 12, depth * .3)} ${point(center - 22, depth * .35)} ${point(center - 22, depth * .65)} C${point(center - 22, depth * 1.25)} ${point(center + 22, depth * 1.25)} ${point(center + 22, depth * .65)} C${point(center + 22, depth * .35)} ${point(center + 12, depth * .3)} ${point(center + 12)} L${point(length)}`;
}

function drawPuzzle() {
  puzzle.classList.add('puzzle-ready');
  // Clockwise edges: top, right, bottom, left. Opposing edges share a contour.
  const desktopJoints = [[0,1,1,0],[0,1,0,-1],[0,0,1,-1],[-1,1,0,0],[-1,0,0,-1]];
  pieces.forEach((piece, i) => {
    const w = piece.offsetWidth;
    const h = piece.offsetHeight;
    const joints = mobilePuzzle.matches ? [i ? -1 : 0,0,i < 4 ? 1 : 0,0] : desktopJoints[i];
    const topPosition = mobilePuzzle.matches ? .75 : i === 3 ? 1/3 : i === 4 ? 2/3 : .5;
    const bottomPosition = mobilePuzzle.matches ? .25 : .5;
    shapes[i].setAttribute('viewBox', `0 0 ${w} ${h}`);
    shapes[i].firstChild.setAttribute('d', `M0,0 ${puzzleEdge(0,0,w,0,joints[0],topPosition)} ${puzzleEdge(w,0,0,h,joints[1])} ${puzzleEdge(w,h,-w,0,joints[2],bottomPosition)} ${puzzleEdge(0,h,0,-h,joints[3])} Z`);
  });
  puzzle.classList.add('puzzle-ready');
  updatePuzzle();
}

let puzzleFrame = 0;
function updatePuzzle() {
  puzzleFrame = 0;
  const boardTop = puzzle.getBoundingClientRect().top;
  const viewport = window.innerHeight;
  pieces.forEach(piece => {
    const top = mobilePuzzle.matches ? boardTop + piece.offsetTop : boardTop;
    const progress = reducedMotion.matches ? 1 : Math.max(0, Math.min(1, (viewport * .9 - top) / (viewport * (mobilePuzzle.matches ? .45 : .72))));
    piece.style.setProperty('--apart', (1 - progress).toFixed(4));
  });
}
window.addEventListener('scroll', () => {
  if (!puzzleFrame) puzzleFrame = requestAnimationFrame(updatePuzzle);
}, { passive:true });
new ResizeObserver(drawPuzzle).observe(puzzle);
reducedMotion.addEventListener('change', updatePuzzle);
drawPuzzle();
