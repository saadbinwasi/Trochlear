import React, { useEffect, useRef } from 'react';

function rand(min, max) { return Math.random() * (max - min) + min; }

const CosmicBackground = ({ opacity = 0.8 }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const numParticles = Math.floor((width * height) / 22000); // density-based
    const center = { x: width / 2, y: height / 2 };

    // spawn particles in a disk
    particlesRef.current = Array.from({ length: prefersReduced ? 0 : Math.max(80, numParticles) }).map(() => {
      const radius = rand(40, Math.min(width, height) * 0.55);
      const angle = rand(0, Math.PI * 2);
      return {
        r: radius,
        a: angle,
        speed: rand(0.0008, 0.0024) * (Math.random() < 0.5 ? 1 : -1),
        size: rand(0.6, 1.8),
        hue: rand(40, 48),
        alpha: rand(0.15, 0.55),
      };
    });

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      // vignette background
      const g = ctx.createRadialGradient(center.x, center.y, 20, center.x, center.y, Math.max(width, height));
      g.addColorStop(0, 'rgba(0,0,0,0.0)');
      g.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // subtle swirling field lines
      particlesRef.current.forEach(p => {
        p.a += p.speed;
        // slight inward pull to simulate gravity
        p.r *= 0.9995;
        const x = center.x + Math.cos(p.a + Math.sin(t * 0.002) * 0.6) * p.r;
        const y = center.y + Math.sin(p.a + Math.cos(t * 0.002) * 0.6) * p.r;

        ctx.globalAlpha = p.alpha * opacity;
        ctx.fillStyle = `hsl(${p.hue}, 40%, 60%)`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // event horizon glow
      ctx.globalAlpha = 0.25 * opacity;
      ctx.beginPath();
      ctx.arc(center.x, center.y, Math.max(24, Math.min(width, height) * 0.12), 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(204,154,62,0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [opacity]);

  return (
    <canvas ref={canvasRef} className="fx-canvas" aria-hidden="true" />
  );
};

export default CosmicBackground; 