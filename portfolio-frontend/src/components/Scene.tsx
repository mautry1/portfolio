import { useEffect, useRef } from 'react';

const Scene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<{ cx: number; cy: number }>({ cx: 0, cy: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Grid parameters
    const gridCols = 20;
    const gridRows = 20;
    const stepX = width / gridCols;
    const stepY = height / gridRows;

    // Initialize spheres
    const numSpheres = 5;
    const spheres = Array.from({ length: numSpheres }, () => {
      const radius = 10 + Math.random() * 20; // Radius between 10 and 30
      return {
        sx: Math.random() * width, // x-position
        sy: Math.random() * height, // y-position
        vx: (Math.random() - 0.5) * 2, // x-velocity
        vy: (Math.random() - 0.5) * 2, // y-velocity
        radius,
        G: radius * 10, // Gravitational constant proportional to size
      };
    });

    // Constants
    const epsilon = 100; // Prevent division by zero
    const C = 10000; // Cursor gravitational constant
    const scale = 10; // Z-displacement scale
    const maxSpeed = 5; // Maximum sphere speed

    const draw = () => {
      context.clearRect(0, 0, width, height);

      // Set styles
      context.strokeStyle = 'rgba(255,255,255,0.3)';
      context.fillStyle = 'rgba(255,255,255,0.5)';

      // Draw horizontal grid lines
      for (let j = 0; j <= gridRows; j++) {
        context.beginPath();
        for (let i = 0; i <= gridCols; i++) {
          const x = i * stepX;
          const y = j * stepY;
          const z = calculateZ(x, y);
          const screenY = y - z * scale; // Negative z moves points down
          i === 0 ? context.moveTo(x, screenY) : context.lineTo(x, screenY);
        }
        context.stroke();
      }

      // Draw vertical grid lines
      for (let i = 0; i <= gridCols; i++) {
        context.beginPath();
        for (let j = 0; j <= gridRows; j++) {
          const x = i * stepX;
          const y = j * stepY;
          const z = calculateZ(x, y);
          const screenY = y - z * scale;
          j === 0 ? context.moveTo(x, screenY) : context.lineTo(x, screenY);
        }
        context.stroke();
      }

      // Draw spheres
      spheres.forEach(sphere => {
        context.beginPath();
        context.arc(sphere.sx, sphere.sy, sphere.radius, 0, 2 * Math.PI);
        context.fill();
      });
    };

    const update = () => {
      spheres.forEach(sphere => {
        const { cx, cy } = cursorRef.current;
        const dx = cx - sphere.sx;
        const dy = cy - sphere.sy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply attraction from cursor
        if (distance > 0) {
          const force = C / (distance * distance * distance + epsilon);
          sphere.vx += dx * force;
          sphere.vy += dy * force;
        }

        // Clamp speed
        const speed = Math.sqrt(sphere.vx * sphere.vx + sphere.vy * sphere.vy);
        if (speed > maxSpeed) {
          sphere.vx = (sphere.vx / speed) * maxSpeed;
          sphere.vy = (sphere.vy / speed) * maxSpeed;
        }

        // Update position
        sphere.sx += sphere.vx;
        sphere.sy += sphere.vy;

        // Bounce off edges
        if (sphere.sx < 0 || sphere.sx > width) {
          sphere.vx = -sphere.vx;
          sphere.sx = Math.max(0, Math.min(width, sphere.sx));
        }
        if (sphere.sy < 0 || sphere.sy > height) {
          sphere.vy = -sphere.vy;
          sphere.sy = Math.max(0, Math.min(height, sphere.sy));
        }
      });
    };

    const calculateZ = (x: number, y: number): number => {
      let z = 0;
      // Influence from spheres
      spheres.forEach(sphere => {
        const dx = x - sphere.sx;
        const dy = y - sphere.sy;
        const distanceSq = dx * dx + dy * dy;
        z -= sphere.G / (distanceSq + epsilon);
      });
      // Influence from cursor
      const { cx, cy } = cursorRef.current;
      const dxCursor = x - cx;
      const dyCursor = y - cy;
      const distanceCursorSq = dxCursor * dxCursor + dyCursor * dyCursor;
      z -= C / (distanceCursorSq + epsilon);
      return z;
    };

    // Animation loop
    let animationFrameId: number;
    const animationLoop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(animationLoop);
    };
    animationFrameId = requestAnimationFrame(animationLoop);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.cx = e.clientX;
      cursorRef.current.cy = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="gravity-background" />;
};

export default Scene;