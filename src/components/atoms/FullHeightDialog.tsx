'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { LuX } from 'react-icons/lu';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function FullHeightDialog({
  children,
  open,
  closeDialog
}: {
  children: ReactNode;
  open: boolean;
  closeDialog: () => void;
}) {
  const matchMinWidthSM = useMediaQuery('(min-width: 640px)');
  const modalRef = useRef<HTMLDivElement>(null);

  // this prevents the scroll if the back page is scrollable
  useEffect(() => {
    open && document.body.classList.add('overflow-hidden');
    matchMinWidthSM && document.body.classList.remove('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open, matchMinWidthSM]);

  useEffect(() => {
    if (open) {
      const modalElement = modalRef.current;
      if (!modalElement) return;
      modalElement.focus();
      //add any focusable HTML element you want to include to this string
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement instanceof HTMLElement && lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement instanceof HTMLElement && firstElement.focus();
          }
        }
      };

      const handleEscapeKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeDialog();
        }
      };

      modalElement.addEventListener('keydown', handleTabKeyPress);
      modalElement.addEventListener('keydown', handleEscapeKeyPress);

      return () => {
        modalElement.removeEventListener('keydown', handleTabKeyPress);
        modalElement.removeEventListener('keydown', handleEscapeKeyPress);
      };
    }
  }, [open, closeDialog]);

  return (
    <>
      <div
        className={cn(
          ' fixed bottom-0 left-0 right-0 top-0 z-top-navbar flex w-full flex-col overflow-y-auto bg-white p-4 transition-transform lg:-translate-x-full',
          open ? 'translate-y-0' : '-translate-y-full'
        )}
        ref={modalRef}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            closeDialog();
          }}
          size="icon"
          variant="ghost"
          className="absolute right-3 top-3 rounded-full"
        >
          <LuX className="h-4 w-4" />
        </Button>
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-40 bg-slate-900/40 transition-colors lg:hidden ${
          open ? 'block' : 'hidden'
        }`}
      />
    </>
  );
}
