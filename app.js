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

  // --- 4. MOBILE NAVIGATION TOGGLE ---
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-drawer');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isHidden = mobileNav.classList.contains('hidden');
      if (isHidden) {
        mobileNav.classList.remove('hidden');
        menuToggle.setAttribute('aria-expanded', 'true');
      } else {
        mobileNav.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 5. ENQUIRY FORM SUBMISSION FEEDBACK ---
  const enquiryForm = document.getElementById('site-enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(enquiryForm);
      const name = formData.get('name') || 'Customer';
      const mobile = formData.get('mobile') || '';
      const looking = formData.get('looking') || formData.get('purpose') || 'General enquiry';
      const interest = formData.get('interest') || formData.get('project') || 'Sai Roots Layout';
      const visit = formData.get('visit') || formData.get('siteVisit') || 'no';
      const message = formData.get('message') || '';

      // Direct WhatsApp redirect option
      const waText = encodeURIComponent(
        `Hi Global Mahanshi Builders,\n\nName: ${name}\nMobile: ${mobile}\nLooking for: ${looking}\nInterested in: ${interest}\nSite Visit Required: ${visit === 'yes' || visit === 'Yes' ? 'Yes' : 'Not yet'}\nDetails: ${message}`
      );

      const confirmWa = confirm(
        `Thank you ${name}! Your enquiry has been received.\n\nWould you like to forward these details directly to our WhatsApp hotline for an instant response?`
      );

      if (confirmWa) {
        window.open(`https://wa.me/919632734110?text=${waText}`, '_blank');
      }
      enquiryForm.reset();
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

  // --- 8. CLIENT LOGIN PORTAL POPUP MODAL CONTROLLER (UNIQUE ARCHITECTURAL VAULT) ---
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

            <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
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
                      <p class="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-300">Authorized Access</p>
                      <h4 class="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">Sign In to Continue</h4>
                    </div>
                    <span class="text-xs font-mono text-amber-300/80 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/30">
                      🔒 256-Bit SSL
                    </span>
                  </div>

                  <div id="vip-keycard-widget" class="vip-keycard rounded-2xl p-4 mb-5 border border-amber-400/40" title="Click anywhere on card to auto-fill credentials">
                    <div class="flex items-center justify-between pb-2 mb-2 border-b border-white/15">
                      <div class="flex items-center gap-2.5">
                        <div class="w-7 h-5 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300 shadow-sm flex items-center justify-center">
                          <div class="w-5 h-3.5 border border-amber-900/60 rounded-xs grid grid-cols-2 gap-0.5 p-0.5">
                            <span class="bg-amber-100/60 rounded-xs"></span><span class="bg-amber-100/60 rounded-xs"></span>
                            <span class="bg-amber-100/60 rounded-xs"></span><span class="bg-amber-100/60 rounded-xs"></span>
                          </div>
                        </div>
                        <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">VIP MASTER KEYCARD</span>
                      </div>
                      <span id="keycard-status-badge" class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <span class="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Tap To Insert</span>
                      </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 font-mono">
                      <div class="bg-black/50 rounded-xl p-2.5 border border-white/10">
                        <span class="text-[10px] uppercase text-linen/60 font-sans font-bold block mb-0.5">Authorized User</span>
                        <span class="text-amber-200 font-bold tracking-tight text-[11px] sm:text-xs truncate block">admin@globalmahanshi.com</span>
                      </div>
                      <div class="bg-black/50 rounded-xl p-2.5 border border-white/10">
                        <span class="text-[10px] uppercase text-linen/60 font-sans font-bold block mb-0.5">Security Passkey</span>
                        <span class="text-amber-200 font-bold tracking-widest text-[11px] sm:text-xs block">mahanshi2026</span>
                      </div>
                    </div>

                    <button type="button" id="quick-fill-login-btn" class="w-full bg-gradient-to-r from-amber-400/25 via-amber-300/35 to-amber-400/25 hover:from-amber-400/40 hover:to-amber-400/40 border border-amber-400/60 rounded-xl py-2 px-3 text-xs font-bold text-amber-200 hover:text-white uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-sm active:scale-[0.98]">
                      <svg class="size-3.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      <span>⚡ Tap Card to Auto-Fill Credentials</span>
                    </button>
                  </div>

                  <form id="client-login-form" class="space-y-3.5">
                    <div>
                      <label for="login-username-input" class="block text-xs font-bold uppercase tracking-wider text-linen/80 mb-1">Email or Mobile Number</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-linen/40">
                          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                        <input type="text" id="login-username-input" value="admin@globalmahanshi.com" required autocomplete="username" class="portal-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm font-medium" placeholder="admin@globalmahanshi.com" />
                      </div>
                    </div>

                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <label for="login-password-input" class="block text-xs font-bold uppercase tracking-wider text-linen/80">Security Password</label>
                        <span class="text-[11px] text-amber-300/80 font-medium cursor-pointer hover:underline" id="login-hint-trigger">Hint: mahanshi2026</span>
                      </div>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-linen/40">
                          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                        <input type="password" id="login-password-input" value="mahanshi2026" required autocomplete="current-password" class="portal-input w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium" placeholder="••••••••" />
                        <button type="button" id="toggle-password-vis-btn" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-linen/40 hover:text-white transition-colors" aria-label="Toggle password visibility">
                          <svg class="size-4" id="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                      </div>
                    </div>

                    <div class="flex items-center justify-between text-xs pt-0.5">
                      <label class="flex items-center gap-2 cursor-pointer text-linen/80 hover:text-white">
                        <input type="checkbox" id="remember-device-check" checked class="rounded border-white/20 bg-[#122822] text-[#ff7738] focus:ring-0 focus:ring-offset-0 size-3.5 accent-[#ff7738]">
                        <span>Remember this device</span>
                      </label>
                      <span class="text-linen/60 text-[11px]">DC &amp; E-Khata Verified</span>
                    </div>

                    <div id="login-feedback-alert" class="hidden rounded-xl p-3 text-xs font-semibold"></div>

                    <button type="submit" id="login-submit-btn" class="w-full rounded-xl bg-gradient-to-r from-[#ff7738] to-[#b84a24] hover:from-[#ff884d] hover:to-[#c9522a] text-white font-bold text-sm uppercase tracking-wider py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]">
                      <span>Unlock Client Vault</span>
                      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                  </form>
                </div>

                <div class="text-center pt-3 mt-1 border-t border-white/10">
                  <button type="button" id="dismiss-login-guest-btn" class="text-xs text-linen/75 hover:text-amber-200 transition-colors inline-flex items-center gap-1.5 py-1">
                    <span>Continue Browsing Website as Guest</span>
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
    const quickFillBtn = document.getElementById('quick-fill-login-btn');
    const keycardWidget = document.getElementById('vip-keycard-widget');
    const keycardStatus = document.getElementById('keycard-status-badge');
    const hintTrigger = document.getElementById('login-hint-trigger');
    const loginForm = document.getElementById('client-login-form');
    const usernameInput = document.getElementById('login-username-input');
    const passwordInput = document.getElementById('login-password-input');
    const togglePassBtn = document.getElementById('toggle-password-vis-btn');
    const feedbackAlert = document.getElementById('login-feedback-alert');

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

    // Auto open popup removed as Client Login has been removed

    // Close on ✕ button click
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Dismiss on guest button click
    if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

    // Close on backdrop click outside card
    if (loginModal) {
      loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
          closeModal();
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && loginModal && !loginModal.classList.contains('hidden')) {
        closeModal();
      }
    });

    // Interactive Keycard Fill & Glow Trigger
    function fillCredentials() {
      if (usernameInput) usernameInput.value = 'admin@globalmahanshi.com';
      if (passwordInput) passwordInput.value = 'mahanshi2026';

      if (keycardWidget) {
        keycardWidget.classList.add('card-activated');
        setTimeout(() => keycardWidget.classList.remove('card-activated'), 700);
      }

      if (keycardStatus) {
        keycardStatus.className = 'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400 flex items-center gap-1';
        keycardStatus.innerHTML = '<span class="size-1.5 rounded-full bg-emerald-400"></span><span>Key Loaded ✓</span>';
        setTimeout(() => {
          keycardStatus.className = 'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1';
          keycardStatus.innerHTML = '<span class="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span><span>Tap To Insert</span>';
        }, 2200);
      }

      if (usernameInput && passwordInput) {
        usernameInput.style.borderColor = '#f5c344';
        passwordInput.style.borderColor = '#f5c344';
        setTimeout(() => {
          usernameInput.style.borderColor = '';
          passwordInput.style.borderColor = '';
        }, 800);
      }
    }

    if (quickFillBtn) {
      quickFillBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fillCredentials();
      });
    }

    if (keycardWidget) {
      keycardWidget.addEventListener('click', fillCredentials);
    }

    // Hint trigger click
    if (hintTrigger && passwordInput) {
      hintTrigger.addEventListener('click', () => {
        passwordInput.value = 'mahanshi2026';
      });
    }

    // Toggle password visibility
    if (togglePassBtn && passwordInput) {
      togglePassBtn.addEventListener('click', () => {
        const isPass = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPass ? 'text' : 'password');
        togglePassBtn.innerHTML = isPass ? `
          <svg class="size-4 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
        ` : `
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        `;
      });
    }

    // Form submit validation & success
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = usernameInput ? usernameInput.value.trim() : '';
        const p = passwordInput ? passwordInput.value.trim() : '';

        if (!u || !p) {
          if (feedbackAlert) {
            feedbackAlert.className = 'rounded-xl p-3 text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30';
            feedbackAlert.textContent = 'Please provide both username and password.';
            feedbackAlert.classList.remove('hidden');
          }
          return;
        }

        // Verification success
        if (feedbackAlert) {
          feedbackAlert.className = 'rounded-xl p-3 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-2';
          feedbackAlert.innerHTML = `
            <svg class="size-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
            <span>Access Granted! Welcome to Global Mahanshi Builders Vault.</span>
          `;
          feedbackAlert.classList.remove('hidden');
        }

        // Update header login button status
        document.querySelectorAll('.open-login-modal-btn').forEach(btn => {
          btn.innerHTML = `
            <span class="inline-flex items-center gap-1.5 text-emerald-300 font-bold">
              <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Vault Unlocked (${u.split('@')[0]})</span>
            </span>
          `;
        });

        setTimeout(() => {
          closeModal();
        }, 900);
      });
    }

    // Bind all Client Login buttons in header / drawers
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


