// FleetMores.in Neuralflow Theme Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Drawer Toggle
  const hamburgerBtn = document.getElementById('nfHamburgerBtn');
  const drawer = document.getElementById('nfMobileDrawer');
  const overlay = document.getElementById('nfDrawerOverlay');
  const closeBtn = document.getElementById('nfDrawerCloseBtn');

  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // FAQ Accordion Toggle
  const accordionHeaders = document.querySelectorAll('.nf-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other accordion items
      document.querySelectorAll('.nf-accordion-item').forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // Demo Modal Logic
  const demoModal = document.getElementById('nfDemoModal');
  const openDemoBtns = document.querySelectorAll('[data-open-demo]');
  const closeDemoBtns = document.querySelectorAll('[data-close-demo]');

  openDemoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      if (demoModal) {
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeDemoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (demoModal) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Interactive ROI Calculator Logic
  const fleetSlider = document.getElementById('roiFleetSize');
  const fleetValDisplay = document.getElementById('roiFleetVal');
  const hoursSavedDisplay = document.getElementById('roiHoursSaved');
  const leakSavingsDisplay = document.getElementById('roiLeakSavings');
  const roiTotalMonthlyDisplay = document.getElementById('roiTotalMonthly');

  if (fleetSlider) {
    function updateROI() {
      const trucks = parseInt(fleetSlider.value, 10);
      if (fleetValDisplay) fleetValDisplay.textContent = trucks + ' Trucks';
      
      // Avg 1.5 hrs saved per truck per week * 4.3 weeks
      const hoursSaved = Math.round(trucks * 6.5);
      // Avg leakage prevented ₹1,800/truck/mo (diesel disputes, unbilled detention, broker margin leak)
      const leakageSaved = trucks * 1800;
      // Combined monthly value (hours * ₹350/hr billing staff value + leakage)
      const totalMonthly = (hoursSaved * 350) + leakageSaved;

      if (hoursSavedDisplay) hoursSavedDisplay.textContent = hoursSaved + ' hrs';
      if (leakSavingsDisplay) leakSavingsDisplay.textContent = '₹' + leakageSaved.toLocaleString('en-IN');
      if (roiTotalMonthlyDisplay) roiTotalMonthlyDisplay.textContent = '₹' + totalMonthly.toLocaleString('en-IN') + '/mo';
    }

    fleetSlider.addEventListener('input', updateROI);
    updateROI();
  }
});

// Demo Form Submission Handler
function handleDemoSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('demoName')?.value || '';
  const phone = document.getElementById('demoPhone')?.value || '';
  const company = document.getElementById('demoCompany')?.value || '';
  const fleetSize = document.getElementById('demoFleetSize')?.value || '';
  const slot = document.getElementById('demoSlot')?.value || '';

  const submitBtn = document.getElementById('demoSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Scheduling your demo...</span>';
  }

  setTimeout(() => {
    alert(`Thank you ${name}! Your live TruckBill demo request has been registered for ${company}. Our transport solutions specialist will call you on ${phone} for slot: ${slot}.`);
    const demoModal = document.getElementById('nfDemoModal');
    if (demoModal) {
      demoModal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Confirm Live Demo Booking</span> <span class="btn-arrow">→</span>';
    }
  }, 900);

  return false;
}
