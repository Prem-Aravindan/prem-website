import { motion } from 'framer-motion';
import { TargetIcon, MapPinIcon, LanguageIcon, BadmintonIcon, GamepadIcon, BookIcon, MapIcon } from './ui/icons';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function About() {
  const languages = [
    { name: "English", level: "Professional" },
    { name: "Tamil", level: "Native" },
    { name: "Telugu", level: "Spoken" },
    { name: "Dutch", level: "Beginner" },
  ];

  const highlights = [
    { icon: TargetIcon, title: "Focus", description: "Healthcare technology, medical devices, and innovative diagnostic solutions." },
    { icon: MapPinIcon, title: "Location", description: "Indian by Nationality, living in Belgium." },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4">
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
            About Me
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-white/0 via-white/60 to-white/0 mx-auto rounded-full" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          {/* Left Column - Bio Text (3/5) */}
          <motion.div 
            className="lg:col-span-3 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative quote mark */}
              <span className="absolute -top-3 sm:-top-4 -left-1 sm:-left-2 text-4xl sm:text-6xl text-white/10 font-serif select-none">"</span>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed pl-4 sm:pl-6">
                Hi! I'm Prem Aravindan Jeyakumar, a biomedical engineer dedicated to advancing 
                healthcare technology and product development. My work bridges the gap between 
                engineering innovation and medical applications.
              </p>
            </div>
            
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              I specialize in developing cutting-edge solutions for medical diagnostics, 
              virtual reality training systems, and wearable health monitoring devices. 
              My expertise spans full-stack development, machine learning, and 3D visualization.
            </p>
            
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              With experience in both academic research and startup environments, I combine 
              rigorous scientific methodology with practical product development to create 
              impactful healthcare solutions.
            </p>

            {/* Highlight Cards */}
            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="group flex items-start sm:items-center gap-3 bg-white/5 backdrop-blur-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-full border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <item.icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div>
                    <span className="text-xs font-semibold text-white">{item.title}:</span>
                    <span className="text-xs text-gray-400 ml-1">{item.description}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Languages (2/5) */}
          <motion.div 
            className="lg:col-span-2 space-y-6 sm:space-y-8 flex flex-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Languages Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6">
              {/* Animated gradient orb */}
              <div className="absolute -top-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <LanguageIcon className="w-5 h-5 text-white/80" />
                  <h3 className="text-sm font-semibold text-white">Languages</h3>
                </div>
                
                <div className="space-y-3">
                  {languages.map((lang, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <span className="text-sm text-white">{lang.name}</span>
                      <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                        {lang.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div 
                className="text-center p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">2+</div>
                <div className="text-[10px] sm:text-xs text-gray-400">Years Experience</div>
              </motion.div>
              <motion.div 
                className="text-center p-4 sm:p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">10+</div>
                <div className="text-[10px] sm:text-xs text-gray-400">Projects Completed</div>
              </motion.div>
            </div>

            {/* Interests Card */}
            <motion.div 
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 lg:mt-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <h3 className="text-sm font-semibold text-white mb-3">What I Enjoy</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Badminton', icon: BadmintonIcon },
                  { label: 'Gaming', icon: GamepadIcon },
                  { label: 'Books', icon: BookIcon },
                  { label: 'Travelling', icon: MapIcon }
                ].map((interest, idx) => {
                  const IconComponent = interest.icon;
                  return (
                    <span 
                      key={idx}
                      className="text-xs bg-white/10 border border-white/20 text-white/90 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors flex items-center gap-1.5"
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      {interest.label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
