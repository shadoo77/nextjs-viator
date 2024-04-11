'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ErrorAlertProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  withTryAgainButton?: boolean;
};

const ErrorAlert = forwardRef<HTMLDivElement, ErrorAlertProps>(
  ({ title, description, withTryAgainButton, className, ...rest }, ref) => {
    const { t } = useTranslation();
    const { refresh } = useRouter();

    return (
      <div className={cn('flex justify-center', className)} {...rest} ref={ref}>
        <Alert variant="destructive" className="flex flex-col">
          <AlertCircle className="h-4 w-4" />
          {title && <AlertTitle>{title}</AlertTitle>}
          {description && <AlertDescription>{description}</AlertDescription>}
          {withTryAgainButton && (
            <div className="w-full mt-6 flex justify-center">
              <Button onClick={() => refresh()} className="font-bold text-base">
                {t('tryAgain')}
              </Button>
            </div>
          )}
        </Alert>
      </div>
    );
  }
);

export default ErrorAlert;
