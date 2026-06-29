export type SkillLogo = {
  src: string;
  alt: string;
};

export const programmingLogos: SkillLogo[] = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg', alt: 'MATLAB' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', alt: 'C#' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
];

export const webDevLogos: SkillLogo[] = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', alt: 'Vue.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS3' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
];

export const xrLogos: SkillLogo[] = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', alt: 'Unity' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg', alt: 'Blender' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', alt: 'Figma' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg', alt: 'Photoshop' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg', alt: 'Illustrator' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg', alt: 'Adobe XD' },
];

export const toolsLogos: SkillLogo[] = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', alt: 'AWS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', alt: 'Git' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', alt: 'TensorFlow' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', alt: 'PyTorch' },
];

export const skillLogos = [
  ...programmingLogos,
  ...webDevLogos,
  ...xrLogos,
  ...toolsLogos,
];

export const skillLogoByName = new Map(skillLogos.map((logo) => [logo.alt, logo]));
