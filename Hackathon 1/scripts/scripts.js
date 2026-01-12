const toggleBtn = document.getElementById('themeToggle');
const body = document.body;
const navLinks = document.querySelectorAll('nav .nav-link');

const pages = {
  home: document.querySelector('.container'),
  features: document.querySelector('.container3'),
  premium: document.querySelector('.container2'),
  support: document.querySelector('.container4')
};

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
  toggleBtn.textContent = '☀️';
} else {
  toggleBtn.textContent = '🌙';
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    toggleBtn.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  } else {
    toggleBtn.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
});

function switchPage(targetKey) {
  const incoming = pages[targetKey];
  const outgoing = document.querySelector('.active-page');

  if (!incoming || incoming === outgoing) return;

  outgoing.classList.add('slide-out-left');

  outgoing.addEventListener('animationend', function onOut() {
    outgoing.classList.remove('slide-out-left', 'active-page');
    outgoing.removeEventListener('animationend', onOut);

    incoming.classList.add('active-page', 'slide-in-right');

    incoming.addEventListener('animationend', function onIn() {
      incoming.classList.remove('slide-in-right');
      incoming.removeEventListener('animationend', onIn);
    });
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const pageKey = link.dataset.page;

    if (pageKey === 'home') {
      location.reload();
      return;
    }

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    switchPage(pageKey);
  });
});

pages.home.classList.add('active-page');
