/**
 * Fleet Module
 * Equipment category filtering and interactive vehicle specifications modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Category Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card');

  if (filterBtns.length > 0 && fleetCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Active class update
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        fleetCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // Equipment Detail Modal
  const modalOverlay = document.getElementById('vehicleModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const triggerBtns = document.querySelectorAll('.view-specs-btn');

  const modalTitle = document.getElementById('modalVehicleTitle');
  const modalCategory = document.getElementById('modalVehicleCategory');
  const modalImg = document.getElementById('modalVehicleImg');
  const modalPayload = document.getElementById('modalVehiclePayload');
  const modalDimensions = document.getElementById('modalVehicleDimensions');
  const modalAxles = document.getElementById('modalVehicleAxles');
  const modalCargo = document.getElementById('modalVehicleCargo');
  const modalDesc = document.getElementById('modalVehicleDesc');

  const openModal = (card) => {
    if (!modalOverlay) return;

    // Read data attributes from card
    const title = card.getAttribute('data-title') || 'Heavy-Duty Freight Equipment';
    const category = card.getAttribute('data-category-label') || 'Commercial Freight Category';
    const imgSrc = card.getAttribute('data-img') || 'images/hero-heavy-duty-truck.jpg';
    const payload = card.getAttribute('data-payload') || 'Illustrative 25,000–35,000 kg Payload';
    const dimensions = card.getAttribute('data-dimensions') || '13.6m L x 2.45m W x 2.7m H';
    const axles = card.getAttribute('data-axles') || '3-Axle Semi-Trailer / 6x4 Tractor';
    const cargo = card.getAttribute('data-cargo') || 'Palletized general freight, industrial components';
    const desc = card.getAttribute('data-desc') || 'Designed for high-capacity long-distance highway transport with heavy-duty load distribution.';

    if (modalTitle) modalTitle.textContent = title;
    if (modalCategory) modalCategory.textContent = category;
    if (modalImg) modalImg.setAttribute('src', imgSrc);
    if (modalPayload) modalPayload.textContent = payload;
    if (modalDimensions) modalDimensions.textContent = dimensions;
    if (modalAxles) modalAxles.textContent = axles;
    if (modalCargo) modalCargo.textContent = cargo;
    if (modalDesc) modalDesc.textContent = desc;

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.fleet-card');
      if (card) openModal(card);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
});
