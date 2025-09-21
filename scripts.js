document.addEventListener('DOMContentLoaded', () => {
  // ======================
  // CARRUSEL FALLBACK HERO
  // ======================
  const video = document.getElementById('hero-video');
  const carousel = document.getElementById('fallback-carousel');
  const images = carousel.querySelectorAll('img');
  let current = 0;
  images.forEach(img => img.style.display = 'none');

  function showNextImage() {
    images.forEach(img => img.style.display = 'none');
    images[current].style.display = 'block';
    current = (current + 1) % images.length;
  }

  function activateCarousel() {
    video.style.display = 'none';
    carousel.style.display = 'block';
    showNextImage();
    setInterval(showNextImage, 3000);
  }

  video.addEventListener('error', activateCarousel);
  video.addEventListener('stalled', activateCarousel);

  setTimeout(() => {
    if (video.readyState < 3) activateCarousel();
  }, 2000);

  // ======================
  // BANNER PROMOCIONAL
  // ======================
  const banner = document.getElementById('promo-banner');
  if (banner) {
    const now = new Date();
    const month = now.getMonth(); 
    const day = now.getDate();

    if ((month === 7 && day >= 30) || month === 8 || (month === 9 && day <= 31)) {
      banner.innerHTML = "🎃 ¡Promo Halloween! Cursos con 20% OFF 👻";
      banner.style.display = "block";
    } else if (month === 11 && day <= 25) {
      banner.innerHTML = "🎄 ¡Promo Navidad! Inscríbete y recibe un kit gratis 🎁";
      banner.style.display = "block";
    }

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '✖';
    closeBtn.style.cssText = 'margin-left:15px; cursor:pointer; font-weight:bold;';
    closeBtn.addEventListener('click', () => banner.style.display = 'none');
    banner.appendChild(closeBtn);
  }

  // ======================
  // BANNER CONSTRUCTION ALERT
  // ======================
  const constructionBanner = document.getElementById("construction-banner");
  if (constructionBanner) {
    let visible = false;
    setInterval(() => {
      visible = !visible;
      if (visible) {
        constructionBanner.classList.add("show");
      } else {
        constructionBanner.classList.remove("show");
      }
    }, 5000);
  }

  // ======================
  // ANIMACION SLOGAN
  // ======================
  const animated = document.getElementById('animated-text');
  if (animated) {
    const fullText = animated.textContent;
    animated.textContent = '';
    let i = 0;
    let deleting = false;

    setInterval(() => {
      if (!deleting && i < fullText.length) {
        animated.textContent += fullText.charAt(i);
        i++;
      } else if (!deleting && i === fullText.length) {
        deleting = true;
        setTimeout(() => {}, 1000);
      } else if (deleting && i > 0) {
        animated.textContent = fullText.substring(0, i - 1);
        i--;
      } else if (deleting && i === 0) {
        deleting = false;
      }
    }, 120);
  }

  // ======================
  // CARRUSEL CAPACITACIONES
  // ======================
  const capCarousel = document.querySelector(".carousel");
  const items = Array.from(document.querySelectorAll(".carousel-item"));
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const itemCount = items.length;
  let index = 0;
  let interval;

  // Clonar items para loop infinito
  items.forEach(item => capCarousel.appendChild(item.cloneNode(true)));
  const allItems = Array.from(capCarousel.children);

  function getVisibleCount() {
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 600) return 2;
    return 1;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCount();
    const offset = -index * (100 / visibleCount);
    capCarousel.style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
    index++;
    if (index >= itemCount) index = 0;
    capCarousel.style.transition = 'transform 0.5s ease';
    updateCarousel();
  }

  function prevSlide() {
    index--;
    if (index < 0) index = itemCount - 1;
    capCarousel.style.transition = 'transform 0.5s ease';
    updateCarousel();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  interval = setInterval(nextSlide, 3000);

  capCarousel.addEventListener("mouseenter", () => clearInterval(interval));
  capCarousel.addEventListener("mouseleave", () => interval = setInterval(nextSlide, 3000));

  allItems.forEach(item => {
    item.addEventListener("click", () => {
      const curso = encodeURIComponent(item.dataset.curso);
      const url = `https://wa.me/573155704875?text=Hola,%20quiero%20información%20sobre%20el%20curso%20de%20${curso}`;
      window.open(url, "_blank");
    });
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();

  // ======================
  // KITS WHATSAPP + HOVER
  // ======================
  const kits = document.querySelectorAll(".kit-card");
  kits.forEach(kit => {
    kit.addEventListener("click", () => {
      const nombre = encodeURIComponent(kit.dataset.kit || kit.querySelector("h3").innerText);
      const url = `https://wa.me/573155704875?text=Hola,%20quiero%20información%20sobre%20el%20${nombre}`;
      window.open(url, "_blank");
    });
  });
});












