/**
 * Theshan Theekshana — Portfolio Interactive Logic & Motion System
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initScrollReveal();
  initNumberCounters();
  initScrollSpy();
  initCard3DTilt();
  initSkillsFilter();
  initProjectModals();
  initAboutModal();
  initTestimonialsSlider();
  initContactForm();
  initCVDownload();
  initCursorGlow();
  initBackToTop();
  initMobileMenu();
});

/* ==================== 1. THEME SWITCHER ==================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Read saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('theshan-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theshan-theme', nextTheme);

      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Glass Theme`);
    });
  }
}

/* ==================== 2. SCROLL PROGRESS BAR ==================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==================== 3. SCROLL REVEAL ANIMATIONS ==================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('is-revealed');
        }, parseInt(delay, 10));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==================== 4. LIVE NUMBER COUNTERS ==================== */
function initNumberCounters() {
  const counterElements = document.querySelectorAll('[data-target]');

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetNumber = parseInt(entry.target.getAttribute('data-target'), 10);
        animateCounter(entry.target, targetNumber, 1600);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));
}

function animateCounter(element, target, duration = 1500) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeProgress * target);
    element.textContent = currentVal;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = target;
    }
  };
  window.requestAnimationFrame(step);
}

/* ==================== 5. SCROLL SPY NAVIGATION ==================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

/* ==================== 6. 3D CARD TILT ON MOUSE MOVE ==================== */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll('.card-hover-3d, #hero-card-tilt');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==================== 7. SKILLS FILTERING ==================== */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.filter-pill');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.92)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==================== 8. PROJECT MODALS ==================== */
const projectData = {
  finova: {
    title: 'Finova — Real-Time Financial Telemetry Platform',
    category: 'High-Throughput Streaming & Systems Engineering',
    tags: ['C++20', 'WebSockets', 'React', 'Docker', 'Redis'],
    overview: 'Finova is an ultra-low-latency financial streaming engine engineered for high-throughput market telemetry. It ingests thousands of events per second with sub-10ms delivery to an interactive glassmorphic analytical console.',
    features: [
      'Sub-10ms p99 event processing pipeline written in modern C++20',
      'Asynchronous WebSocket push engine handling 15,000+ simultaneous subscriptions',
      'Interactive financial depth chart and order book visualization',
      'Memory-efficient circular buffering minimizing cache misses and garbage collection pauses'
    ],
    architecture: 'Hardware ingestion layer via ring buffer queues -> C++ processing daemon -> Redis Pub/Sub backplane -> React reactive visualization frontend.'
  },
  neuromorphic: {
    title: 'Neuromorphic Vision Core — Autonomous Edge Perception',
    category: 'Embedded Computer Vision & Edge AI',
    tags: ['Python', 'OpenCV', 'TensorRT', 'NVIDIA Jetson', 'ROS2'],
    overview: 'A lightweight spatial perception engine optimized for constrained compute devices. Deployed on autonomous robotics platforms for real-time obstacle evasion, spatial depth inference, and multi-object tracking.',
    features: [
      '45+ FPS real-time detection on NVIDIA Jetson embedded hardware',
      'Custom quantized neural backbone with int8 TensorRT acceleration',
      'Kalman filter-based persistent tracking across occlusion boundaries',
      'Autonomous ROS2 integration for navigation waypoints and flight controllers'
    ],
    architecture: 'Dual CSI Camera feed -> TensorRT inference runtime -> Spatial bounding & radar mapper -> Flight/Robot controller UART.'
  },
  aeropulse: {
    title: 'AeroPulse Cloud Platform — UAV Mesh Telemetry',
    category: 'Embedded Hardware & Distributed IoT',
    tags: ['ESP32', 'FreeRTOS', 'Node.js', 'MQTT', 'Three.js'],
    overview: 'An end-to-end telemetry and ground-control platform for autonomous aerial swarms. Combines custom ESP32 flight sensor nodes with an interactive real-time 3D flight dashboard.',
    features: [
      'Custom FreeRTOS multi-threaded firmware handling IMU, GPS, and LoRa radios',
      'Resilient peer-to-peer mesh fallback during base station link loss',
      'Real-time 3D attitude, altitude, and battery state visualization',
      'Over-the-air (OTA) secure firmware dispatch and flight logs telemetry'
    ],
    architecture: 'ESP32 IMU/GPS Node -> FreeRTOS Task Scheduler -> LoRa/LTE Gateway -> MQTT Broker -> Cloud Analytics Engine.'
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-project-content');
  const closeBtn = document.getElementById('close-project-modal');
  const projectCards = document.querySelectorAll('.project-card');

  if (!modal || !modalContent) return;

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      const data = projectData[projectId];
      if (!data) return;

      modalContent.innerHTML = `
        <div class="badge-pill section-badge">
          <span>PROJECT CASE STUDY</span>
        </div>
        <h3 id="modal-project-title" class="modal-heading">${data.title}</h3>
        <p class="modal-lead">${data.category}</p>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
          ${data.tags.map(tag => `<span class="tech-chip">${tag}</span>`).join('')}
        </div>

        <p style="font-size: 1rem; line-height: 1.7; color: var(--text-primary); margin-bottom: 20px;">
          ${data.overview}
        </p>

        <div class="modal-spec-grid">
          <div class="spec-block glass-card-inner">
            <h4 class="spec-title">✨ Key Engineering Highlights</h4>
            <ul class="spec-list">
              ${data.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
          <div class="spec-block glass-card-inner">
            <h4 class="spec-title">🏗 System Architecture</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
              ${data.architecture}
            </p>
          </div>
        </div>

        <div class="modal-actions-bar" style="gap: 12px; margin-top: 20px;">
          <button class="btn btn-outline" onclick="document.getElementById('project-modal').classList.remove('open')">
            Close
          </button>
          <a href="#contact" class="btn btn-primary" onclick="document.getElementById('project-modal').classList.remove('open')">
            <span>Inquire About Architecture</span>
            <span class="arrow-up-right">↗</span>
          </a>
        </div>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ==================== 9. ABOUT MODAL ==================== */
function initAboutModal() {
  const openBtn = document.getElementById('open-about-modal');
  const modal = document.getElementById('about-modal');
  const closeBtn = document.getElementById('close-about-modal');

  if (!openBtn || !modal) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ==================== 10. TESTIMONIALS SLIDER ==================== */
function initTestimonialsSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  let currentIndex = 0;

  if (cards.length === 0 || !prevBtn || !nextBtn) return;

  // On mobile screens, cards can be cycled
  function showTestimonial(index) {
    if (window.innerWidth <= 1080) {
      cards.forEach((card, i) => {
        card.style.display = i === index ? 'flex' : 'none';
      });
    } else {
      cards.forEach(card => card.style.display = 'flex');
    }
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showTestimonial(currentIndex);
    cards[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showTestimonial(currentIndex);
    cards[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  window.addEventListener('resize', () => {
    showTestimonial(currentIndex);
  });
}

/* ==================== 11. CONTACT FORM VALIDATION & SUBMISSION ==================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const serviceInput = document.getElementById('contact-service');
    const messageInput = document.getElementById('contact-message');

    // Reset error states
    form.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));

    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!serviceInput.value) {
      serviceInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      messageInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      form.reset();
      showToast(`Thank you, ${nameInput.value || 'friend'}! Your message has been sent to Theshan.`);
    }, 1200);
  });
}

/* ==================== 12. CV DOWNLOAD ACTION ==================== */
function initCVDownload() {
  const downloadBtn = document.getElementById('hero-download-cv');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    showToast('Theshan Theekshana — CV (Computer Engineering) generated!');

    // Create an accessible text summary download or preview
    const cvSummary = `THESHAN THEEKSHANA — CURRICULUM VITAE
Role: Computer Engineering Student & Systems Architect
Email: theshan.theekshana@eng.portfolio.com
Location: Colombo, Sri Lanka (Available Globally)

ACADEMIC FOCUS & SPECIALIZATIONS:
• Embedded Systems, Microcontroller Architecture (ARM Cortex, ESP32, STM32)
• Real-Time Operating Systems (FreeRTOS)
• High-Performance Systems Programming (Modern C++20, Rust)
• Distributed Computing & Scalable Web Architectures (React, Node.js, Docker)
• Edge AI & Computer Vision (OpenCV, TensorRT)

PROJECT HIGHLIGHTS:
1. Finova — Real-Time Financial Telemetry Platform (C++20, WebSocket, React)
2. Neuromorphic Vision Core — Autonomous Spatial Edge AI (Python, OpenCV, TensorRT)
3. AeroPulse Cloud Platform — UAV Mesh Telemetry & Ground Station (ESP32, FreeRTOS, Three.js)`;

    const blob = new Blob([cvSummary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Theshan_Theekshana_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

/* ==================== 13. CURSOR GLOW ==================== */
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursor-glow');
  if (!cursorGlow) return;

  // Only enable on pointer fine devices (desktops)
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }, { passive: true });
  }
}

/* ==================== 14. BACK TO TOP ==================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==================== 15. MOBILE MENU ==================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

/* ==================== TOAST NOTIFICATION HELPER ==================== */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}
