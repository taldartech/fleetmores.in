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
  if (e && e.preventDefault) e.preventDefault();
  const form = e ? (e.target || e.srcElement) : document.getElementById('demoBookingForm');

  const getVal = (id, nameAttr) => {
    if (form) {
      const el = form.querySelector(`[name="${nameAttr}"]`) || form.querySelector(`#${id}`);
      if (el) return el.value.trim();
    }
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };

  const name = getVal('demoName', 'name') || getVal('pageDemoName', 'name') || 'Guest';
  const email = getVal('demoEmail', 'email') || getVal('pageDemoEmail', 'email');
  const phone = getVal('demoPhone', 'phone') || getVal('pageDemoPhone', 'phone');
  const company = getVal('demoCompany', 'company') || getVal('pageDemoCompany', 'company') || 'Your Transport Company';
  const city = getVal('demoCity', 'city') || getVal('pageDemoCity', 'city');
  const state = getVal('demoState', 'state') || getVal('pageDemoState', 'state');
  const remark = getVal('demoRemark', 'remark') || getVal('pageDemoRemark', 'remark') || '';

  if (!name || !email || !phone || !company || !city || !state) {
    alert('Please fill in all required fields (Name, Email, Mobile, Company, City, State).');
    return false;
  }

  const submitBtn = form ? form.querySelector('button[type="submit"]') : document.getElementById('demoSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Scheduling your live demo...</span>';
  }

  setTimeout(() => {
    const demoModal = document.getElementById('nfDemoModal');
    if (demoModal && demoModal.classList.contains('active')) {
      const modalBody = demoModal.querySelector('.nf-modal-body');
      if (modalBody) {
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 30px 10px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #F0FDF4; color: #16A34A; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; border: 2px solid #BBF7D0;">✓</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 10px;">Demo Confirmed, ${name}!</h3>
            <p style="color: #4B5563; margin-bottom: 24px;">Our TruckBill specialist will connect with you on <strong>${phone}</strong> and <strong>${email}</strong> for <strong>${company}</strong> (${city}, ${state}).</p>
            <div style="margin-bottom: 20px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="https://wa.me/919784451256?text=Hi%20FleetMores%20Team%2C%20I%20requested%20a%20demo%20for%20${encodeURIComponent(company)}" target="_blank" rel="noopener" class="btn-nf btn-nf-primary" style="padding: 0.6rem 1.4rem;"><span>Chat on WhatsApp</span></a>
              <button class="btn-nf btn-nf-secondary" onclick="location.reload()" style="padding: 0.6rem 1.4rem;"><span>Close</span></button>
            </div>
            <div style="font-size: 0.85rem; color: #6B7280;">Need instant support? Call <a href="tel:+919784451256" style="color: #000; font-weight: 700;">+91 97844 51256</a> / <a href="tel:+919001010007" style="color: #000; font-weight: 700;">+91 9001010007</a></div>
          </div>
        `;
        return;
      }
    }

    if (form) {
      form.innerHTML = `
        <div style="text-align: center; padding: 36px 20px; background: #F9FAFB; border-radius: var(--radius-lg); border: 1px solid var(--nf-light-border);">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: #F0FDF4; color: #16A34A; font-size: 1.8rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">✓</div>
          <h3 style="font-size: 1.4rem; margin-bottom: 8px;">Thank You, ${name}!</h3>
          <p style="color: #4B5563; margin-bottom: 20px;">Your TruckBill walkthrough request has been scheduled for <strong>${company}</strong>. Our specialist will call you on <strong>${phone}</strong>.</p>
          <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
            <a href="https://wa.me/919784451256?text=Hi%20FleetMores%20Team%2C%20I%20requested%20a%20demo%20for%20${encodeURIComponent(company)}" target="_blank" rel="noopener" class="btn-nf btn-nf-primary py-2 px-4" style="font-size: 0.9rem;"><span>WhatsApp Us Now</span></a>
            <a href="tel:+919784451256" class="btn-nf btn-nf-secondary py-2 px-4" style="font-size: 0.9rem;"><span>Call +91 97844 51256</span></a>
          </div>
        </div>
      `;
    }
  }, 800);

  return false;
}
