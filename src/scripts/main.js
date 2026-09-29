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
