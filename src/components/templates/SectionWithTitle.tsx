import { PropsWithChildren } from 'react';
import { Separator } from '@/components/ui/separator';

export default function SectionWithTitle({
  title,
  children
}: PropsWithChildren<{ title: string }>) {
  return (
    <>
      <section className="py-4">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">{title}</h2>
        <div className="container px-3 md:px-6 m-auto">{children}</div>
      </section>
      <Separator className="w-11/12 mx-auto" />
    </>
  );
}
