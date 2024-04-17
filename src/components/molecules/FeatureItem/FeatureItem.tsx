import { IconType } from 'react-icons/lib';

type FeatureItemProps = {
  Icon: IconType;
  title: string;
  description: string;
};

export default function FeatureItem({ Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex items-center rounded bg-primary p-2 text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex w-full min-w-0 flex-col items-center justify-center gap-0 text-base">
        <h3 className="mb-4 text-lg leading-6 text-slate-700">{title}</h3>
        <p className="text-slate-500">{description}</p>
      </div>
    </div>
  );
}
