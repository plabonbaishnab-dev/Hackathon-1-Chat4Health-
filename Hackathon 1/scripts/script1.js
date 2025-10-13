const toggleBtn = document.getElementById('themeToggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');

// All your "pages"
const pages = {
  home: document.querySelector('.container'),
  features: document.querySelector('.container1'),
  premium: document.querySelector('.container2'),
  support: document.querySelector('.container3')
};

// Apply stored theme preference
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
  toggleBtn.textContent = '☀️';
} else {
  toggleBtn.textContent = '🌙';
}

// Theme toggle button
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

// Function to switch pages with animation
function switchPage(targetKey) {
  const incoming = pages[targetKey];
  const outgoing = document.querySelector('.active-page');

  if (!incoming || incoming === outgoing) return;

  // Animate outgoing slide left
  outgoing.classList.add('slide-out-left');

  outgoing.addEventListener('animationend', function onOut() {
    outgoing.classList.remove('slide-out-left', 'active-page');
    outgoing.removeEventListener('animationend', onOut);

    // Show and animate incoming page
    incoming.classList.add('active-page', 'slide-in-right');

    incoming.addEventListener('animationend', function onIn() {
      incoming.classList.remove('slide-in-right');
      incoming.removeEventListener('animationend', onIn);
    });
  });
}

// Setup nav links click handlers
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const pageKey = link.dataset.page;

    if (pageKey === 'home') {
      // Reload the page when Home is clicked
      location.reload();
      return;
    }

    // Remove active class from all and add to clicked
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Switch to target page with animation
    switchPage(pageKey);
  });
});

// Set default page active on load
pages.home.classList.add('active-page');
