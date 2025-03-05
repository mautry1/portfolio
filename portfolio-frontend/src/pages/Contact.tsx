import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Scene from "../components/Scene";
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [notification, setNotification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isValidEmail = (email: string) => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Enhanced validation
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
      setNotification('All fields are required');
      setIsSubmitting(false);
      return;
    }
  
    if (formData.message.length < 10) {
      setNotification('Message must be at least 10 characters');
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }
  
      setNotification('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      let errorMessage = 'Failed to send message';
      
      // Type-safe error handling
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setNotification(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {notification && (
          <div className={`mb-4 p-3 rounded-lg ${notification.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-blue-600 rounded-lg font-semibold text-white hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>

          {/* Rest of the contact info remains the same */}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;