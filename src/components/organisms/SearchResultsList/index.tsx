import {
  LuAirplay,
  LuAlertCircle,
  LuAlignJustify,
  LuAlarmClock,
  LuBadgePlus
} from 'react-icons/lu';

const items = [
  {
    Icon: LuAirplay,
    title: 'Dashboard',
    description: 'The main hub of the app, displaying data visualizations.'
  },
  {
    Icon: LuAlertCircle,
    title: 'Istanbul',
    description: 'Turkey'
  },
  {
    Icon: LuAlignJustify,
    title: 'Analytics',
    description: 'Detailed insights and metrics for usage and traffic.'
  },
  {
    Icon: LuAlarmClock,
    title: 'Cloud storage',
    description: 'Cloud-based storage, security settings, and access permissions.'
  },
  {
    Icon: LuBadgePlus,
    title: 'Settings',
    description: 'Settings and configurations for notifications and privacy.'
  }
];

export default function SearchResultsList() {
  return (
    <ul className="divide-y divide-slate-100 p-2">
      {items.map(({ Icon, title, description }, index) => (
        <li key={index} className="flex items-start gap-4 px-4 py-3 cursor-pointer hover:bg-accent">
          <div className="flex items-center text-primary">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0">
            <h4 className="text-base text-slate-700">{title}</h4>
            <p className="w-full text-sm text-slate-500">{description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
