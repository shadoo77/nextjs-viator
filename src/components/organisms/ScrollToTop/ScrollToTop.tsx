'use client';

import { useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { LuArrowUp } from 'react-icons/lu';
import { cn, isSSR } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function ScrollToTop({ yOffset = 300 }) {
  const [isVisible, setIsVisible] = useState(false);

  // Button is displayed after scrolling for 500 pixels
  const toggleVisibility = () => {
    if (window.scrollY > yOffset) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEventListener('scroll', toggleVisibility);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    if (!isSSR) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={cn(
        'fixed bottom-8 right-8 z-10 opacity-0 invisible transition-opacity duration-300 ease-in-out',
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      )}
    >
      <Button type="button" onClick={scrollToTop} variant="outline" className="p-3 rounded-full">
        <LuArrowUp className="w-4 h-4" strokeWidth={4} />
      </Button>
    </div>
  );
}
