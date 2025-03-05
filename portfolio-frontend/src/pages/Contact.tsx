import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Scene from "../components/Scene";

const Contact = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Scene />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect p-8 rounded-3xl w-full max-w-2xl mx-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
          Let's Connect
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <form className="space-y-6">
            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-blue-600 rounded-lg font-semibold text-white hover:bg-blue-700 transition-all"
            >
              Send Message
            </motion.button>
          </form>

          <div className="space-y-6">
            {[
              { icon: EnvelopeIcon, text: 'micahautry2@gmail.com' },
              { icon: PhoneIcon, text: '+1 (801) 657-9153' },
              { icon: GlobeAltIcon, text: 'portfolio-site.com' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700"
              >
                <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-900 dark:text-gray-100">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;