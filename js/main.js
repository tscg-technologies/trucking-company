/**
 * Main Application Orchestrator
 * Trucking & Freight Services — TSCG Technologies Demo
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('[TSCG Technologies] Trucking & Freight Services Demo initialized.');

  // Dynamic Year in footer copyright
  const yearSpans = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach((span) => {
    span.textContent = currentYear;
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
