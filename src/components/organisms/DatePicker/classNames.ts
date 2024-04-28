import { DateRange, DayPickerBase } from 'react-day-picker';

// get the classNames for desktop devices
export const defaultClassNames: DayPickerBase['classNames'] = {
  cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-[#ddd6fe] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
  day_range_middle: 'aria-selected:bg-[#ddd6fe] aria-selected:text-slate-800'
};

// get the classNames for small devices
export const smallDevicesClassNames = (
  date: DateRange | undefined
): DayPickerBase['classNames'] => ({
  head_cell: 'w-auto flex-grow text-muted-foreground rounded-md font-normal text-[0.8rem]',
  cell: `h-9 w-[calc(100%/7)] text-center text-sm p-0 relative
    [&:has([aria-selected].day-range-start)]:rounded-l-md
    [&:has([aria-selected].day-range-end)]:rounded-r-md
    [&:has([aria-selected].day-outside)]:bg-accent/50
    [&:has([aria-selected])]:bg-[#ddd6fe] first:[&:has([aria-selected])]:rounded-l-md
    last:[&:has([aria-selected])]:rounded-r-md focus-within:relative
    focus-within:z-20
    before:[&:has([aria-selected].day-range-start)]:absolute
    before:[&:has([aria-selected].day-range-start)]:w-1/2
    before:[&:has([aria-selected].day-range-start)]:h-full
    before:[&:has([aria-selected].day-range-start)]:bg-background
    before:[&:has([aria-selected].day-range-start)]:left-0

    before:[&:has([aria-selected].day-range-end)]:absolute
    before:[&:has([aria-selected].day-range-end)]:w-1/2
    before:[&:has([aria-selected].day-range-end)]:h-full
    before:[&:has([aria-selected].day-range-end)]:bg-background
    before:[&:has([aria-selected].day-range-end)]:right-0

    ${
      date?.from && date?.to
        ? ''
        : `
    before:[&:has([aria-selected].day-selected)]:absolute
    before:[&:has([aria-selected].day-selected)]:w-full
    before:[&:has([aria-selected].day-selected)]:bg-background
    before:[&:has([aria-selected].day-selected)]:left-0
    before:[&:has([aria-selected].day-selected)]:right-0`
    }
    `,
  day_range_middle: 'aria-selected:bg-[#ddd6fe] aria-selected:text-slate-800',
  day: 'h-9 w-9 rounded-md font-semibold text-sm p-0 relative',
  day_range_start: 'day-range-start'
});
