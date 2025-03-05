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
      const radius = 10 + Math.random() * 20;
      return {
        sx: Math.random() * width,
        sy: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius,
        G: radius * 10,
      };
    });

    // Constants
    const epsilon = 100;
    const C = 5000;
    const scale = 10;
    const maxSpeed = 5;

    const draw = () => {
      context.clearRect(0, 0, width, height);

      // Set styles
      context.strokeStyle = 'rgba(255,255,255,0.3)';
      context.fillStyle = 'rgba(255,255,255,0.5)';

      // Draw horizontal grid lines
      for (let j = 0; j <= gridRows; j++) {
        const points = [];
        for (let i = 0; i <= gridCols; i++) {
          const x = i * stepX;
          const y = j * stepY;
          const z = calculateZ(x, y);
          const screenY = y - z * scale;
          points.push({ x, y: screenY });
        }
        drawSpline(context, points);
      }

      // Draw vertical grid lines
      for (let i = 0; i <= gridCols; i++) {
        const points = [];
        for (let j = 0; j <= gridRows; j++) {
          const x = i * stepX;
          const y = j * stepY;
          const z = calculateZ(x, y);
          const screenY = y - z * scale;
          points.push({ x, y: screenY });
        }
        drawSpline(context, points);
      }

      // Draw spheres
      spheres.forEach(sphere => {
        context.beginPath();
        context.arc(sphere.sx, sphere.sy, sphere.radius, 0, 2 * Math.PI);
        context.fill();
      });
    };

    const drawSpline = (ctx: CanvasRenderingContext2D, points: { x: number; y: number }[]) => {
      if (points.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = i === 0 ? points[0] : points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i + 2 < points.length ? points[i + 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
      ctx.stroke();
    };

    const update = () => {
      spheres.forEach(sphere => {
        const { cx, cy } = cursorRef.current;
        const dx = cx - sphere.sx;
        const dy = cy - sphere.sy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          const force = C / (distance * distance * distance + epsilon);
          sphere.vx += dx * force;
          sphere.vy += dy * force;
        }

        const speed = Math.sqrt(sphere.vx * sphere.vx + sphere.vy * sphere.vy);
        if (speed > maxSpeed) {
          sphere.vx = (sphere.vx / speed) * maxSpeed;
          sphere.vy = (sphere.vy / speed) * maxSpeed;
        }

        sphere.sx += sphere.vx;
        sphere.sy += sphere.vy;

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
      spheres.forEach(sphere => {
        const dx = x - sphere.sx;
        const dy = y - sphere.sy;
        const distanceSq = dx * dx + dy * dy;
        z -= sphere.G / (distanceSq + epsilon);
      });
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