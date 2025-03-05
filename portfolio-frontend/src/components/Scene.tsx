import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WaterfallParticles = () => {
  const particlesRef = useRef<THREE.Points>(null!);
  const rocksRef = useRef<THREE.Mesh[]>([]);
  const mouse = useRef({ x: 0, y: 0, z: 0 });
  const numParticles = 5000; // Increased for cascading effect
  const numRocks = 4;
  const positions = new Float32Array(numParticles * 3);
  const velocities = new Float32Array(numParticles * 3);

  // Initialize particles and rocks
  useEffect(() => {
    const aspect = window.innerWidth / window.innerHeight;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      positions[i * 3] = (Math.random() - 0.5) * aspect * 20; // x
      positions[i * 3 + 1] = Math.random() * 20 - 10; // y: Spread across top
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
      velocities[i * 3] = (Math.random() - 0.5) * 0.02; // Slight x drift
      velocities[i * 3 + 1] = -0.15 - Math.random() * 0.05; // Continuous downward flow
      velocities[i * 3 + 2] = 0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    particlesRef.current.geometry = geometry;

    // Initialize rocks with DodecahedronGeometry
    rocksRef.current = Array.from({ length: numRocks }, () => {
      const radius = 0.5 + Math.random() * 0.5; // Size 0.5–1
      const rockGeometry = new THREE.DodecahedronGeometry(radius, 0); // Faceted shape
      const rock = new THREE.Mesh(
        rockGeometry,
        new THREE.MeshStandardMaterial({
          color: '#666666',
          roughness: 0.8,
          metalness: 0.2,
          transparent: true,
          opacity: 0.7,
        })
      );
      rock.position.set(
        (Math.random() - 0.5) * aspect * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5
      );
      rock.userData = { radius }; // Store radius
      return rock;
    });
  }, []);

  // Add rocks and lighting to scene
  useEffect(() => {
    const scene = particlesRef.current.parent;
    if (scene) {
      rocksRef.current.forEach(rock => scene.add(rock));
      const light = new THREE.PointLight(0xffffff, 0.5, 50);
      light.position.set(0, 5, 10);
      scene.add(light);
    }
    return () => {
      if (scene) {
        rocksRef.current.forEach(rock => scene.remove(rock));
        scene.children.forEach(child => {
          if (child instanceof THREE.PointLight) scene.remove(child);
        });
      }
    };
  }, []);

  // Animate particles
  useFrame(() => {
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;

    for (let i = 0; i < numParticles; i++) {
      const i3 = i * 3;
      let x = positions[i3];
      let y = positions[i3 + 1];
      let z = positions[i3 + 2];

      // Ensure continuous downward flow
      velocities[i3 + 1] = Math.max(velocities[i3 + 1], -0.15 - Math.random() * 0.05);

      // Rock avoidance
      rocksRef.current.forEach(rock => {
        const dx = x - rock.position.x;
        const dy = y - rock.position.y;
        const dz = z - rock.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const rockRadius = (rock.userData as { radius: number }).radius + 0.2;

        if (distance < rockRadius) {
          const force = (rockRadius - distance) * 0.1;
          const normalX = dx / distance || 0;
          const normalY = dy / distance || 0;
          const normalZ = dz / distance || 0;
          velocities[i3] += normalX * force;
          velocities[i3 + 1] += normalY * force;
          velocities[i3 + 2] += normalZ * force;
        }
      });

      // Cursor avoidance
      const dxMouse = x - mouse.current.x;
      const dyMouse = y - mouse.current.y;
      const dzMouse = z - mouse.current.z;
      const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse + dzMouse * dzMouse);
      const cursorRadius = 1.5;

      if (distanceMouse < cursorRadius) {
        const force = (cursorRadius - distanceMouse) * 0.05;
        const normalX = dxMouse / distanceMouse || 0;
        const normalY = dyMouse / distanceMouse || 0;
        const normalZ = dzMouse / distanceMouse || 0;
        velocities[i3] += normalX * force;
        velocities[i3 + 1] += normalY * force;
        velocities[i3 + 2] += normalZ * force;
      }

      // Update positions with reduced damping
      positions[i3] += velocities[i3] *= 0.995; // Slower damping
      positions[i3 + 1] += velocities[i3 + 1] *= 0.995;
      positions[i3 + 2] += velocities[i3 + 2] *= 0.995;

      // Reset to top for continuous flow
      if (positions[i3 + 1] < -10) {
        positions[i3] = (Math.random() - 0.5) * (window.innerWidth / window.innerHeight) * 20;
        positions[i3 + 1] = 10 + Math.random() * 5;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = -0.15 - Math.random() * 0.05;
        velocities[i3 + 2] = 0;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const aspect = window.innerWidth / window.innerHeight;
      mouse.current.x = (event.clientX / window.innerWidth) * aspect * 20 - (aspect * 10);
      mouse.current.y = -(event.clientY / window.innerHeight) * 20 + 10;
      mouse.current.z = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <points ref={particlesRef}>
      <pointsMaterial
        size={0.05}
        transparent
        blending={THREE.AdditiveBlending}
        color={new THREE.Color(0.5, 0.7, 1.0)}
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  );
};

const Scene = () => {
  return (
    <Canvas
      className="fixed top-0 left-0 w-full h-full -z-10"
      camera={{ position: [0, 0, 10], fov: 75, near: 0.1, far: 1000 }}
    >
      <ambientLight intensity={0.25} />
      <WaterfallParticles />
    </Canvas>
  );
};

export default Scene;