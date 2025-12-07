import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ContainerScroll, CardSticky } from './ui/cards-stack';
import { ImageCarousel } from './ui/image-carousel';
import { CalendarIcon, MapPinIcon, BriefcaseIcon, AcademicCapIcon, BeakerIcon } from './ui/icons';

// Import images
import ongoing1 from '@/assets/ongoing1.png';
import ongoing2 from '@/assets/ongoing2.png';
import ongoing3 from '@/assets/ongoing3.png';
import ongoing4 from '@/assets/ongoing4.png';
import fulllstack1 from '@/assets/fulllstack1.png';
import fulllstack2 from '@/assets/fulllstack2.png';
import fulllstack3 from '@/assets/fulllstack3.png';
import masterthesis1 from '@/assets/masterthesis1.png';
import masterthesis2 from '@/assets/masterthesis2.png';
import masterthesis3 from '@/assets/masterthesis3.png';
import bachelorthesis1 from '@/assets/bachelorthesis1.png';
import bachelorthesis2 from '@/assets/bachelorthesis2.png';
import bachelorthesis3 from '@/assets/bachelorthesis3.png';
import edu1 from '@/assets/edu1.jpg';
import work1 from '@/assets/work1.png';
import edu2 from '@/assets/edu2.png';
import work2 from '@/assets/work2.png';
import ppg1 from '@/assets/ppg1.png';
import ppg2 from '@/assets/ppg2.png';
import ppg3 from '@/assets/ppg3.png';
import hypertension1 from '@/assets/hypertension1.png';
import hypertension2 from '@/assets/hypertension2.png';
import hypertension3 from '@/assets/hypertension3.png';
import jvp1 from '@/assets/jvp1.jpg';
import design1 from '@/assets/design1.png';
import design2 from '@/assets/design2.png';
import design3 from '@/assets/design3.png';

// Ongoing project (appears first)
const ongoingProject = {
  title: "Neuroprofiling Platform",
  description: "Developed software components with emphasis on validation, documentation and traceability across multiple AI-driven healthcare-related modules. Collaborated with product, data and engineering teams to ensure structured development pipelines.",
  highlights: [
    "Consumer Hub - Neuroadaptive interaction system linking EEG signals with emotion-driven content generation",
    "Neuroprofiling - Python pipelines for EEG acquisition, calibration and feature extraction with multilayered proprietary algorithms",
  ],
  technologies: ["Python", "NumPy", "Scikit-learn", "Signal-Processing", "TensorFlow", "React Native",],
  type: "Ongoing",
  typeIcon: BriefcaseIcon,
  date: "Present",
  location: "Mindspeller, Belgium",
  images: [ongoing1, ongoing2, ongoing3, ongoing4],
};

