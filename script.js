// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Terminal typing effect
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const typedEl = document.getElementById('typed');
const lines = [
  'whoami',
  'software engineer · devops · cloud researcher',
  'Analyze data and build things that ship.'
];

if (typedEl) {
  if (prefersReducedMotion) {
    typedEl.textContent = lines[lines.length - 1];
  } else {
    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = lines[lineIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          if (lineIndex === lines.length - 1) return; // stop on last line
          deleting = true;
          setTimeout(tick, 1100);
          return;
        }
        setTimeout(tick, 55);
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          lineIndex++;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, 28);
      }
    }
    setTimeout(tick, 600);
  }
}

// Scroll-reveal for sections
const revealTargets = document.querySelectorAll(
  '.about, .projects, .skills, .timeline, .contact, .project-card, .fact, .skill-block, .t-item'
);

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .6s cubic-bezier(.16,.84,.44,1), transform .6s cubic-bezier(.16,.84,.44,1)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
}
