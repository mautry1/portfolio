import { motion } from 'framer-motion';
import { CodeBracketIcon, CommandLineIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import Scene from "../components/Scene";

const Home = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Scene /> {/* Needle background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-effect p-8 rounded-3xl backdrop-blur-xl"
        >
          <div className="text-center space-y-8">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Creative Developer
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Building immersive digital experiences with cutting-edge technology 
              and pixel-perfect design.
            </motion.p>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: CodeBracketIcon, title: 'Full-Stack', delay: 0.2 },
              { icon: CommandLineIcon, title: 'DevOps', delay: 0.4 },
              { icon: CpuChipIcon, title: 'AI/ML', delay: 0.6 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: item.delay
                }}
                className="glass-effect p-6 rounded-xl text-center hover:bg-white/5 transition-colors"
              >
                <item.icon className="h-12 w-12 mx-auto text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-100">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;