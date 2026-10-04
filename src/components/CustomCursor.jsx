import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const pointsRef = useRef([]); // trail history: {x, y, age}

  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!supportsHover.matches) return;

    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !canvas) return;

    const ctx = canvas.getContext('2d');
    let rafId;

    const MAX_POINTS = prefersReducedMotion.matches ? 0 : 25;
    const POINT_LIFE = 32;
    const LINE_WIDTH = 1.5;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      cursor.style.opacity = '1';

      if (MAX_POINTS > 0) {
        pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
        if (pointsRef.current.length > MAX_POINTS) {
          pointsRef.current.shift();
        }
      }
    };

    const handleMouseDown = () => cursor.classList.add('is-click');
    const handleMouseUp = () => cursor.classList.remove('is-click');
    const handleWindowLeave = () => {
      cursor.style.opacity = '0';
      cursor.classList.remove('is-hover', 'is-click');
      pointsRef.current.length = 0;
    };
    const handleWindowEnter = () => (cursor.style.opacity = '1');

    const hoverTargets = 'a, button, .btn-primary, .btn-secondary, [data-cursor-hover]';
    const handlePointerOver = (e) => {
      if (e.target.closest(hoverTargets)) cursor.classList.add('is-hover');
    };
    const handlePointerOut = (e) => {
      const nextTarget = e.relatedTarget;
      if (!nextTarget || !nextTarget.closest?.(hoverTargets)) cursor.classList.remove('is-hover');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('blur', handleWindowLeave);
    document.addEventListener('mouseleave', handleWindowLeave);
    document.addEventListener('mouseenter', handleWindowEnter);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;

      // age points, drop dead ones
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += 1;
        if (points[i].age > POINT_LIFE) points.splice(i, 1);
      }

      if (points.length > 1) {
        const tail = points[0];
        const head = points[points.length - 1];

        const gradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        gradient.addColorStop(0, 'rgba(136, 136, 136, 0)');
        gradient.addColorStop(1, 'rgba(136, 136, 136, 0.8)');

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const midX = (points[i].x + points[i + 1].x) / 2;
          const midY = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }
        ctx.lineTo(head.x, head.y);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = LINE_WIDTH;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('blur', handleWindowLeave);
      document.removeEventListener('mouseleave', handleWindowLeave);
      document.removeEventListener('mouseenter', handleWindowEnter);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="custom-cursor-trail" />
      <div className="custom-cursor" ref={cursorRef}>
        <div className="custom-cursor-dot"></div>
      </div>
    </>
  );
}