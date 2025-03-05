import { useEffect, useRef } from 'react';

interface Needle {
  element: HTMLDivElement;
  baseX: number;
  baseY: number;
}

const Scene = () => {
  const needleContainerRef = useRef<HTMLDivElement>(null);
  const needlesRef = useRef<Needle[]>([]);

  useEffect(() => {
    const numNeedles = 20; // Reduced from 100
    const angleIncrement = (2 * Math.PI) / numNeedles;
    const radius = 200; // Slightly reduced for balance
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const needleHeight = 20; // Shorter needles

    for (let i = 0; i < numNeedles; i++) {
      const angle = i * angleIncrement;
      const baseX = centerX + radius * Math.cos(angle);
      const baseY = centerY + radius * Math.sin(angle);
      const needle = document.createElement('div');
      needle.className = 'needle';
      needle.style.left = `${baseX}px`;
      needle.style.top = `${baseY}px`;
      needle.style.height = `${needleHeight}px`; // Apply shorter height
      if (needleContainerRef.current) {
        needleContainerRef.current.appendChild(needle);
      }
      needlesRef.current.push({ element: needle, baseX, baseY });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const cursorX = e.clientX;
      const cursorY = e.clientY;
      needlesRef.current.forEach(({ element, baseX, baseY }) => {
        const dx = cursorX - baseX;
        const dy = cursorY - baseY;
        const angle = Math.atan2(dy, dx);
        element.style.transform = `rotate(${angle}rad)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      needlesRef.current.forEach(({ element }) => element.remove());
      needlesRef.current = [];
    };
  }, []);

  return <div ref={needleContainerRef} className="needle-background"></div>;
};

export default Scene;