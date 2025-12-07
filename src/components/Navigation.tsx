import { TubelightNavBar } from './ui/tubelight-navbar';

export default function Navigation() {
  const navItems = [
    { name: 'Home', url: '#hero' },
    { name: 'About', url: '#about' },
    { name: 'Skills', url: '#skills' },
    { name: 'Projects', url: '#projects' },
    { name: 'Publications', url: '#publications' },
    { name: 'Contact', url: '#contact' },
  ];

  return <TubelightNavBar items={navItems} />;
}
