/**
 * Forms Module
 * Freight quote validation, client-side demo rate estimator, driver application handling,
 * drag-and-drop resume preview (no upload), and FAQ accordions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Freight Quote Form (contact.html)
  const quoteForm = document.getElementById('freightQuoteForm');
  const quoteResultModal = document.getElementById('quoteResultModal');
  const closeQuoteModalBtn = document.getElementById('closeQuoteModalBtn');

  // Interactive Live Estimate Preview (client-side demo)
  const weightInput = document.getElementById('cargoWeight');
  const truckSelect = document.getElementById('requiredTruck');
  const estimateDisplay = document.getElementById('liveEstimateDisplay');

  const updateDemoEstimate = () => {
    if (!estimateDisplay || !weightInput || !truckSelect) return;
    const weightVal = parseFloat(weightInput.value) || 0;
    const truckVal = truckSelect.value;

    if (weightVal > 0 && truckVal) {
      let baseRate = 850;
      if (truckVal.includes('flatbed')) baseRate = 1200;
      else if (truckVal.includes('refrigerated')) baseRate = 1450;
      else if (truckVal.includes('heavy-haul')) baseRate = 2200;

      const calcTotal = Math.round(baseRate + weightVal * 45);
      estimateDisplay.innerHTML = `<span class="mono" style="color: var(--signal-orange); font-size: 1.1rem; font-weight:700;">₹${calcTotal.toLocaleString()}</span> <span style="font-size:0.75rem; color: var(--text-muted);">(Illustrative Demo Rate Index)</span>`;
    } else {
      estimateDisplay.innerHTML = `<span style="font-size:0.8rem; color: var(--text-dim);">Enter cargo weight and equipment type to preview illustrative rate</span>`;
    }
  };

  if (weightInput && truckSelect) {
    weightInput.addEventListener('input', updateDemoEstimate);
    truckSelect.addEventListener('change', updateDemoEstimate);
  }

  // Quote Form Submission & Validation
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate inputs
      const requiredInputs = quoteForm.querySelectorAll('[required]');
      requiredInputs.forEach((input) => {
        const group = input.closest('.form-group');
        const val = input.value.trim();

        if (!val) {
          isValid = false;
          if (group) group.classList.add('has-error');
          input.classList.add('is-invalid');
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          isValid = false;
          if (group) group.classList.add('has-error');
          input.classList.add('is-invalid');
        } else if (input.type === 'tel' && !/^[\d\+\-\s]{7,15}$/.test(val)) {
          isValid = false;
          if (group) group.classList.add('has-error');
          input.classList.add('is-invalid');
        } else {
          if (group) group.classList.remove('has-error');
          input.classList.remove('is-invalid');
        }

        // Clear error on input
        input.addEventListener('input', () => {
          if (group) group.classList.remove('has-error');
          input.classList.remove('is-invalid');
        }, { once: true });
      });

      if (isValid) {
        // Show demo success dialog
        if (quoteResultModal) {
          quoteResultModal.classList.add('open');
          quoteResultModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
        quoteForm.reset();
        if (estimateDisplay) {
          estimateDisplay.innerHTML = `<span style="font-size:0.8rem; color: var(--text-dim);">Enter cargo weight and equipment type to preview illustrative rate</span>`;
        }
      }
    });
  }

  if (closeQuoteModalBtn && quoteResultModal) {
    closeQuoteModalBtn.addEventListener('click', () => {
      quoteResultModal.classList.remove('open');
      quoteResultModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  // 2. Driver Careers Application Form (careers.html)
  const careerForm = document.getElementById('driverApplicationForm');
  const careerModal = document.getElementById('careerResultModal');
  const closeCareerModalBtn = document.getElementById('closeCareerModalBtn');

  // File Dropzone logic (No upload, client demo only)
  const dropzone = document.getElementById('resumeDropzone');
  const fileInput = document.getElementById('resumeInput');
  const fileSelectedBox = document.getElementById('fileSelectedBox');
  const fileNameDisplay = document.getElementById('selectedFileName');
  const removeFileBtn = document.getElementById('removeFileBtn');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFileSelect(fileInput.files[0]);
      }
    });
  }

  const handleFileSelect = (file) => {
    const validExts = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const hasValidExt = validExts.some((ext) => fileName.endsWith(ext));

    if (!hasValidExt) {
      alert('Please select a valid PDF, DOC, or DOCX document.');
      if (fileInput) fileInput.value = '';
      return;
    }

    if (fileSelectedBox && fileNameDisplay) {
      fileNameDisplay.textContent = `${file.name} (${Math.round(file.size / 1024)} KB) [DEMO ATTACHMENT - NO UPLOAD]`;
      fileSelectedBox.style.display = 'flex';
      if (dropzone) dropzone.style.display = 'none';
    }
  };

  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (fileInput) fileInput.value = '';
      if (fileSelectedBox) fileSelectedBox.style.display = 'none';
      if (dropzone) dropzone.style.display = 'block';
    });
  }

  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const requiredInputs = careerForm.querySelectorAll('[required]');
      requiredInputs.forEach((input) => {
        const group = input.closest('.form-group');
        const val = input.value.trim();

        if (!val) {
          isValid = false;
          if (group) group.classList.add('has-error');
          input.classList.add('is-invalid');
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          isValid = false;
          if (group) group.classList.add('has-error');
          input.classList.add('is-invalid');
        } else if (input.type === 'tel' && !/^[\d\+\-\s]{7,15}$/.test(val)) {
          isValid = false;
          if (group) group.classList.add('has-error');
          input.classList.add('is-invalid');
        } else {
          if (group) group.classList.remove('has-error');
          input.classList.remove('is-invalid');
        }

        input.addEventListener('input', () => {
          if (group) group.classList.remove('has-error');
          input.classList.remove('is-invalid');
        }, { once: true });
      });

      if (isValid) {
        if (careerModal) {
          careerModal.classList.add('open');
          careerModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
        careerForm.reset();
        if (fileSelectedBox) fileSelectedBox.style.display = 'none';
        if (dropzone) dropzone.style.display = 'block';
      }
    });
  }

  if (closeCareerModalBtn && careerModal) {
    closeCareerModalBtn.addEventListener('click', () => {
      careerModal.classList.remove('open');
      careerModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  // 3. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close siblings if desired
        faqItems.forEach((sibling) => sibling.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
});
