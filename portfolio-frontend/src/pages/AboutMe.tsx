import { motion } from 'framer-motion';
import Scene from '../components/Scene';

const AboutMe = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Scene />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-effect p-8 rounded-3xl w-full max-w-3xl mx-4 text-gray-900 dark:text-gray-100"
      >
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          About Me
        </h1>
        <p className="mb-4">
          Hi, I’m Micah Autry, a passionate biker and computer science student based in Draper, Utah. I’m currently pursuing a Bachelor of Computer Science at Colorado Christian University (expected graduation: December 2027) after graduating with a 4.0 GPA from Intermountain Christian School in 2024.
        </p>
        <p className="mb-4">
          I love racing mountain bikes—whether it’s XC, Enduro, Gravel, or Road—and I’m deeply connected to the biking community. As a NICA MTB coach in 2024, I guided varsity and JVA riders, and I volunteer with Free Bikes For Kids to fix up bikes for kids in Salt Lake. Beyond biking, I enjoy snowboarding, soccer, cross-country running, and programming.
        </p>
        <p className="mb-4">
          With a strong work ethic and skills in bike maintenance, electrical assembly (from my job at SANS), and organization, I value integrity, hard work, and having fun. I’m also active in my community—mowing lawns for Grace Community Bible Church, helping at the Rescue Mission, and leading worship.
        </p>
        <p className="mb-8">
          Awards like National Honors Society and Utah Academic All State reflect my dedication, and I’m excited to keep growing, learning, and encouraging others along the way!
        </p>

        {/* Download Resume Button */}
        <motion.a
          href="/resume.pdf" // Update with your resume path
          download="Micah_Autry_Resume.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Download Resume
        </motion.a>
      </motion.div>
    </div>
  );
};

export default AboutMe;