const projects = [
  {
    title: "GenAI Market Research Tools",
    description: "Designed and deployed GenAI-powered market research tools for data analysis and insights generation as the sole developer and admin for AWS, GitLab and Google Cloud in a startup. ",
    highlights: [
          "MindBias - AI-assisted survey simulation with ChatGPT and Google AI APIs; reduced latency by 40% and analysis effort by 70%",
    "Survey Cleaning Tool - ChatGPT-based auto-tagging for gibberish, off-topic and typo detection; improved curation speed by 50%",
    "Concept Tracking & Library - Auto-tagging algorithm managing 5,000+ concepts with validation controls",
    "Semantic model visualization - Deep learning pipelines for 200-D embeddings with TensorBoard integration",
    ],
    technologies: ["Full-stack", "Vue.js",  "AWS", "GitLab", "Google Cloud", "ChatGPT API",],
    type: "Web Development",
    typeIcon: BriefcaseIcon,
    date: "June 2024",
    location: "Mindspeller, Belgium",
    images: [fulllstack1, fulllstack2, fulllstack3],
  },
  {
    title: "3D AR Tele-Proctoring for MIS",
    description: "Master’s thesis explored the application of 3D augmented reality for tele-proctoring in minimally invasive surgeries (MIS). This project involved designing an autostereoscopic visualization system to enhance surgical training and remote guidance. In collaboration with BARCO NV, I developed a novel framework to improve the accuracy and accessibility of MIS procedures.",
    technologies: ["Unity 3D", "AR", "C#", "Medical Imaging"],
    type: "Master's Thesis",
    typeIcon: AcademicCapIcon,
    date: "June 2023",
    location: "Leuven, Belgium",
    images: [masterthesis1, masterthesis2, masterthesis3],
  },
  {
    title: "VR Medical Training with Haptics",
    description: "In Bachelor's thesis, I developed an immersive virtual reality system with haptic feedback for medical training. The system focused on enhancing the realism and effectiveness of training procedures, particularly for high-fidelity simulations like digital rectal examination setups. This work involved designing both hardware and software solutions to provide an interactive and accurate simulation experience.",
    technologies: ["Unity 3D", "VR", "Haptics", "C#"],
    type: "Bachelor's Thesis",
    typeIcon: AcademicCapIcon,
    date: "April 2020",
    location: "Chennai, India",
    images: [bachelorthesis1, bachelorthesis2, bachelorthesis3],
  },
  {
    title: "PPG-Based Blood Pressure",
    description: "Developed a non-invasive method to estimate systolic and diastolic blood pressure using photoplethysmogram (PPG) signals. Extracted key features and applied machine learning models like linear regression and SVM for hypertension stage prediction, advancing automated diagnostic tools in healthcare.",
    technologies: ["Python", "MATLAB", "ML", "Signal Processing"],
    type: "Research",
    typeIcon: BeakerIcon,
    date: "June 2021",
    location: "Chennai, India",
    images: [ppg1, ppg2, ppg3],
  },
  {
    title: "Wearable Hypertension Monitor",
    description: "This project involved the design and development of a wearable device for real-time monitoring of hypertension. As part of an interdisciplinary team, I contributed to the integration of sensors, data acquisition systems, and user-friendly interfaces to create a reliable and accessible health monitoring solution. This work was supported by internal funding and resulted in published findings.",
    technologies: ["MATLAB", "Sensors", "Embedded"],
    type: "Research",
    typeIcon: BeakerIcon,
    date: "June 2018",
    location: "Chennai, India",
    images: [hypertension1, hypertension2, hypertension3],
  },
  {
    title: "Jugular Venous Pulse Analyzer",
    description: "This project aimed to develop a non-invasive device for extracting and analyzing jugular venous pulse (JVP) signals. I contributed to the hardware and software development, focusing on creating a compact, efficient, and user-friendly design. The findings from this project were published in peer-reviewed proceedings, showcasing its potential impact on medical diagnostics.",
    technologies: ["MATLAB", "Signal Processing", "Embedded"],
    type: "Research",
    typeIcon: BeakerIcon,
    date: "June 2017",
    images: [jvp1],
  },
  {
    title: "Design Portfolio",
    description: "Designed and edited Department magazines, posters, banners, social media posts etc. Check out my designs made using Adobe design suite platforms and Canva",
    technologies: ["Figma", "Adobe XD", "Prototyping", "UI/UX"],
    type: "Design",
    typeIcon: BriefcaseIcon,
    date: "2020-2024",
    location: "Various",
    images: [design1, design2, design3],
  },
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Close expanded view on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (expandedId !== null) {
        setExpandedId(null);
      }
    };

    if (expandedId !== null) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [expandedId]);

  return (
    <section id="projects" className="py-12 sm:py-16 px-4">
      <div className="w-full px-2 sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Experience
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto px-2">
            A selection of my work spanning healthcare technology, medical devices, and software development.
          </p>
        </div>

        <ContainerScroll className="min-h-[300vh] py-8 sm:py-12 space-y-8 sm:space-y-10">
          {/* Education & Experience - Special Card (first) */}
          <CardSticky
            index={0}
            className={cn(
              "w-full overflow-hidden rounded-xl sm:rounded-2xl border-2 border-white/30 bg-black/40 backdrop-blur-md shadow-xl mb-6 sm:mb-8 transition-all duration-500 ease-in-out",
              expandedId === 0 ? "h-[70vh] z-50" : ""
            )}
            style={{ zIndex: expandedId === 0 ? 50 : 0 }}
            incrementY={40}
            incrementZ={5}
          >
            <div className="flex flex-col md:flex-row h-full relative">
              {/* Content Side */}
              <div className={cn(
                "p-4 sm:p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between relative z-10 bg-black/20 transition-opacity duration-300",
                expandedId === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
              )}>
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      <AcademicCapIcon className="w-3 h-3 text-white/70" />
                      <span className="text-[10px] sm:text-xs font-medium text-white/70">Education & Experience</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">
                    Education & Work Experience
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                   
                    <div className="flex items-start gap-2">
                      <BriefcaseIcon className="w-4 h-4 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white text-xs sm:text-sm font-semibold">Lead Full Stack Developer</p>
                        <p className="text-gray-300 text-[11px] sm:text-xs">Mindspeller BV</p>
                        <p className="text-gray-400 text-[10px] sm:text-xs">Mar 2024– Present • Leuven, Belgium</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AcademicCapIcon className="w-4 h-4 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white text-xs sm:text-sm font-semibold">M.S., Biomedical Engineering</p>
                        <p className="text-gray-300 text-[11px] sm:text-xs">KU Leuven</p>
                        <p className="text-gray-400 text-[10px] sm:text-xs">Sep 2021– Sep 2024 • Leuven, Belgium</p>
                      </div>
                    </div>
                    
                     <div className="flex items-start gap-2">
                      <BriefcaseIcon className="w-4 h-4 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white text-xs sm:text-sm font-semibold">Project Associate</p>
                        <p className="text-gray-300 text-[11px] sm:text-xs">Verena Haptics & VR Systems Pvt. Ltd.</p>
                        <p className="text-gray-400 text-[10px] sm:text-xs">Jun 2020– Jul 2021 • Chennai, India</p>
                      </div>
                    </div>
                     <div className="flex items-start gap-2">
                      <AcademicCapIcon className="w-4 h-4 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white text-xs sm:text-sm font-semibold">B.E., Biomedical Engineering</p>
                        <p className="text-gray-300 text-[11px] sm:text-xs">SNU</p>
                        <p className="text-gray-400 text-[10px] sm:text-xs">Jun 2016– Jun 2020 • Chennai, India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className={cn(
                "relative overflow-hidden group transition-all duration-500 ease-in-out",
                expandedId === 0 ? "absolute inset-0 w-full h-full z-20" : "w-full md:w-1/2 h-40 sm:h-48 md:h-auto"
              )}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden" />
                <ImageCarousel 
                  images={[work2, edu2, work1, edu1]} 
                  alt="Education & Work Experience"
                  className="w-full h-full"
                  interval={3500}
                  isExpanded={expandedId === 0}
                  onToggleExpand={() => setExpandedId(expandedId === 0 ? null : 0)}
                />
                {/* Indicator */}
                <div className={cn(
                  "absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300",
                  expandedId === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                )}>
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-medium text-white/90">Timeline</span>
                </div>
              </div>
            </div>
          </CardSticky>

          {/* Ongoing Project - Special Card (second) */}
          <CardSticky
            index={1}
            className={cn(
              "w-full overflow-hidden rounded-xl sm:rounded-2xl border-2 border-white/30 bg-black/40 backdrop-blur-md shadow-xl mb-6 sm:mb-8 transition-all duration-500 ease-in-out",
              expandedId === 1 ? "h-[70vh] z-50" : ""
            )}
            style={{ zIndex: expandedId === 1 ? 50 : 1 }}
            incrementY={40}
            incrementZ={5}
          >
            <div className="flex flex-col md:flex-row h-full relative">
              {/* Content Side */}
              <div className={cn(
                "p-4 sm:p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between relative z-10 bg-black/20 transition-opacity duration-300",
                expandedId === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
              )}>
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] sm:text-xs font-medium text-green-400">{ongoingProject.type}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <CalendarIcon className="w-3 h-3" />
                      <span className="text-[10px] sm:text-xs">{ongoingProject.date}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">
                    {ongoingProject.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] sm:text-xs mb-3 sm:mb-4">
                    <MapPinIcon className="w-3 h-3" />
                    <span>{ongoingProject.location}</span>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                    {ongoingProject.description}
                  </p>

                  <ul className="text-gray-400 text-[10px] sm:text-xs space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 max-h-24 sm:max-h-32 overflow-y-auto">
                    {ongoingProject.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-green-500 mt-0.5 sm:mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                  {ongoingProject.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[8px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image Side */}
              <div className={cn(
                "relative overflow-hidden group transition-all duration-500 ease-in-out",
                expandedId === 0 ? "absolute inset-0 w-full h-full z-20" : "w-full md:w-1/2 h-40 sm:h-48 md:h-auto"
              )}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden" />
                <ImageCarousel 
                  images={ongoingProject.images} 
                  alt={ongoingProject.title}
                  className="w-full h-full"
                  interval={4000}
                  isExpanded={expandedId === 1}
                  onToggleExpand={() => setExpandedId(expandedId === 1 ? null : 1)}
                />
                {/* Prominent indicator for images */}
                <div className={cn(
                  "absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-green-500/30 flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300",
                  expandedId === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                )}>
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-medium text-white/90">Live Project</span>
                </div>
              </div>
            </div>
          </CardSticky>

          {/* Regular Projects */}
          {projects.map((project, index) => {
            const TypeIcon = project.typeIcon;
            const isExpanded = expandedId === index + 2; // shifted by 2 due to two special cards
            
            return (
              <CardSticky
                key={index}
                index={index + 2}
                className={cn(
                  "w-full overflow-hidden rounded-xl sm:rounded-2xl border-2 border-white/30 bg-black/40 backdrop-blur-md shadow-xl transition-all duration-500 ease-in-out",
                  isExpanded ? "h-[70vh] z-50" : ""
                )}
                style={{ zIndex: isExpanded ? 50 : index + 2 }}
                incrementY={40}
                incrementZ={5}
              >
                <div className="flex flex-col md:flex-row h-full relative">
                  {/* Content Side */}
                  <div className={cn(
                    "p-4 sm:p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between relative z-10 bg-black/20 transition-opacity duration-300",
                    isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                  )}>
                    <div>
                      <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                        <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10">
                          <TypeIcon className="w-3 h-3 text-white/70" />
                          <span className="text-[10px] sm:text-xs font-medium text-white/70">{project.type}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <CalendarIcon className="w-3 h-3" />
                          <span className="text-[10px] sm:text-xs">{project.date}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-1 text-gray-500 text-[10px] sm:text-xs mb-3 sm:mb-4">
                        <MapPinIcon className="w-3 h-3" />
                        <span>{project.location}</span>
                      </div>

                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                        {project.description}
                      </p>

                      {project.highlights && project.highlights.length > 0 && (
                        <ul className="text-gray-400 text-[10px] sm:text-xs space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 max-h-24 sm:max-h-32 overflow-y-auto">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-blue-500 mt-0.5 sm:mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-[8px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/5 text-gray-400 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={cn(
                    "relative overflow-hidden group transition-all duration-500 ease-in-out",
                    isExpanded ? "absolute inset-0 w-full h-full z-20" : "w-full md:w-1/2 h-40 sm:h-48 md:h-auto"
                  )}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden" />
                    <ImageCarousel 
                      images={project.images} 
                      alt={project.title}
                      className="w-full h-full"
                      interval={3000}
                      isExpanded={isExpanded}
                      onToggleExpand={() => setExpandedId(isExpanded ? null : index + 2)}
                    />
                    {/* Prominent indicator for images */}
                    <div className={cn(
                      "absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300",
                      isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}>
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] sm:text-xs font-medium text-white/90">Project Preview</span>
                    </div>
                  </div>
                </div>
              </CardSticky>
            );
          })}
        </ContainerScroll>
      </div>
    </section>
  );
}
