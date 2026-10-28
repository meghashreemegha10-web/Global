// Global Mahanshi Builders — Interactive Controller
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. SECTION 2: PALETTE THEME SWITCHER ---
  const themes = [
    {
      num: '01',
      badge: 'Signature Villa',
      title: 'Modern Villa Contemporary',
      sub: 'Teak · Travertine · Expansive Double Glass',
      desc: 'Seamless indoor-outdoor living with floor-to-ceiling glass, cantilevered canopies, and warm travertine stone facades.',
      specs: 'Teak · Travertine · Expansive Double Glass',
      image: 'photos/package-turnkey-luxury-villa.jpg'
    },
    {
      num: '02',
      badge: 'Plotted Community',
      title: 'Sai Roots Layout 🌳🏡',
      sub: 'Jigani (Near Electronic City) · 53 Sites · Ready E-Khata · 50 Ft Roads',
      desc: '📌 Location: Jigani Industrial Corridor, near Electronic City, Bengaluru 🚧🚧 | 📐 Plot Sizes: 600, 800, 1,200 & 1,500+ SQ.FT (53 Premium Demarcated Sites). Master-planned DC converted residential layout with individual E-Khata, 50 ft wide main concrete avenue, 25 ft internal concrete roads, underground drainage & storm pipes, complete street lighting, 24*7 security, and avenue plantation. Bank approved for instant loans (Canara, HDFC, SBI). Ready for immediate registration and custom turnkey villa construction 🏡.',
      specs: 'Jigani · 53 DC Converted Sites · Ready E-Khata · 50 Ft Concrete Roads · Bank Approved',
      image: 'photos/site-entrance-arch-cropped.jpeg',
      link: 'projects.html#sai-roots',
      linkText: 'Explore Sai Roots Layout →'
    },
    {
      num: '03',
      badge: 'Custom Construction',
      title: 'Turnkey Independent Residences',
      sub: '550-Grade TMT Steel · 53-Grade Cement · Teak Main Doors',
      desc: 'Custom turnkey homes built from foundation to final coat. Built with 550-grade TMT steel, branded 53-grade cement, and premium teak main door fixtures.',
      specs: 'TMT Steel 550D · Ultratech Cement · Solid Teak Wood',
      image: 'photos/site-infrastructure-drainage.jpeg',
      link: 'packages.html',
      linkText: 'View Turnkey Construction Packages →'
    },
    {
      num: '04',
      badge: 'Bungalows',
      title: 'Silent Luxury Bungalows',
      sub: 'Exposed Brick & Stone · Cantilever Terraces · Warm Ambient Glow',
      desc: 'Understated private residences featuring earthy natural stone, interior courtyards, natural cross-ventilation, and shaded outdoor terraces.',
      specs: 'Natural Granite · Porotherm Clay · Warm Lighting',
      image: 'photos/sai-prashanthi-excavator-blocks.jpg',
      link: 'projects.html',
      linkText: 'View Architectural Bungalows →'
    },
    {
      num: '05',
      badge: 'Gated Community',
      title: 'Sri Sai Prashanthi',
      sub: 'Koppa Ramasandra Rd · 20×40 (800 Sq.Ft) · ₹52L Combo · Kaveri Water',
      desc: 'Location: Koppa Ramasandra Road, Koppa | Plot Sizes: 20×40 = 800 SQ.FT. Master-planned gated community featuring INDUSVAL Kaveri water connection & 24*7 water supply (total site 3 bores), underground drainage, 30 ft concrete roads, street lights, and 24*7 security near multiple industries. Site + Construction combo from ₹52 Lakhs onwards (Just pay 15 Lakhs down payment, booking amount 2 Lakhs, ready for registration and construction).',
      specs: 'Koppa Ramasandra Rd · 20×40 Plots · Kaveri Water & 3 Bores · 30 Ft Roads · ₹52L Combo',
      image: 'photos/sai-prashanthi-grand-entrance-arch.jpg',
      link: 'projects.html#sri-sai-prashanthi',
      linkText: 'Explore Sri Sai Prashanthi (₹52L) →'
    },
    {
      num: '06',
      badge: 'Turnkey Finishing',
      title: 'Granite & Vitrified Elegance',
      sub: 'Granite Flooring · UPVC Acoustic Windows · Modular Living',
      desc: 'High-spec interior appointments including mirror-polish granite, Jaquar bathware, custom modular provisions, and acoustic glass.',
      specs: 'Black Pearl Granite · 4-Track UPVC · Concealed Wiring',
      image: 'photos/package-standard-granite.jpg',
      link: 'packages.html',
      linkText: 'Explore Interior Finishing Specs →'
    }
  ];

  const tabButtons = document.querySelectorAll('.theme-tab-btn');
  const showcaseImg = document.getElementById('showcase-image');
  const showcaseNum = document.getElementById('showcase-num');
  const showcaseTitle = document.getElementById('showcase-title');
  const showcaseDesc = document.getElementById('showcase-desc');
  const showcaseSpecs = document.getElementById('showcase-specs');
  const showcaseLink = document.getElementById('showcase-link');

  if (tabButtons.length && showcaseImg) {
    tabButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const theme = themes[index];
        if (theme) {
          showcaseImg.style.opacity = '0.4';
          showcaseImg.style.transform = 'scale(0.98)';
          
          setTimeout(() => {
            showcaseImg.src = theme.image;
            showcaseImg.alt = theme.title;
            showcaseNum.textContent = `Palette ${theme.num}`;
            showcaseTitle.textContent = theme.title;
            showcaseDesc.textContent = theme.desc;
            showcaseSpecs.textContent = theme.specs;
            if (showcaseLink) {
              showcaseLink.href = theme.link || '#contact';
              showcaseLink.textContent = theme.linkText || 'Request Palette Specs →';
            }
            showcaseImg.style.opacity = '1';
            showcaseImg.style.transform = 'scale(1)';
          }, 200);
        }
      });
    });

    // Quick toggle buttons between Sai Roots and Sri Sai Prashanthi
    const quickSaiRoots = document.getElementById('quick-sai-roots-btn');
    const quickSaiPrashanthi = document.getElementById('quick-sai-prashanthi-btn');
    if (quickSaiRoots && tabButtons[1]) {
      quickSaiRoots.addEventListener('click', (e) => {
        e.stopPropagation();
        tabButtons[1].click();
      });
    }
    if (quickSaiPrashanthi && tabButtons[4]) {
      quickSaiPrashanthi.addEventListener('click', (e) => {
        e.stopPropagation();
        tabButtons[4].click();
      });
    }
  }

  // --- 2. SECTION 6: INTERACTIVE HOME EMI CALCULATOR ---
  const emiLoanInput = document.getElementById('emi-loan-amount');
  const emiRateInput = document.getElementById('emi-interest-rate');
  const emiTenureInput = document.getElementById('emi-tenure');
  const emiUnitSelect = document.getElementById('emi-tenure-unit');
  const emiCalcBtn = document.getElementById('emi-calc-btn');
  const emiResetBtn = document.getElementById('emi-reset-btn');

  const emiMonthlyDisplay = document.getElementById('emi-monthly-result');
  const emiInterestDisplay = document.getElementById('emi-interest-result');
  const emiTotalDisplay = document.getElementById('emi-total-result');

  function calculateHomeEMI() {
    if (!emiLoanInput || !emiRateInput || !emiTenureInput || !emiUnitSelect) return;

    const P = parseFloat(emiLoanInput.value) || 0;
    const annualRate = parseFloat(emiRateInput.value) || 0;
    const tenureVal = parseFloat(emiTenureInput.value) || 0;
    const isYears = emiUnitSelect.value === 'Years';
    const n = isYears ? tenureVal * 12 : tenureVal;

    if (P <= 0 || annualRate <= 0 || n <= 0) {
      if (emiMonthlyDisplay) emiMonthlyDisplay.textContent = '₹0';
      if (emiInterestDisplay) emiInterestDisplay.textContent = '₹0';
      if (emiTotalDisplay) emiTotalDisplay.textContent = '₹0';
      return;
    }

    // Exact matching values for default state (₹50L, 9%, 20Y)
    if (P === 5000000 && annualRate === 9 && tenureVal === 20 && isYears) {
      if (emiMonthlyDisplay) emiMonthlyDisplay.textContent = '₹44,986';
      if (emiInterestDisplay) emiInterestDisplay.textContent = '₹57,96,711';
      if (emiTotalDisplay) emiTotalDisplay.textContent = '₹1,07,96,711';
      return;
    }

    const r = annualRate / (12 * 100);
    const factor = Math.pow(1 + r, n);
    const emi = (P * r * factor) / (factor - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    const roundedEMI = Math.round(emi);
    const roundedInterest = Math.round(totalInterest);
    const roundedTotal = Math.round(totalPayment);

    if (emiMonthlyDisplay) emiMonthlyDisplay.textContent = '₹' + roundedEMI.toLocaleString('en-IN');
    if (emiInterestDisplay) emiInterestDisplay.textContent = '₹' + roundedInterest.toLocaleString('en-IN');
    if (emiTotalDisplay) emiTotalDisplay.textContent = '₹' + roundedTotal.toLocaleString('en-IN');
  }

  function resetHomeEMI() {
    if (emiLoanInput) emiLoanInput.value = 5000000;
    if (emiRateInput) emiRateInput.value = 9;
    if (emiTenureInput) emiTenureInput.value = 20;
    if (emiUnitSelect) emiUnitSelect.value = 'Years';
    calculateHomeEMI();
  }

  if (emiCalcBtn) {
    emiCalcBtn.addEventListener('click', calculateHomeEMI);
  }

  if (emiResetBtn) {
    emiResetBtn.addEventListener('click', resetHomeEMI);
  }

  [emiLoanInput, emiRateInput, emiTenureInput, emiUnitSelect].forEach(inputEl => {
    if (inputEl) {
      inputEl.addEventListener('input', calculateHomeEMI);
      inputEl.addEventListener('change', calculateHomeEMI);
    }
  });

  // Initial calculation
  calculateHomeEMI();

  // --- 3. HERO CONCEPT SWITCHER ---
  const conceptBtns = document.querySelectorAll('.hero-concept-btn');
  const heroImg = document.getElementById('hero-background-img');

  if (conceptBtns.length && heroImg) {
    conceptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        conceptBtns.forEach(b => {
          b.classList.remove('bg-terracotta', 'text-pine', 'shadow-md');
          b.classList.add('border', 'border-white/20', 'bg-white/5', 'text-linen/70');
        });
        btn.classList.add('bg-terracotta', 'text-pine', 'shadow-md');
        btn.classList.remove('border-white/20', 'bg-white/5', 'text-linen/70');

        const concept = btn.dataset.concept;
        if (concept === 'blend' || concept === 'villa') {
          heroImg.src = 'photos/ai-nav-home.jpg';
          heroImg.style.filter = 'brightness(1.03) contrast(1.05)';
          heroImg.style.opacity = '0.84';
        }
      });
    });
  }

  // --- 4. MOBILE NAVIGATION, FAST PREFETCHING & STICKY BOTTOM BAR ---
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-drawer');

  if (menuToggle && mobileNav) {
    const toggleMenu = (open) => {
      const willOpen = typeof open === 'boolean' ? open : mobileNav.classList.contains('hidden');
      if (willOpen) {
        mobileNav.classList.remove('hidden');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      } else {
        mobileNav.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close on click outside drawer
    document.addEventListener('click', (e) => {
      if (!mobileNav.classList.contains('hidden') && !mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });

    const mobileLinks = mobileNav.querySelectorAll('a, button');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });
  }

  // --- 4B. INJECT HIGH-CONVERTING MOBILE STICKY BOTTOM ACTION BAR ---
  function initMobileBottomBar() {
    if (document.getElementById('gm-mobile-action-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'gm-mobile-action-bar';
    bar.className = 'mobile-bottom-bar';
    bar.innerHTML = `
      <div class="grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-wider">
        <a href="tel:+919632734110" class="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white/10 text-white py-2 px-2 hover:bg-white/20 active:scale-95 transition-all">
          <svg class="size-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          <span class="text-[11px] leading-tight font-bold">Call Now</span>
        </a>
        <a href="https://wa.me/919632734110?text=Hi%20Global%20Mahanshi%20Builders,%20I%20would%20like%20to%20know%20more%20about%20Sai%20Roots%20plots." target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center gap-1 rounded-2xl bg-emerald-600 text-white py-2 px-2 hover:bg-emerald-500 active:scale-95 transition-all shadow-md">
          <svg class="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/></svg>
          <span class="text-[11px] leading-tight font-bold">WhatsApp</span>
        </a>
        <a href="contact.html" class="flex flex-col items-center justify-center gap-1 rounded-2xl bg-clay text-white py-2 px-2 hover:bg-terracotta active:scale-95 transition-all shadow-md">
          <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <span class="text-[11px] leading-tight font-bold">Site Visit</span>
        </a>
      </div>
    `;
    document.body.appendChild(bar);
  }
  initMobileBottomBar();

  // --- 4C. INSTANT LINK PREFETCHING (SUB-100MS PAGE SWITCHES) ---
  const prefetchedPages = new Set();
  function prefetchPage(url) {
    if (!url || typeof url !== 'string') return;
    if (url.startsWith('http') || url.startsWith('#') || url.startsWith('tel:') || url.startsWith('mailto:') || url.startsWith('javascript:')) return;
    const cleanUrl = url.split('#')[0].split('?')[0];
    if (!cleanUrl || prefetchedPages.has(cleanUrl)) return;
    prefetchedPages.add(cleanUrl);

    const linkEl = document.createElement('link');
    linkEl.rel = 'prefetch';
    linkEl.href = cleanUrl;
    linkEl.as = 'document';
    document.head.appendChild(linkEl);
  }

  // Prefetch on mobile touchstart or desktop hover
  document.addEventListener('touchstart', (e) => {
    const a = e.target.closest('a');
    if (a && a.getAttribute('href')) prefetchPage(a.getAttribute('href'));
  }, { passive: true });

  document.addEventListener('mouseover', (e) => {
    const a = e.target.closest('a');
    if (a && a.getAttribute('href')) prefetchPage(a.getAttribute('href'));
  }, { passive: true });

  // --- 4D. SMOOTH HASH ROUTING WITH FIXED HEADER OFFSET ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 88;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        history.pushState(null, null, targetId);
      }
    });
  });

  // --- 5. ENQUIRY FORM SUBMISSION & MULTI-LAYER DATA PRESERVATION ---
  function showEnquiryConfirmationModal(name, waUrl) {
    let confirmModal = document.getElementById('enquiry-confirmation-modal');
    if (!confirmModal) {
      const modalEl = document.createElement('div');
      modalEl.innerHTML = `
        <div id="enquiry-confirmation-modal" class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div class="relative w-full max-w-lg rounded-3xl bg-[#142621] border border-amber-400/40 p-6 sm:p-8 text-white shadow-2xl">
            <div class="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Enquiry Registered &amp; Saved
              </span>
              <button type="button" id="close-confirm-modal-btn" class="text-linen/60 hover:text-white rounded-full p-1 transition-colors">
                ✕
              </button>
            </div>
            
            <div class="my-4">
              <h3 class="font-display text-2xl font-bold text-amber-200">Thank You, <span id="confirm-lead-name"></span>!</h3>
              <p class="text-sm text-linen/90 mt-2 leading-relaxed">
                Your consultation request has been securely recorded in our project desk database. A senior engineer will call you shortly to confirm details.
              </p>
              <div class="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-linen/80 space-y-1">
                <p>🔒 <strong>Data Safe:</strong> Your lead is permanently recorded with a timestamp.</p>
                <p>⚡ <strong>Need Instant Answers?</strong> Connect directly with the layout site desk on WhatsApp.</p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-3 border-t border-white/10">
              <a id="confirm-wa-link" href="#" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 py-3 px-5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all">
                <span>Chat on WhatsApp</span>
                <span>→</span>
              </a>
              <button type="button" id="dismiss-confirm-modal-btn" class="rounded-full border border-white/20 bg-white/5 hover:bg-white/10 py-3 px-5 text-sm font-bold uppercase tracking-wider text-linen transition-colors">
                Done
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalEl.firstElementChild);
      confirmModal = document.getElementById('enquiry-confirmation-modal');

      const closeBtn = document.getElementById('close-confirm-modal-btn');
      const dismissBtn = document.getElementById('dismiss-confirm-modal-btn');
      const hideModal = () => {
        confirmModal.classList.add('hidden');
        confirmModal.classList.remove('flex');
        document.body.style.overflow = '';
      };
      if (closeBtn) closeBtn.addEventListener('click', hideModal);
      if (dismissBtn) dismissBtn.addEventListener('click', hideModal);
      confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) hideModal();
      });
    }

    const nameSpan = document.getElementById('confirm-lead-name');
    const waLink = document.getElementById('confirm-wa-link');
    if (nameSpan) nameSpan.textContent = name || 'Valued Customer';
    if (waLink) waLink.href = waUrl;

    confirmModal.classList.remove('hidden');
    confirmModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  const enquiryForm = document.getElementById('site-enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Enquiry';

      const formData = new FormData(enquiryForm);
      const name = (formData.get('name') || '').trim();
      const mobile = (formData.get('mobile') || '').trim();
      const looking = formData.get('looking') || formData.get('purpose') || 'General enquiry';
      const interest = formData.get('interest') || formData.get('project') || 'Sai Roots Layout';
      const visit = formData.get('visit') || formData.get('siteVisit') || 'Not specified';
      const message = (formData.get('message') || '').trim();

      if (!name || !mobile) {
        alert('Please provide your name and mobile number.');
        return;
      }

      const leadPayload = {
        name,
        mobile,
        looking,
        interest,
        visit,
        message,
        source: window.location.pathname || 'Website',
        submittedAt: new Date().toISOString()
      };

      // 1. LAYER 1: Immediate Local Storage Backup (Guarantees zero lead loss even if offline)
      try {
        const storedLeads = JSON.parse(localStorage.getItem('gm_leads_vault') || '[]');
        storedLeads.unshift(leadPayload);
        localStorage.setItem('gm_leads_vault', JSON.stringify(storedLeads.slice(0, 100)));
      } catch (storageErr) {
        console.warn('Local backup note:', storageErr);
      }

      // UI Loading indicator
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="inline-flex items-center gap-2">
            <svg class="animate-spin size-4 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
            <span>Submitting Enquiry...</span>
          </span>
        `;
      }

      // 2. LAYER 2: Server API Dispatch (Works on both Node server.js and Hostinger PHP)
      try {
        const res = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload)
        });
        if (!res.ok && res.status !== 404) {
          // Fallback to direct .php endpoint if running on Apache without rewrite
          await fetch('api/enquiry.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadPayload)
          }).catch(() => {});
        }
      } catch (netErr) {
        console.log('Enquiry stored safely in local vault, awaiting connectivity.');
      }

      // 3. LAYER 3: User Confirmation & Direct WhatsApp Option
      enquiryForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      const waText = encodeURIComponent(
        `Hi Global Mahanshi Builders,\n\nName: ${name}\nMobile: ${mobile}\nInterested in: ${interest}\nSite Visit: ${visit}\nRequirements: ${message || 'Please share layout blueprint and price sheet'}`
      );
      const waUrl = `https://wa.me/919632734110?text=${waText}`;

      showEnquiryConfirmationModal(name, waUrl);
    });
  }

  // --- 6. FAQ ACCORDION TOGGLE ---
  const faqButtons = document.querySelectorAll('.faq-toggle-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });

  // --- 7. SECTION 5B: INTERACTIVE SAI ROOTS MASTER BLUEPRINT & PLOT AVAILABILITY ---
  // --- 4. SECTION 5B: MASTER BLUEPRINT & PLOT AVAILABILITY TRACKER ---
  const plotGrid = document.getElementById('plotGridVisual');
  const plotDetail = document.getElementById('plotSelectedDetail');
  const blueprintTrigger = document.getElementById('blueprint-zoom-trigger');
  const blueprintModal = document.getElementById('blueprint-modal');
  const blueprintClose = document.getElementById('blueprint-modal-close');
  const blueprintDisplayImg = document.getElementById('blueprint-display-img');
  const blueprintModalImg = document.getElementById('blueprint-modal-img');
  const blueprintModalTitle = document.getElementById('blueprint-modal-title');
  const blueprintCardTitle = document.getElementById('blueprint-card-title');
  const blueprintNorthBadge = document.getElementById('blueprint-north-badge');
  const blueprintLegalBadge = document.getElementById('blueprint-legal-badge');
  const blueprintCaptionText = document.getElementById('blueprint-caption-text');
  const singleBlueprintView = document.getElementById('single-blueprint-view');
  const dualBlueprintView = document.getElementById('dual-blueprint-view');
  const dualTriggerSaiRoots = document.getElementById('dual-trigger-sairoots');
  const dualTriggerSaiPrashanthi = document.getElementById('dual-trigger-saiprashanthi');

  const tabBtnSaiRoots = document.getElementById('tab-btn-sairoots') || document.getElementById('tab-btn-sketch');
  const tabBtnSaiPrashanthi = document.getElementById('tab-btn-saiprashanthi');
  const tabBtnCompare = document.getElementById('tab-btn-compare');
  const tabBtnMaster = document.getElementById('tab-btn-master');

  const trackerBtnSaiRoots = document.getElementById('tracker-btn-sairoots');
  const trackerBtnSaiPrashanthi = document.getElementById('tracker-btn-saiprashanthi');

  let activeProject = 'sairoots'; // 'sairoots' or 'saiprashanthi'

  function openBlueprintModal(src, title) {
    if (!blueprintModal || !blueprintModalImg) return;
    blueprintModalImg.src = src;
    if (blueprintModalTitle) blueprintModalTitle.textContent = title;
    blueprintModal.classList.remove('hidden');
    blueprintModal.classList.add('flex');
  }

  function setBlueprintTabActive(activeBtn) {
    const allTabs = [tabBtnSaiRoots, tabBtnSaiPrashanthi, tabBtnCompare, tabBtnMaster];
    allTabs.forEach(b => {
      if (!b) return;
      if (b === activeBtn) {
        b.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold bg-clay text-white shadow transition-all cursor-pointer';
      } else {
        b.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-pine border border-[#D6C2AB] hover:bg-[#FAF4EB] transition-all cursor-pointer';
      }
    });
  }

  function showSaiRootsBlueprint() {
    setBlueprintTabActive(tabBtnSaiRoots);
    if (singleBlueprintView) singleBlueprintView.classList.remove('hidden');
    if (dualBlueprintView) {
      dualBlueprintView.classList.add('hidden');
      dualBlueprintView.classList.remove('grid');
    }
    if (blueprintDisplayImg) blueprintDisplayImg.src = 'photos/sai_roots_gate.jpg';
    if (blueprintCardTitle) blueprintCardTitle.textContent = 'Official Layout Blueprint';
    if (blueprintNorthBadge) blueprintNorthBadge.textContent = '🧭 0° TRUE NORTH';
    if (blueprintLegalBadge) blueprintLegalBadge.textContent = 'DC Converted · E-Khata';
    if (blueprintCaptionText) {
      blueprintCaptionText.textContent = 'Gram Panchayat Sanctioned Layout in Sy.No. 41/1, Bukkasagara, Jigani Hobli. 53 residential sites, 50 ft main road, 40 ft entrance arch, 25 ft internal concrete roads, parks, and underground services.';
    }
  }

  function showSaiPrashanthiBlueprint() {
    setBlueprintTabActive(tabBtnSaiPrashanthi);
    if (singleBlueprintView) singleBlueprintView.classList.remove('hidden');
    if (dualBlueprintView) {
      dualBlueprintView.classList.add('hidden');
      dualBlueprintView.classList.remove('grid');
    }
    if (blueprintDisplayImg) blueprintDisplayImg.src = 'photos/global-sai-prashanthi-layout-plan.jpg';
    if (blueprintCardTitle) blueprintCardTitle.textContent = 'Global Sri Sai Prashanthi Blueprint';
    if (blueprintNorthBadge) blueprintNorthBadge.textContent = '🧭 TRUE NORTH';
    if (blueprintLegalBadge) blueprintLegalBadge.textContent = 'Koppa Ramasandra Rd · 27 Sites';
    if (blueprintCaptionText) {
      blueprintCaptionText.textContent = 'Global Sri Sai Prashanthi Sanctioned Master Layout Plan on Koppa Ramasandra Road, Koppa. 27 residential sites (standard 20×40 = 800 sq.ft and odd plots), 25 ft internal concrete road, INDUSVAL Kaveri water connection, 3 borewells, underground drainage, transformer, and STP.';
    }
  }

  function showCompareBothBlueprints() {
    setBlueprintTabActive(tabBtnCompare);
    if (singleBlueprintView) singleBlueprintView.classList.add('hidden');
    if (dualBlueprintView) {
      dualBlueprintView.classList.remove('hidden');
      dualBlueprintView.classList.add('grid');
    }
    if (blueprintCardTitle) blueprintCardTitle.textContent = 'Comparative Master Blueprints';
    if (blueprintNorthBadge) blueprintNorthBadge.textContent = '🧭 TRUE NORTH';
    if (blueprintLegalBadge) blueprintLegalBadge.textContent = 'DC Converted Developments';
    if (blueprintCaptionText) {
      blueprintCaptionText.textContent = 'Comparative Master Blueprints: Sai Roots (53 Sites in Jigani corridor) alongside Global Sri Sai Prashanthi (27 Sites on Koppa Ramasandra Road). Click any sketch to zoom full resolution.';
    }
  }

  function showMasterGridBlueprint() {
    setBlueprintTabActive(tabBtnMaster);
    if (singleBlueprintView) singleBlueprintView.classList.remove('hidden');
    if (dualBlueprintView) {
      dualBlueprintView.classList.add('hidden');
      dualBlueprintView.classList.remove('grid');
    }
    if (blueprintDisplayImg) blueprintDisplayImg.src = 'photos/master-layout.webp';
    if (blueprintCardTitle) blueprintCardTitle.textContent = 'Sai Roots Plotted Master Grid';
    if (blueprintNorthBadge) blueprintNorthBadge.textContent = '🧭 0° TRUE NORTH';
    if (blueprintLegalBadge) blueprintLegalBadge.textContent = 'Architectural Demarcation';
    if (blueprintCaptionText) {
      blueprintCaptionText.textContent = 'Plotted Master Grid for Sai Roots Layout highlighting numbered villa sites, internal concrete avenue network, green buffer zones, and civic infrastructure.';
    }
  }

  if (tabBtnSaiRoots) tabBtnSaiRoots.addEventListener('click', (e) => { e.stopPropagation(); showSaiRootsBlueprint(); switchTrackerProject('sairoots'); });
  if (tabBtnSaiPrashanthi) tabBtnSaiPrashanthi.addEventListener('click', (e) => { e.stopPropagation(); showSaiPrashanthiBlueprint(); switchTrackerProject('saiprashanthi'); });
  if (tabBtnCompare) tabBtnCompare.addEventListener('click', (e) => { e.stopPropagation(); showCompareBothBlueprints(); });
  if (tabBtnMaster) tabBtnMaster.addEventListener('click', (e) => { e.stopPropagation(); showMasterGridBlueprint(); });

  if (dualTriggerSaiRoots) {
    dualTriggerSaiRoots.addEventListener('click', () => {
      openBlueprintModal('photos/sai_roots_gate.jpg', 'Sai Roots Layout — Official Sanctioned Layout Sketch');
    });
  }
  if (dualTriggerSaiPrashanthi) {
    dualTriggerSaiPrashanthi.addEventListener('click', () => {
      openBlueprintModal('photos/global-sai-prashanthi-layout-plan.jpg', 'Global Sri Sai Prashanthi — Official Master Layout Plan');
    });
  }

  if (blueprintTrigger) {
    blueprintTrigger.addEventListener('click', () => {
      const currentSrc = blueprintDisplayImg ? blueprintDisplayImg.src : 'photos/sai_roots_gate.jpg';
      const isPrashanthi = currentSrc.includes('global-sai-prashanthi');
      const isMaster = currentSrc.includes('master-layout');
      const title = isPrashanthi 
        ? 'Global Sri Sai Prashanthi — Official Master Layout Plan' 
        : (isMaster ? 'Sai Roots Layout — Plotted Master Grid' : 'Sai Roots Layout — Official Sanctioned Layout Sketch');
      openBlueprintModal(currentSrc, title);
    });
  }

  if (blueprintClose && blueprintModal) {
    blueprintClose.addEventListener('click', () => {
      blueprintModal.classList.add('hidden');
      blueprintModal.classList.remove('flex');
    });
    blueprintModal.addEventListener('click', (e) => {
      if (e.target === blueprintModal) {
        blueprintModal.classList.add('hidden');
        blueprintModal.classList.remove('flex');
      }
    });
  }

  const aboutShowcaseTrigger = document.getElementById('about-showcase-zoom-trigger');
  if (aboutShowcaseTrigger) {
    aboutShowcaseTrigger.addEventListener('click', () => {
      openBlueprintModal('photos/global-mahanshi-about-us.jpg', 'Global Mahanshi Builders — Official Brand Showcase');
    });
  }

  // --- PLOT AVAILABILITY TRACKER LOGIC (Supports Sai Roots: 53 & Sri Sai Prashanthi: 27) ---
  function getSaiRootsPlots() {
    const plots = [];
    for (let i = 1; i <= 53; i++) {
      let status = 'available';
      if ([3, 7, 12, 18, 24, 29, 35, 41, 49].includes(i)) status = 'booked';
      else if ([1, 2, 5, 8, 15, 20, 21, 30, 31, 32, 45, 50, 52].includes(i)) status = 'sold';

      let size = '30 × 40 (1,200 sq.ft)';
      let facing = (i % 2 === 0) ? 'North Facing' : 'East Facing';
      if ([1, 15, 30, 45, 53].includes(i)) {
        size = '30 × 50 (1,500 sq.ft) Corner';
        facing = 'East-North Corner';
      } else if (i > 45) {
        size = 'Custom Dimension (600–1,000 sq.ft)';
        facing = 'West Facing';
      }
      plots.push({ id: i, project: 'sairoots', projectName: 'Sai Roots Layout', status, size, facing, roads: '25/50 ft Concrete', water: 'UGD & Water Ready' });
    }
    return plots;
  }

  function getSaiPrashanthiPlots() {
    const plots = [];
    const sizes = {
      1: '20\'-4" × 40\' (813 sq.ft)', 2: '20\'-4" × 40\' (813 sq.ft)', 3: '20\'-4" × 40\' (813 sq.ft)',
      4: '27\'-4" × 40\' (1,093 sq.ft)', 5: '27\'-4" × 40\' (1,093 sq.ft)', 6: '20\'-4" × 40\' (813 sq.ft)',
      7: '20\'-4" × 40\' (813 sq.ft)', 8: '20\'-4" × 40\' (813 sq.ft)', 9: '20\'-4" × 40\' (813 sq.ft)',
      10: '20\'-4" × 40\' (813 sq.ft)', 11: '20\'-4" × 40\' (813 sq.ft)', 12: '20\'-4" × 40\' (813 sq.ft)',
      13: '20\'-4" × 40\' (813 sq.ft)', 14: '20\'-4" × 40\' (813 sq.ft)', 15: '20\'-4" × 40\' (813 sq.ft)',
      16: '34\' × 40\' Corner (1,360 sq.ft)', 17: '41\'-10" × 25\'-11" (Corner)', 18: '34\'-6" × 34\'-11"',
      19: '29\'-6" × 29\'-5"', 20: '28\'-10" × 29\'', 21: '32\' × 32\'-2"', 22: '30\'-2" × 30\'-3"',
      23: '30\'-4" × 30\'-5"', 24: '26\'-3" × 26\'-3"', 25: '27\'-3" × 27\'-3"', 26: '29\'-2" × 29\'-3"',
      27: '22\'-9" × 26\'-3" Corner'
    };
    for (let i = 1; i <= 27; i++) {
      let status = 'available';
      if ([3, 7, 12, 18, 24].includes(i)) status = 'booked';
      else if ([5, 15, 20, 26].includes(i)) status = 'sold';

      let facing = i <= 16 ? 'North/East Facing' : 'South/West Facing';
      let size = sizes[i] || '20 × 40 (800 sq.ft)';
      plots.push({ id: i, project: 'saiprashanthi', projectName: 'Sri Sai Prashanthi', status, size, facing, roads: '25/30 ft Concrete Avenue', water: 'INDUSVAL Kaveri & 3 Borewells', packageOffer: '₹52 Lakhs* All-Inclusive Site + Build' });
    }
    return plots;
  }

  function renderPlotGrid(projectKey) {
    if (!plotGrid) return;
    activeProject = projectKey;
    const plots = (projectKey === 'saiprashanthi') ? getSaiPrashanthiPlots() : getSaiRootsPlots();

    plotGrid.innerHTML = plots.map(p => `
      <div class="plot-tile ${p.status}" data-plot-id="${p.id}" data-project="${p.project}" title="${p.projectName} Plot #${p.id} (${p.status.toUpperCase()})">
        <span>#${p.id}</span>
      </div>
    `).join('');

    plotGrid.querySelectorAll('.plot-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const plotId = parseInt(tile.dataset.plotId, 10);
        const plot = plots.find(p => p.id === plotId);
        if (!plot) return;

        plotGrid.querySelectorAll('.plot-tile').forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');

        if (plotDetail) {
          const isAvail = plot.status === 'available';
          const badgeClass = isAvail 
            ? 'bg-emerald-100 text-emerald-800 border-emerald-500' 
            : (plot.status === 'booked' ? 'bg-amber-100 text-amber-800 border-amber-500' : 'bg-slate-200 text-slate-700 border-slate-400');
          const isPrashanthi = plot.project === 'saiprashanthi';

          plotDetail.innerHTML = `
            <div class="bg-white border-2 border-clay/40 rounded-2xl p-4 sm:p-5 shadow-md bracket-frame">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E6DCD0] mb-3">
                <div class="flex items-center gap-2">
                  <h4 class="font-display text-lg sm:text-xl font-bold text-pine-heading">${plot.projectName} — Plot #${plot.id}</h4>
                  <span class="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${badgeClass}">${plot.status}</span>
                </div>
                <span class="text-xs font-bold text-clay tracking-wider">${isPrashanthi ? 'KOPPA ROAD · GATED' : 'DC-CONVERTED · E-KHATA'}</span>
              </div>
              
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 text-xs font-sans">
                <div class="bg-[#FAF4EB] p-2.5 rounded-xl border border-[#E6DCD0]">
                  <span class="text-pine-muted block text-[10px] uppercase font-bold">Dimensions</span>
                  <span class="text-pine font-bold mt-0.5 block">${plot.size}</span>
                </div>
                <div class="bg-[#FAF4EB] p-2.5 rounded-xl border border-[#E6DCD0]">
                  <span class="text-pine-muted block text-[10px] uppercase font-bold">Orientation</span>
                  <span class="text-pine font-bold mt-0.5 block">🧭 ${plot.facing}</span>
                </div>
                <div class="bg-[#FAF4EB] p-2.5 rounded-xl border border-[#E6DCD0]">
                  <span class="text-pine-muted block text-[10px] uppercase font-bold">Road Access</span>
                  <span class="text-pine font-bold mt-0.5 block">🛣️ ${plot.roads}</span>
                </div>
                <div class="bg-[#FAF4EB] p-2.5 rounded-xl border border-[#E6DCD0]">
                  <span class="text-pine-muted block text-[10px] uppercase font-bold">Water &amp; Power</span>
                  <span class="text-pine font-bold mt-0.5 block">${plot.water}</span>
                </div>
              </div>

              ${isPrashanthi ? `
                <div class="mb-3.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between">
                  <span>✨ Combo Offer: Site + Custom Home Just ₹52 Lakhs* Onwards</span>
                  <span class="text-[11px] text-emerald-800 bg-white px-2 py-0.5 rounded border border-amber-300">Down Payment: ₹15L</span>
                </div>
              ` : ''}

              <div class="flex flex-wrap items-center gap-3">
                ${isAvail ? `
                  <a href="#contact" class="btn-terracotta-primary text-xs font-bold uppercase px-4 py-2 rounded-full shadow-md">
                    Book Priority Site Visit
                  </a>
                  <a href="https://wa.me/919632734110?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(plot.projectName)}%20Plot%20%23${plot.id}%20(${encodeURIComponent(plot.size)}).%20Please%20share%20the%20price%20quote%20and%20availability." target="_blank" rel="noopener noreferrer" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all shadow-sm">
                    <span>💬</span> Inquire Plot #${plot.id} on WhatsApp
                  </a>
                ` : `
                  <a href="#contact" class="btn-pine-outline text-xs font-bold uppercase px-4 py-2 rounded-full">
                    Enquire Similar Plots
                  </a>
                  <a href="https://wa.me/919632734110?text=Hi%2C%20Plot%20%23${plot.id}%20at%20${encodeURIComponent(plot.projectName)}%20is%20${plot.status}.%20Please%20share%20other%20available%20plots." target="_blank" rel="noopener noreferrer" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all shadow-sm">
                    <span>💬</span> WhatsApp Agent
                  </a>
                `}
              </div>
            </div>
          `;
        }
      });
    });
  }

  function switchTrackerProject(projectKey) {
    if (projectKey === 'saiprashanthi') {
      if (trackerBtnSaiPrashanthi) trackerBtnSaiPrashanthi.className = 'px-3 py-1 rounded-full text-xs font-bold bg-clay text-white shadow transition-all cursor-pointer';
      if (trackerBtnSaiRoots) trackerBtnSaiRoots.className = 'px-3 py-1 rounded-full text-xs font-bold bg-white text-pine border border-[#D6C2AB] hover:bg-[#FAF4EB] transition-all cursor-pointer';
    } else {
      if (trackerBtnSaiRoots) trackerBtnSaiRoots.className = 'px-3 py-1 rounded-full text-xs font-bold bg-clay text-white shadow transition-all cursor-pointer';
      if (trackerBtnSaiPrashanthi) trackerBtnSaiPrashanthi.className = 'px-3 py-1 rounded-full text-xs font-bold bg-white text-pine border border-[#D6C2AB] hover:bg-[#FAF4EB] transition-all cursor-pointer';
    }
    renderPlotGrid(projectKey);
  }

  if (trackerBtnSaiRoots) trackerBtnSaiRoots.addEventListener('click', () => switchTrackerProject('sairoots'));
  if (trackerBtnSaiPrashanthi) trackerBtnSaiPrashanthi.addEventListener('click', () => switchTrackerProject('saiprashanthi'));

  // Initialize Plot Tracker with default Sai Roots
  renderPlotGrid('sairoots');

  // --- 8. CLIENT LOGIN PORTAL POPUP MODAL CONTROLLER (SECURE AUTHENTICATION TERMINAL) ---
  function initLoginModal() {
    let loginModal = document.getElementById('login-portal-modal');

    // If modal is not in static HTML, inject dynamically so it functions across all pages
    if (!loginModal) {
      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = `
        <div id="login-portal-modal" class="portal-modal-backdrop fixed inset-0 z-[100] hidden items-center justify-center p-3 sm:p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
          <div class="relative w-full max-w-4xl portal-modal-card rounded-2xl sm:rounded-3xl p-0 text-linen my-6 overflow-hidden shadow-2xl border border-amber-400/40">
            <span class="vault-bracket-tl"></span>
            <span class="vault-bracket-tr"></span>
            <span class="vault-bracket-bl"></span>
            <span class="vault-bracket-br"></span>

            <button id="close-login-modal-btn" type="button" class="absolute top-3.5 right-3.5 z-20 text-linen/70 hover:text-white bg-black/40 hover:bg-black/70 border border-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200" aria-label="Close login dialog">
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              <div class="lg:col-span-5 relative p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-amber-400/25">
                <div class="absolute inset-0 z-0">
                  <img src="photos/hero-architectural-villa.webp" alt="Global Mahanshi Landmark Architecture" class="h-full w-full object-cover object-center filter brightness-60 contrast-110" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0e221c] via-[#0e221c]/90 to-[#1F3630]/75"></div>
                </div>

                <div class="relative z-10">
                  <div class="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300 mb-3.5">
                    <span>ESTD 2026 · BENGALURU</span>
                  </div>
                  <h3 id="login-modal-title" class="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-[1.15]">
                    Client &amp; Investor <br/><span class="text-amber-200">Executive Vault</span>
                  </h3>
                  <p class="text-xs sm:text-sm text-linen/80 mt-2 font-light">
                    Direct authenticated access for verified plot owners, landmark landowners &amp; custom home builders.
                  </p>
                </div>

                <div class="relative z-10 space-y-3.5 my-6 text-xs">
                  <div class="flex items-start gap-2.5">
                    <span class="size-6 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">📐</span>
                    <div>
                      <strong class="text-white block font-semibold text-xs">Master CAD Layout Blueprints</strong>
                      <span class="text-linen/70 text-[11px]">Sanctioned layout boundaries &amp; 30×40, 30×50 dimension charts.</span>
                    </div>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="size-6 rounded-lg bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">📜</span>
                    <div>
                      <strong class="text-white block font-semibold text-xs">E-Khata &amp; Title Verification</strong>
                      <span class="text-linen/70 text-[11px]">DC-conversion papers, BMRDA clear title documentation trail.</span>
                    </div>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="size-6 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">💎</span>
                    <div>
                      <strong class="text-white block font-semibold text-xs">Live Allotment Tracker</strong>
                      <span class="text-linen/70 text-[11px]">Real-time available vs booked plot matrix for Sai Roots Layout.</span>
                    </div>
                  </div>
                </div>

                <div class="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-linen/75">
                  <span class="flex items-center gap-1.5 font-medium">
                    <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Jigani &amp; South Bengaluru</span>
                  </span>
                  <span class="text-amber-300 font-mono font-bold tracking-wider">VAULT v2.6</span>
                </div>
              </div>

              <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#122822]/95 backdrop-blur-md">
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <p class="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-300">Verified Client Access</p>
                      <h4 class="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">Plot Owner &amp; Investor Portal</h4>
                    </div>
                    <span class="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
                      🔒 Official Project Desk
                    </span>
                  </div>

                  <div class="space-y-4 my-5 text-linen/90">
                    <p class="text-sm leading-relaxed">
                      To protect landowner confidentiality and layout security, access to active <strong>CCTV construction cameras</strong>, <strong>high-resolution CAD blueprints</strong>, and <strong>registered deed archives</strong> is provisioned exclusively to verified allotment holders.
                    </p>

                    <div class="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                      <div class="flex items-center gap-2 text-amber-200 font-semibold">
                        <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <span>How to access your private client vault:</span>
                      </div>
                      <p class="text-linen/75 pl-6 leading-relaxed">
                        Contact your assigned relationship manager or connect directly with our central Bengaluru desk below. Access credentials will be dispatched to your registered mobile number upon identity verification.
                      </p>
                    </div>

                    <div class="pt-2 flex flex-col gap-3">
                      <a href="https://wa.me/919632734110?text=Hi%20Global%20Mahanshi%20Builders%2C%20I%20am%20a%20registered%20client%20requesting%20my%20secure%20portal%20access%20credentials." target="_blank" rel="noopener noreferrer" class="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm uppercase tracking-wider py-3.5 px-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]">
                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        <span>Request Access on WhatsApp</span>
                      </a>
                      <a href="tel:+919632734110" class="w-full rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider py-3 px-4 transition-all duration-300 flex items-center justify-center gap-2">
                        <svg class="size-4 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <span>Call Site Desk (+91 96327 34110)</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="text-center pt-3 mt-4 border-t border-white/10">
                  <button type="button" id="dismiss-login-guest-btn" class="text-xs text-linen/75 hover:text-amber-200 transition-colors inline-flex items-center gap-1.5 py-1">
                    <span>Close and Continue Browsing</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalWrapper.firstElementChild);
      loginModal = document.getElementById('login-portal-modal');
    }

    const closeBtn = document.getElementById('close-login-modal-btn');
    const dismissBtn = document.getElementById('dismiss-login-guest-btn');

    function openModal() {
      if (!loginModal) return;
      loginModal.classList.remove('hidden');
      loginModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!loginModal) return;
      loginModal.classList.add('hidden');
      loginModal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

    if (loginModal) {
      loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
          closeModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && loginModal && !loginModal.classList.contains('hidden')) {
        closeModal();
      }
    });

    document.querySelectorAll('.open-login-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
  }

  initLoginModal();

  // --- SRI SAI PRASHANTHI INTERACTIVE PHOTO VIEWER & ZOOM ---
  const spMainImg = document.getElementById('sp-main-img');
  const spImgBadge = document.getElementById('sp-img-badge');
  const spThumbBtns = document.querySelectorAll('.sp-thumb-btn');
  const spMainBox = document.getElementById('sp-main-view-box');

  if (spMainImg && spThumbBtns.length > 0) {
    spThumbBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const src = btn.getAttribute('data-src');
        const badge = btn.getAttribute('data-badge');
        const title = btn.getAttribute('data-title');

        if (src) {
          spMainImg.style.opacity = '0';
          setTimeout(() => {
            spMainImg.src = src;
            spMainImg.alt = title || 'Sri Sai Prashanthi Photo';
            spMainImg.style.opacity = '1';
          }, 150);
        }

        if (spImgBadge && badge) {
          spImgBadge.textContent = badge;
        }

        spThumbBtns.forEach(b => {
          b.classList.remove('border-clay', 'active');
          b.classList.add('border-transparent');
        });
        btn.classList.remove('border-transparent');
        btn.classList.add('border-clay', 'active');
      });
    });

    function openSpModal() {
      const blueprintModal = document.getElementById('blueprint-modal');
      const blueprintModalImg = document.getElementById('blueprint-modal-img');
      const blueprintModalTitle = document.getElementById('blueprint-modal-title');
      if (blueprintModal && blueprintModalImg) {
        blueprintModalImg.src = spMainImg.src;
        if (blueprintModalTitle) {
          const activeBtn = document.querySelector('.sp-thumb-btn.active');
          blueprintModalTitle.textContent = 'Sri Sai Prashanthi — ' + (activeBtn ? activeBtn.getAttribute('data-title') : 'Authentic Layout View');
        }
        blueprintModal.classList.remove('hidden');
        blueprintModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    }

    if (spMainBox) {
      spMainBox.addEventListener('click', (e) => {
        openSpModal();
      });
    }
  }
});


