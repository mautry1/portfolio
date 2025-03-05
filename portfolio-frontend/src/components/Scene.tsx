import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const CrystalLattice = () => {
  const latticeRef = useRef<THREE.LineSegments>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  // Create the lattice geometry
  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const gridSize = 20; // 20x20 grid
    const spacing = 1; // Distance between points

    // Generate hexagonal lattice points
    for (let y = -gridSize / 2; y <= gridSize / 2; y++) {
      for (let x = -gridSize / 2; x <= gridSize / 2; x++) {
        const offset = y % 2 === 0 ? 0 : spacing / 2; // Hexagonal offset
        const baseX = (x + offset) * spacing;
        const baseY = y * (spacing * Math.sqrt(3)) / 2;
        const baseZ = 0;

        // Connect to right neighbor (if exists)
        if (x < gridSize / 2) {
          positions.push(baseX, baseY, baseZ);
          positions.push(baseX + spacing, baseY, baseZ);
        }

        // Connect to bottom-right neighbor (if exists)
        if (x < gridSize / 2 && y < gridSize / 2) {
          positions.push(baseX, baseY, baseZ);
          positions.push(baseX + spacing / 2, baseY + (spacing * Math.sqrt(3)) / 2, baseZ);
        }

        // Connect to bottom-left neighbor (if exists)
        if (x > -gridSize / 2 && y < gridSize / 2) {
          positions.push(baseX, baseY, baseZ);
          positions.push(baseX - spacing / 2, baseY + (spacing * Math.sqrt(3)) / 2, baseZ);
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    if (latticeRef.current) {
      latticeRef.current.geometry = geometry;
    }
  }, []);

  // Animate and deform lattice
  useFrame(({ clock }) => {
    const positions = latticeRef.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const baseZ = Math.sin(time + x * 0.1 + y * 0.1) * 0.5; // Subtle drift

      // Calculate cursor influence
      const dx = mouse.current.x - x;
      const dy = mouse.current.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.min(2 / (distance + 0.1), 5); // Max influence capped

      // Apply 3D warp toward cursor
      positions[i + 2] = baseZ - influence;
    }

    latticeRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coords to [-10, 10] range matching lattice scale
      mouse.current.x = (event.clientX / window.innerWidth) * 20 - 10;
      mouse.current.y = -(event.clientY / window.innerHeight) * 20 + 10;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <lineSegments ref={latticeRef}>
      <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
    </lineSegments>
  );
};

const Scene = () => {
  return (
    <Canvas
      className="fixed top-0 left-0 w-full h-full -z-10"
      camera={{ position: [0, 0, 10], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <CrystalLattice />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default Scene;