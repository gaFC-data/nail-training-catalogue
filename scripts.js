document.addEventListener('DOMContentLoaded', () => {
  // CARRUSEL FALLBACK
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

  // BANNER PROMOCIONAL
  const banner = document.getElementById('promo-banner');
  if (banner) {
    const now = new Date();
    const month = now.getMonth(); // 0=Enero
    const day = now.getDate();

    // Temporada Halloween: 30 agosto → 31 octubre
    if ((month === 7 && day >= 30) || month === 8 || (month === 9 && day <= 31)) {
      banner.innerHTML = "🎃 ¡Promo Halloween! Cursos con 20% OFF 👻";
      banner.style.display = "block";
    }
    // Temporada Navidad: 1 diciembre → 25 diciembre
    else if (month === 11 && day <= 25) {
      banner.innerHTML = "🎄 ¡Promo Navidad! Inscríbete y recibe un kit gratis 🎁";
      banner.style.display = "block";
    }

    // Botón cerrar
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '✖';
    closeBtn.style.cssText = 'margin-left:15px; cursor:pointer; font-weight:bold;';
    closeBtn.addEventListener('click', () => banner.style.display = 'none');
    banner.appendChild(closeBtn);
  }

  //Banner alerta

  const constructionBanner = document.getElementById("construction-banner");

if (constructionBanner) {
  let visible = false;

  setInterval(() => {
    visible = !visible;
    if (visible) {
      constructionBanner.classList.add("show"); // aparece
    } else {
      constructionBanner.classList.remove("show"); // desaparece
    }
  }, 5000); // cada 5 segundos
}

});
