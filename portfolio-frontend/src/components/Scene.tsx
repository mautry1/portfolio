import { useEffect, useRef } from 'react';

// Define the structure of each needle object
interface Needle {
  element: HTMLDivElement;
  baseX: number;
  baseY: number;
}

const Scene = () => {
  // Type the ref for the container div
  const needleContainerRef = useRef<HTMLDivElement>(null);
  // Type the ref for the array of needles
  const needlesRef = useRef<Needle[]>([]);

  useEffect(() => {
    const numNeedles = 100;
    const angleIncrement = (2 * Math.PI) / numNeedles;
    const radius = 300;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Create and position needles
    for (let i = 0; i < numNeedles; i++) {
      const angle = i * angleIncrement;
      const baseX = centerX + radius * Math.cos(angle);
      const baseY = centerY + radius * Math.sin(angle);
      const needle = document.createElement('div');
      needle.className = 'needle';
      needle.style.left = `${baseX}px`;
      needle.style.top = `${baseY}px`;
      // Null check before appending
      if (needleContainerRef.current) {
        needleContainerRef.current.appendChild(needle);
      }
      needlesRef.current.push({ element: needle, baseX, baseY });
    }

    // Handle mouse movement with typed event
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

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      needlesRef.current.forEach(({ element }) => element.remove());
      needlesRef.current = []; // Reset the array
    };
  }, []); // Empty dependency array since this runs once on mount

  return <div ref={needleContainerRef} className="needle-background"></div>;
};

export default Scene;