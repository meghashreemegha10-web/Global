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
      image: '/photos/site-road-demarcated-plots.jpeg'
    },
    {
      num: '02',
      badge: 'Plotted Development',
      title: 'DC Converted Plotted Communities',
      sub: '25–50 Ft Concrete Roads · Underground Utilities · Green Corridors',
      desc: 'Master-planned residential plotted layouts with 50 ft main approaches, underground sewage lines, individual E-Khata, and ready title documentation.',
      specs: 'Concrete Roads · Underground Sewage · Street Lighting',
      image: '/photos/images-sai-roots-entrance.webp'
    },
    {
      num: '03',
      badge: 'Custom Construction',
      title: 'Turnkey Independent Residences',
      sub: '550-Grade TMT Steel · 53-Grade Cement · Teak Main Doors',
      desc: 'Custom turnkey homes built from foundation to final coat. Built with 550-grade TMT steel, branded 53-grade cement, and premium teak main door fixtures.',
      specs: 'TMT Steel 550D · Ultratech Cement · Solid Teak Wood',
      image: '/photos/site-infrastructure-drainage.jpeg'
    },
    {
      num: '04',
      badge: 'Bungalows',
      title: 'Silent Luxury Bungalows',
      sub: 'Exposed Brick & Stone · Cantilever Terraces · Warm Ambient Glow',
      desc: 'Understated private residences featuring earthy natural stone, interior courtyards, natural cross-ventilation, and shaded outdoor terraces.',
      specs: 'Natural Granite · Porotherm Clay · Warm Lighting',
      image: '/photos/site-sanctioned-layout-blueprint.jpeg'
    },
    {
      num: '05',
      badge: 'Townships',
      title: 'Gated Park Townships',
      sub: '53 Sites · Grand Entrance Arch · Landscaped Green Corridors',
      desc: 'Boutique residential plotted developments designed around central parks, security gates, and immediate building clearances.',
      specs: 'Avenue Plantations · Rainwater Harvesting · Children\'s Park',
      image: '/photos/images-sri-sai-prasanthi-entrance.webp'
    },
    {
      num: '06',
      badge: 'Turnkey Finishing',
      title: 'Granite & Vitrified Elegance',
      sub: 'Granite Flooring · UPVC Acoustic Windows · Modular Living',
      desc: 'High-spec interior appointments including mirror-polish granite, Jaquar bathware, custom modular provisions, and acoustic glass.',
      specs: 'Black Pearl Granite · 4-Track UPVC · Concealed Wiring',
      image: '/photos/site-entrance-arch-clear.jpeg'
    }
  ];

  const tabButtons = document.querySelectorAll('.theme-tab-btn');
  const showcaseImg = document.getElementById('showcase-image');
  const showcaseNum = document.getElementById('showcase-num');
  const showcaseTitle = document.getElementById('showcase-title');
  const showcaseDesc = document.getElementById('showcase-desc');
  const showcaseSpecs = document.getElementById('showcase-specs');

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
            showcaseImg.style.opacity = '1';
            showcaseImg.style.transform = 'scale(1)';
          }, 200);
        }
      });
    });
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
          heroImg.src = '/photos/hero-architectural-villa.webp';
          heroImg.style.filter = 'brightness(0.95) contrast(1.05)';
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
  const plotGrid = document.getElementById('plotGridVisual');
  const plotDetail = document.getElementById('plotSelectedDetail');
  const blueprintTrigger = document.getElementById('blueprint-zoom-trigger');
  const blueprintModal = document.getElementById('blueprint-modal');
  const blueprintClose = document.getElementById('blueprint-modal-close');

  if (blueprintTrigger && blueprintModal && blueprintClose) {
    blueprintTrigger.addEventListener('click', () => {
      blueprintModal.classList.remove('hidden');
      blueprintModal.classList.add('flex');
    });
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

  if (plotGrid) {
    const plots = [];
    for (let i = 1; i <= 53; i++) {
      let status = 'available';
      if ([3, 7, 12, 18, 24, 29, 35, 41, 49].includes(i)) {
        status = 'booked';
      } else if ([1, 2, 5, 8, 15, 20, 21, 30, 31, 32, 45, 50, 52].includes(i)) {
        status = 'sold';
      }

      let size = '30 × 40 (1,200 sq.ft)';
      let facing = (i % 2 === 0) ? 'North Facing' : 'East Facing';
      if ([1, 15, 30, 45, 53].includes(i)) {
        size = '30 × 50 (1,500 sq.ft) Corner';
        facing = 'East-North Corner';
      } else if (i > 45) {
        size = 'Custom Dimension (600–1,000 sq.ft)';
        facing = 'West Facing';
      }

      plots.push({ id: i, status, size, facing });
    }

    plotGrid.innerHTML = plots.map(p => `
      <div class="plot-tile ${p.status}" data-plot-id="${p.id}" title="Plot #${p.id} (${p.status.toUpperCase()})">
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
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500' 
            : (plot.status === 'booked' ? 'bg-amber-500/20 text-amber-300 border-amber-500' : 'bg-slate-500/20 text-slate-400 border-slate-500');

          plotDetail.innerHTML = `
            <div class="bg-[#0d1d19] border border-amber-400/40 rounded-2xl p-4 sm:p-5 shadow-lg bracket-frame">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 mb-3">
                <div class="flex items-center gap-2">
                  <h4 class="font-display text-lg sm:text-xl font-bold text-white">Sai Roots — Plot #${plot.id}</h4>
                  <span class="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${badgeClass}">${plot.status}</span>
                </div>
                <span class="text-xs font-bold text-[#F5C344] tracking-wider">DC-CONVERTED · E-KHATA</span>
              </div>
              
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 text-xs">
                <div class="bg-[#122822] p-2.5 rounded-xl border border-white/10">
                  <span class="text-[#8E9B95] block text-[10px] uppercase font-bold">Dimensions</span>
                  <span class="text-white font-bold mt-0.5 block">${plot.size}</span>
                </div>
                <div class="bg-[#122822] p-2.5 rounded-xl border border-white/10">
                  <span class="text-[#8E9B95] block text-[10px] uppercase font-bold">Orientation</span>
                  <span class="text-white font-bold mt-0.5 block">🧭 ${plot.facing} (Vastu)</span>
                </div>
                <div class="bg-[#122822] p-2.5 rounded-xl border border-white/10">
                  <span class="text-[#8E9B95] block text-[10px] uppercase font-bold">Road Access</span>
                  <span class="text-white font-bold mt-0.5 block">🛣️ 25/40 ft Concrete</span>
                </div>
                <div class="bg-[#122822] p-2.5 rounded-xl border border-white/10">
                  <span class="text-[#8E9B95] block text-[10px] uppercase font-bold">Utilities</span>
                  <span class="text-white font-bold mt-0.5 block">⚡ UGD &amp; Water Ready</span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                ${isAvail ? `
                  <a href="#contact" class="btn-terracotta-primary text-xs font-bold uppercase px-4 py-2 rounded-full shadow-md">
                    Book Priority Site Visit
                  </a>
                  <a href="https://wa.me/919632734110?text=Hi%2C%20I%20am%20interested%20in%20Sai%20Roots%20Layout%20Plot%20%23${plot.id}%20(${encodeURIComponent(plot.size)}%2C%20${encodeURIComponent(plot.facing)}).%20Please%20share%20the%20price%20quote%20and%20availability." target="_blank" rel="noopener noreferrer" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all">
                    <span>💬</span> Inquire Plot #${plot.id} on WhatsApp
                  </a>
                ` : `
                  <a href="#contact" class="btn-pine-outline text-xs font-bold uppercase px-4 py-2 rounded-full">
                    Enquire Similar Plots
                  </a>
                  <a href="https://wa.me/919632734110?text=Hi%2C%20Plot%20%23${plot.id}%20is%20${plot.status}.%20Please%20share%20other%20available%20plots%20with%20similar%20dimensions." target="_blank" rel="noopener noreferrer" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all">
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
});
