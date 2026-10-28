(() => {
  const header = document.querySelector('.header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  const heroVideo = document.querySelector('.hero-video');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (heroVideo) {
    const updateVideoMotion = () => {
      heroVideo.autoplay = !motionPreference.matches;
      if (motionPreference.matches) heroVideo.pause();
      else heroVideo.play().catch(() => {});
    };
    updateVideoMotion();
    motionPreference.addEventListener('change', updateVideoMotion);
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('revealing');
      entry.target.addEventListener('animationend', () => entry.target.classList.remove('revealing'), { once: true });
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.offer, .service, .personal').forEach(element => observer.observe(element));
})();
