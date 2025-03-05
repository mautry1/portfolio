import { motion } from 'framer-motion';
import { EnvelopeIcon, GlobeAltIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Scene from "../components/Scene";

const Contact = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Scene /> {/* Needle background */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect p-8 rounded-3xl backdrop-blur-xl w-full max-w-2xl mx-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">
          Let's Connect
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <form className="space-y-6">
            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:shadow-xl transition-all"
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
                className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg border border-white/10"
              >
                <item.icon className="h-6 w-6 text-purple-400" />
                <span className="text-gray-200">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;