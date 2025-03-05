import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';

const Scene = () => (
  <Canvas className="fixed top-0 left-0 w-full h-full -z-10">
    <ambientLight intensity={0.5} />
    <Stars 
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0} 
      fade 
    />
    <OrbitControls enableZoom={false} />
  </Canvas>
);

export default Scene;