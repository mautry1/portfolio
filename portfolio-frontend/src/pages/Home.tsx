import { motion } from 'framer-motion';
import Scene from '../components/Scene';
import { hero, skills, projects, education } from './data';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <Scene />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-effect p-8 rounded-3xl"
        >
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center">
            <img 
              src={hero.photo} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8 object-cover"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {hero.headline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mt-2">
                {hero.tagline}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill: { name: string; icon: React.ComponentType<any> }, index: number) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass-effect p-4 rounded-lg text-center"
              >
                <skill.icon className="h-12 w-12 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-gray-900 dark:text-gray-100">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: { title: string; description: string; link: string }, index: number) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className="glass-effect p-6 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Project
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-effect p-8 rounded-3xl"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Education
          </h2>
          <p className="text-xl text-gray-900 dark:text-gray-100">{education.university}</p>
          <p className="text-lg text-gray-700 dark:text-gray-300">{education.major}, {education.year}</p>
          <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">
            Relevant Courses
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {education.courses.map((course: string, index: number) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <a 
            href="/contact" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;