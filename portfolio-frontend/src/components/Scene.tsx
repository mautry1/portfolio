import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleStreams = () => {
  const particlesRef = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0, z: 0 });
  const numParticles = 2000; // Increased for ethereal density
  const positions = new Float32Array(numParticles * 3);
  const velocities = new Float32Array(numParticles * 3);

  // Initialize particles with flowing distribution
  useEffect(() => {
    const aspect = window.innerWidth / window.innerHeight;

    for (let i = 0; i < numParticles; i++) {
      // Create streaming bands of particles
      const angle = (i * 0.02) % (Math.PI * 2);
      
      positions[i * 3] = (Math.random() - 0.5) * aspect * 20; // X-axis
      positions[i * 3 + 1] = (Math.cos(angle) * 10 - 15); // y (flowing downward)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z-depth

      // Base velocity for streaming flow
      velocities[i * 3] = Math.sin(angle) * 0.02;
      velocities[i * 3 + 1] = -0.04; // Downward current
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    particlesRef.current.geometry = geometry;
  }, []);

  useFrame(({ clock }) => {
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < numParticles; i++) {
      const i3 = i * 3;
      
      // Natural flow patterns with Perlin-like noise
      const flowDirection = new THREE.Vector3(
        Math.sin(time * 0.3 + i * 0.0001) * 0.02,
        Math.cos(time * 0.2 + i * 0.0002) * 0.01,
        Math.sin(time * 0.4 + i * 0.0003) * 0.005
      );

      // Cursor influence (gentle vortex)
      const dx = mouse.current.x - positions[i3];
      const dy = mouse.current.y - positions[i3 + 1];
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.min(0.5 / (distance * distance + 0.1), 0.2);

      velocities[i3] += (dx * 0.02 + flowDirection.x) * influence;
      velocities[i3 + 1] += (dy * 0.02 + flowDirection.y) * influence;
      velocities[i3 + 2] += flowDirection.z;

      // Update positions with velocity damping
      positions[i3] += velocities[i3] *= 0.99;
      positions[i3 + 1] += velocities[i3 + 1] *= 0.99;
      positions[i3 + 2] += velocities[i3 + 2] *= 0.99;

      // Seamless wrapping with depth variation
      if (positions[i3] > 25) positions[i3] = -25;
      if (positions[i3] < -25) positions[i3] = 25;
      if (positions[i3 + 1] > 15) positions[i3 + 1] = -15;
      if (positions[i3 + 1] < -15) positions[i3 + 1] = 15;
      if (positions[i3 + 2] > 10) positions[i3 + 2] = -10;
      if (positions[i3 + 2] < -10) positions[i3 + 2] = 10;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 30 - 15;
      mouse.current.y = -(event.clientY / window.innerHeight) * 20 + 10;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <points ref={particlesRef}>
      <pointsMaterial
        size={0.1}
        transparent
        blending={THREE.AdditiveBlending}
        color={new THREE.Color(0.7, 0.8, 1.0)} // Pale blue cosmic hue
        opacity={0.4}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
};

const Scene = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 1],
        fov: 100,
        near: 0.1,
        far: 1000
      }}
    >
      <ambientLight intensity={0.25} />
      <ParticleStreams />
    </Canvas>
  );
};

export default Scene;