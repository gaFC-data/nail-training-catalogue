document.addEventListener('DOMContentLoaded', () => {
  // ======================
  // CARRUSEL FALLBACK HERO
  // ======================
  const video = document.getElementById('hero-video');
  const carousel = document.getElementById('fallback-carousel');
  const images = carousel ? carousel.querySelectorAll('img') : [];
  let current = 0;
  let carouselInterval;
  let carouselActivated = false;

  if (images.length && carousel) {
    // Inicializa todas las imágenes ocultas y en posición absoluta
    images.forEach(img => {
      img.style.opacity = 0;
      img.style.position = 'absolute';
      img.style.top = 0;
      img.style.left = 0;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.transition = 'opacity 1s ease-in-out';
    });

    function showNextImage() {
      images.forEach((img, idx) => {
        img.style.opacity = (idx === current) ? 1 : 0;
      });
      current = (current + 1) % images.length;
    }

    function activateCarousel() {
      if (carouselActivated) return;
      carouselActivated = true;

      if (video) video.style.display = 'none';
      carousel.style.display = 'block';

      showNextImage();
      carouselInterval = setInterval(showNextImage, 3000);
    }

    if (video) {
      video.addEventListener('error', activateCarousel);
      video.addEventListener('stalled', activateCarousel);

      // Si después de 2s el video no está listo, activar carrusel
      setTimeout(() => {
        if (video.readyState < 3) activateCarousel();
      }, 2000);
    }
  }

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
      constructionBanner.classList.toggle("show", visible);
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
    }, 90);
  }

  // ======================
  // CARRUSEL CAPACITACIONES
  // ======================
  const capCarousel = document.querySelector(".carousel");
  const items = Array.from(document.querySelectorAll(".carousel-item"));
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let index = 0;
  let interval;

  if (items.length && capCarousel) {
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
      index = (index + 1) % items.length;
      capCarousel.style.transition = 'transform 0.5s ease';
      updateCarousel();
    }

    function prevSlide() {
      index = (index - 1 + items.length) % items.length;
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
        const url = `https://wa.me/573153161525?text=Hola,%20quiero%20información%20sobre%20el%20curso%20de%20${curso}`;
        window.open(url, "_blank");
      });
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  }

  // ======================
  // KITS WHATSAPP + HOVER
  // ======================
  const kits = document.querySelectorAll(".kit-card");
  kits.forEach(kit => {
    kit.addEventListener("click", () => {
      const nombre = encodeURIComponent(kit.dataset.kit || kit.querySelector("h3").innerText);
      const url = `https://wa.me/573153161525?text=Hola,%20quiero%20información%20sobre%20el%20${nombre}`;
      window.open(url, "_blank");
    });
  });
});
// =======================
// MODAL CERTIFICACIONES
// =======================
const modalCert = document.getElementById("imgModal");
const modalCertImg = document.getElementById("modalImg");
const closeCertBtn = modalCert.querySelector(".modal-close");

document.querySelectorAll(".cert-img img").forEach(img => {
  img.addEventListener("click", () => {
    modalCert.classList.add("active");
    modalCertImg.src = img.getAttribute("src");
  });
});

closeCertBtn.onclick = () => modalCert.classList.remove("active");
modalCert.onclick = e => {
  if (e.target === modalCert) modalCert.classList.remove("active");
};

// =======================
// CARRUSEL MODULOS
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".modulo-slide");
  let currentSlide = 0;
  const intervalTime = 5000;
  let slideInterval = setInterval(nextSlide, intervalTime);

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      slide.style.pointerEvents = "none"; // Desactiva clics en los no visibles
      if (i === index) {
        slide.classList.add("active");
        slide.style.pointerEvents = "auto"; // Solo el visible será clickeable
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  document.getElementById("nextModulo").addEventListener("click", () => { 
    nextSlide(); 
    resetInterval(); 
  });

  document.getElementById("prevModulo").addEventListener("click", () => { 
    prevSlide(); 
    resetInterval(); 
  });

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // =======================
  // REDIRECCIÓN A WHATSAPP
  // =======================
  const whatsappNumber = "573153161525"; 

  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      if (!slide.classList.contains("active")) return; // Evita clics en ocultos
      const moduloName = slide.querySelector("h3").innerText;
      const message = `Hola, estoy interesado(a) en obtener información sobre ${moduloName} del programa LeidyArt.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappLink, "_blank");
    });
  });
});

// =======================
// REDIRECCIÓN CAPACITACIONES VIRTUALES
// =======================
const virtualCards = document.querySelectorAll(".virtual-card");
const whatsappNumber = "573153161525"; // Reemplaza con tu número

virtualCards.forEach((card) => {
  card.addEventListener("click", () => {
    const cursoName = card.dataset.curso;
    const message = `Hola, estoy interesado(a) en obtener información sobre ${cursoName} de LeidyArt (Capacitaciones Virtuales).`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  });
});

// Controles de video
const video = document.getElementById('hero-video');
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");

// Inicia en silencio para que autoplay funcione
video.muted = true;

// Botón reproducir / pausar
playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "⏸"; // cambia ícono a pausar
  } else {
    video.pause();
    playPauseBtn.textContent = "▶️"; // cambia ícono a reproducir
  }
});

// Botón silenciar / activar sonido
muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "🔇" : "🔊";
});



