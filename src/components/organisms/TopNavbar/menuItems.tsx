import { JSX } from 'react';
import { LuHome, LuBookOpen, LuInspect } from 'react-icons/lu';

type MenuItem = {
  id: string;
  href: string;
  label: string;
  icon: JSX.Element;
  type: 'button' | 'text';
};

export const menuItems: MenuItem[] = [
  {
    id: 'home',
    href: '/',
    label: 'Home',
    icon: <LuHome />,
    type: 'text'
  },
  {
    id: 'howItWorks',
    href: '/how-it-works',
    label: 'How it works',
    icon: <LuBookOpen />,
    type: 'text'
  },
  {
    id: 'getInspired',
    href: '/get-inspired',
    label: 'Get inspired',
    icon: <LuInspect />,
    type: 'text'
  }
];
