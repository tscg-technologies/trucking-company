/**
 * Animations Module
 * Scroll reveals, animated route network visualization, and highway milestones.
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll-triggered element reveals
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal-item');
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // If reduced motion or no observer, display immediately
    document.querySelectorAll('.reveal-item').forEach((el) => el.classList.add('revealed'));
  }

  // 2. Interactive Route Network Simulation (Homepage Section 8)
  const truckMarker = document.getElementById('routeTruckMarker');
  const routePath = document.getElementById('routePrimaryPath');
  const routeDistBox = document.getElementById('routeTelemetryDist');
  const routeStatusBox = document.getElementById('routeTelemetryStatus');

  if (truckMarker && routePath && !prefersReduced) {
    let progress = 0;
    const pathLength = routePath.getTotalLength ? routePath.getTotalLength() : 800;

    const animateRouteTruck = () => {
      progress = (progress + 0.0018) % 1;
      const point = routePath.getPointAtLength(progress * pathLength);
      
      // Calculate angle
      const nextPoint = routePath.getPointAtLength(Math.min((progress + 0.01) * pathLength, pathLength));
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

      truckMarker.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`);

      // Update telemetry box
      if (routeDistBox) {
        const simKm = Math.round(progress * 1420);
        routeDistBox.textContent = `${simKm} / 1,420 KM`;
      }
      if (routeStatusBox) {
        if (progress < 0.25) routeStatusBox.textContent = 'TRANSIT STAGE 01 // DEPARTURE';
        else if (progress < 0.75) routeStatusBox.textContent = 'TRANSIT STAGE 02 // CORRIDOR EN ROUTE';
        else routeStatusBox.textContent = 'TRANSIT STAGE 03 // APPROACHING DESTINATION';
      }

      requestAnimationFrame(animateRouteTruck);
    };

    requestAnimationFrame(animateRouteTruck);
  }

  // 3. Horizontal Process Milestone highlighting on scroll
  const processSteps = document.querySelectorAll('.process-step-item');
  if (processSteps.length > 0 && !prefersReduced && 'IntersectionObserver' in window) {
    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.borderColor = 'var(--signal-orange)';
            entry.target.style.boxShadow = '0 8px 24px var(--signal-orange-glow)';
          }
        });
      },
      { threshold: 0.5 }
    );

    processSteps.forEach((step) => processObserver.observe(step));
  }
});
