import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleStreams = () => {
  const particlesRef = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0, z: 0 });

  // Initialize particles
  useEffect(() => {
    const numParticles = 75; // Adjustable for density
    const positions = new Float32Array(numParticles * 3);
    const velocities = new Float32Array(numParticles * 3);

    // Random initial positions and velocities
    for (let i = 0; i < numParticles; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // x: -10 to 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y: -10 to 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z: -5 to 5
      velocities[i * 3] = (Math.random() - 0.5) * 0.05; // vx
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05; // vy
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02; // vz
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    if (particlesRef.current) {
      particlesRef.current.geometry = geometry;
    }
  }, []);

  // Animate particles and apply cursor influence
  useFrame(({ clock }) => {
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Natural drift with slight noise
      velocities[i] += Math.sin(time + x * 0.1) * 0.001;
      velocities[i + 1] += Math.cos(time + y * 0.1) * 0.001;
      velocities[i + 2] += Math.sin(time + z * 0.1) * 0.0005;

      // Cursor influence
      const dx = mouse.current.x - x;
      const dy = mouse.current.y - y;
      const dz = mouse.current.z - z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const force = Math.min(0.1 / (distance + 0.1), 0.05); // Gentle attraction

      velocities[i] += dx * force;
      velocities[i + 1] += dy * force;
      velocities[i + 2] += dz * force;

      // Update positions
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];

      // Wrap around edges (optional for continuous flow)
      if (positions[i] > 10) positions[i] = -10;
      if (positions[i] < -10) positions[i] = 10;
      if (positions[i + 1] > 10) positions[i + 1] = -10;
      if (positions[i + 1] < -10) positions[i + 1] = 10;
      if (positions[i + 2] > 5) positions[i + 2] = -5;
      if (positions[i + 2] < -5) positions[i + 2] = 5;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 20 - 10; // -10 to 10
      mouse.current.y = -(event.clientY / window.innerHeight) * 20 + 10; // -10 to 10
      mouse.current.z = 0; // Fixed z-plane for simplicity
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <points ref={particlesRef}>
      <pointsMaterial
        color="#ffffff"
        size={0.1}
        opacity={0.3}
        transparent
        blending={THREE.AdditiveBlending} // For a glowing effect
      />
    </points>
  );
};

const Scene = () => {
  return (
    <Canvas
      className="fixed top-0 left-0 w-full h-full -z-10"
      camera={{ position: [0, 0, 10], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <ParticleStreams />
    </Canvas>
  );
};

export default Scene;