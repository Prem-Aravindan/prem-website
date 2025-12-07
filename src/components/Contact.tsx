import { motion } from 'framer-motion';
import { MailIcon, LinkedInIcon, InstagramIcon } from './ui/icons';

const contactLinks = [
  {
    icon: MailIcon,
    title: "Email",
    value: "premaravindanj@gmail.com",
    display: "premaravindanj@gmail.com",
    href: "mailto:premaravindanj@gmail.com",
    external: false
  },
  {
    icon: LinkedInIcon,
    title: "LinkedIn",
    value: "prem-aravindan",
    display: "/in/prem-aravindan",
    href: "https://linkedin.com/in/prem-aravindan",
    external: true
  },
  {
    icon: InstagramIcon,
    title: "Instagram",
    value: "@prem_jpa",
    display: "@prem_jpa",
    href: "https://instagram.com/prem_jpa",
    external: true
  }
];

export default function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4">
      <div className="w-full px-2 sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Get In Touch
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-white/0 via-white/60 to-white/0 mx-auto rounded-full mb-4" />
          <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-lg mx-auto px-2">
            Open to discussing new projects, research collaborations, or opportunities in healthcare technology.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {contactLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 hover:border-white/30 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
              
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex flex-col items-center text-center">
                {/* Icon with animated ring */}
                <div className="relative mb-3 sm:mb-4">
                  <div className="absolute inset-0 rounded-full bg-white/10 scale-150 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                  <div className="relative w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-300">
                    <link.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                
                <h3 className="text-xs sm:text-sm font-semibold text-white mb-1">{link.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 break-all">
                  {link.display}
                </p>
                
                {/* Arrow indicator */}
                <motion.div 
                  className="mt-2 sm:mt-3 text-white/40 group-hover:text-white/80 transition-colors duration-300"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 border border-white/10 p-5 sm:p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
              Let's Build Something Amazing
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mb-4 sm:mb-6 px-2">
              Whether you have a project in mind or just want to chat about healthcare innovation, I'd love to hear from you.
            </p>
            <motion.a
              href="mailto:premaravindanj@gmail.com"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <MailIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              Send a Message
            </motion.a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-[10px] sm:text-xs text-gray-500">
            © {new Date().getFullYear()} Prem Aravindan Jeyakumar. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600 mt-1">
            Built with React, TypeScript, Tailwind CSS & Vite
          </p>
        </motion.div>
      </div>
    </section>
  );
}
