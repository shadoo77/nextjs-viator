import { HTMLAttributes, ReactElement, forwardRef } from 'react';
import { LuX } from 'react-icons/lu';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLDivElement> & {
  label: string | ReactElement;
  onClose: () => void;
};

export const Chip = forwardRef<HTMLDivElement, Props>(
  ({ label, onClose, className, ...rest }, ref) => {
    return (
      <div
        {...rest}
        className={cn(
          'inline-flex w-fit items-center justify-between rounded-full border border-border bg-muted/50 py-2 pl-3 pr-2 text-muted-foreground hover:border-secondary-foreground',
          className
        )}
        ref={ref}
      >
        <span className="text-sm">{label}</span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClose();
          }}
          size="icon"
          variant="ghost"
          className="ml-2 h-6 w-6 rounded-full"
        >
          <LuX className="h-3 w-3" />
        </Button>
      </div>
    );
  }
);
