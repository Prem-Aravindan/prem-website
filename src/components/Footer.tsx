import { GlassCard } from './ui/liquid-glass';
import { LinkedInIcon, InstagramIcon, MailIcon } from './ui/icons';

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="py-8 px-4">
      <div className="w-[70%] mx-auto">
        <GlassCard className="p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Prem Aravindan Jeyakumar</h3>
              <p className="text-xs text-gray-400">
                Biomedical engineer dedicated to advancing healthcare technology and product development.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="text-xs text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" onClick={(e) => scrollToSection(e, '#skills')} className="text-xs text-gray-400 hover:text-white transition-colors">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#projects" onClick={(e) => scrollToSection(e, '#projects')} className="text-xs text-gray-400 hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#publications" onClick={(e) => scrollToSection(e, '#publications')} className="text-xs text-gray-400 hover:text-white transition-colors">
                    Publications
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="text-xs text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Connect</h4>
              <div className="flex space-x-3">
                <a 
                  href="https://linkedin.com/in/prem-aravindan" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com/premjpa" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:premaravindanj@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <MailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Prem Aravindan Jeyakumar. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Built with React, TypeScript, Tailwind CSS & Vite
            </p>
          </div>
        </GlassCard>
      </div>
    </footer>
  );
}
