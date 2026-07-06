/**
 * Subtle ambient particle canvas.
 * Lightweight: pauses when not visible and respects reduced motion.
 */

import { prefersReducedMotion } from '../../utils/dom.js';

export function AmbientCanvas() {
  const canvas = document.createElement('canvas');
  canvas.className = 'ambient-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let rafId = null;
  let running = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(36, Math.floor((canvas.width * canvas.height) / 35000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.25 + 0.05
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 213, 176, ${p.alpha})`;
      ctx.fill();
    });
    rafId = requestAnimationFrame(draw);
  }

  function start() {
    if (running || prefersReducedMotion()) return;
    running = true;
    resize();
    createParticles();
    draw();
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  start();

  return {
    container: canvas,
    destroy() {
      stop();
      canvas.remove();
    }
  };
}
