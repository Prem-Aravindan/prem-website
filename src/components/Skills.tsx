import { GlassCard } from './ui/liquid-glass';
import { LogoCloud } from './ui/logo-cloud-3';

const programmingLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg", alt: "MATLAB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", alt: "C#" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
];

const webDevLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", alt: "Vue.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
];

const xrLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", alt: "Unity" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg", alt: "Blender" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg", alt: "Photoshop" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg", alt: "Illustrator" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg", alt: "Adobe XD" },
];

const toolsLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", alt: "AWS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", alt: "TensorFlow" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", alt: "PyTorch" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 px-4">
      <div className="w-full px-2 sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-white">
          Skills & Technologies
        </h2>
        
        <GlassCard className="p-1 rounded-full overflow-hidden">
          <LogoCloud logos={programmingLogos} title="Programming" speed={2} reverse={false} />
        </GlassCard>

        <GlassCard className="p-1 rounded-full overflow-hidden">
          <LogoCloud logos={webDevLogos} title="Web Development" speed={2} reverse={true} />
        </GlassCard>

        <GlassCard className="p-1 rounded-full overflow-hidden">
          <LogoCloud logos={xrLogos} title="XR & Prototyping" speed={2} reverse={false} />
        </GlassCard>

        <GlassCard className="p-1 rounded-full overflow-hidden">
          <LogoCloud logos={toolsLogos} title="Tools & Cloud" speed={2} reverse={true} />
        </GlassCard>
      </div>
    </section>
  );
}
