import { useEffect, useRef } from 'react';

interface Prism {
  element: HTMLDivElement;
  baseX: number;
  baseY: number;
  depth: number;
}

const Scene = () => {
  const prismContainerRef = useRef<HTMLDivElement>(null);
  const prismsRef = useRef<Prism[]>([]);

  useEffect(() => {
    const numPrisms = 30; // Number of prisms (adjustable for performance)
    const prismSize = 50; // Width and height of each prism in pixels

    // Create prisms and position them randomly
    for (let i = 0; i < numPrisms; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const depth = Math.random() * 200 - 100; // Depth between -100 and 100px

      const prism = document.createElement('div');
      prism.className = 'prism';
      // Center the prism at (x, y) by offsetting half its size
      prism.style.left = `${x - prismSize / 2}px`;
      prism.style.top = `${y - prismSize / 2}px`;
      prism.style.width = `${prismSize}px`;
      prism.style.height = `${prismSize}px`;
      // Set initial 3D position
      prism.style.transform = `translateZ(${depth}px)`;

      if (prismContainerRef.current) {
        prismContainerRef.current.appendChild(prism);
      }
      prismsRef.current.push({ element: prism, baseX: x, baseY: y, depth });
    }

    // Handle cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      const cursorX = e.clientX;
      const cursorY = e.clientY;
      prismsRef.current.forEach(({ element, baseX, baseY, depth }) => {
        // Calculate tilt based on cursor position
        const dx = cursorX - baseX;
        const dy = cursorY - baseY;
        const rotateY = (dx / window.innerWidth) * 90; // Max 90° tilt on Y-axis
        const rotateX = -(dy / window.innerHeight) * 90; // Max 90° tilt on X-axis, inverted
        const gradientAngle = (rotateY + 45) % 360; // Gradient shifts with rotation

        // Apply 3D transform and gradient
        element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${depth}px)`;
        element.style.background = `linear-gradient(${gradientAngle}deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3))`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      prismsRef.current.forEach(({ element }) => element.remove());
      prismsRef.current = [];
    };
  }, []);

  return <div ref={prismContainerRef} className="prism-background" />;
};

export default Scene;