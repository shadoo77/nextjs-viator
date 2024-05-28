import { LuCheck } from 'react-icons/lu';

export function Checkbox({
  id,
  defaultChecked = false,
  label,
  onClick,
  disabled = false
}: {
  id: string;
  defaultChecked: boolean;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative flex flex-wrap items-center">
      <input
        className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-primary checked:bg-primary checked:hover:border-primary-dark checked:hover:bg-primary-dark focus:outline-none checked:focus:border-primary-dark checked:focus:bg-primary-dark focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
        type="checkbox"
        checked={defaultChecked}
        onChange={() => onClick()}
        id={id}
        disabled={disabled}
      />
      <label
        className="cursor-pointer pl-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
        htmlFor={id}
      >
        {label}
      </label>
      <LuCheck
        className="pointer-events-none absolute left-0 top-1 h-4 w-4 -rotate-90 stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
        aria-hidden="true"
      />
    </div>
  );
}
