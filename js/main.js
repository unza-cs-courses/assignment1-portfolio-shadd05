document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__menu a');
  const sections = document.querySelectorAll('main section[id]');

  if (toggle && menu) {
    // Initialize aria-hidden
    menu.setAttribute('aria-hidden', 'true');

    toggle.addEventListener('click', function () {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('show');
      menu.setAttribute('aria-hidden', String(expanded));
    });

    // Close menu when a link is clicked (mobile)
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('show');
        menu.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active nav link on scroll
  function onScroll() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    sections.forEach(function (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.id;
      const link = document.querySelector('.nav__menu a[href="#' + id + '"]');
      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Simple client-side form validation + status
  const form = document.querySelector('.contact__form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        if (status) {
          status.textContent = 'Please complete required fields and fix errors.';
          status.style.color = 'crimson';
        }
        return;
      }

      // Simulate sending (no backend) and show success
      if (status) {
        status.textContent = 'Message sent — thank you!';
        status.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || '#0b6efd';
      }
      form.reset();
      setTimeout(function () {
        if (status) status.textContent = '';
      }, 4000);
    });

    // Show validation messages when invalid events occur
    form.addEventListener('invalid', function (e) {
      e.preventDefault();
      const el = e.target;
      if (status && el.validationMessage) {
        status.textContent = el.validationMessage;
        status.style.color = 'crimson';
      }
    }, true);
  }
});
