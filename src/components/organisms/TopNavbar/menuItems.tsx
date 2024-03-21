import {
  LuHome,
  LuBookOpen,
  LuInspect,
  LuPhone,
  LuMessageSquare,
  LuMailQuestion
} from 'react-icons/lu';
import { JSX } from 'react';
type MenuItem = {
  id: string;
  href: string;
  label: string;
  icon: JSX.Element;
  type: 'button' | 'text';
};

export const menuItems: MenuItem[] = [
  {
    id: 'getQuotation',
    href: '/quotation',
    label: 'Get quotation',
    icon: <LuMessageSquare className="w-4 h-4 mr-2" />,
    type: 'text'
  },
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
  },
  {
    id: 'faq',
    href: '/faq',
    label: 'FAQ',
    icon: <LuMailQuestion />,
    type: 'text'
  },
  {
    id: 'getInTouch',
    href: '/get-in-touch',
    label: 'Get in touch',
    icon: <LuPhone />,
    type: 'text'
  }
];
