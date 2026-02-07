'use client';
import Index from '@/components/blocks/widgets';
import DaySchedule from '@/components/blocks/widgets/day-schedule';
import Income from '@/components/blocks/widgets/income/income';
import Timeline from '@/components/blocks/widgets/timeline/timeline';
import Workload from '@/components/blocks/widgets/workload/workload';
import { useIsResizing } from '@/hooks/use-is-resizing';

export default function Statistics() {
  const { ref, isResizing } = useIsResizing({ delay: 50 });

  return (
    <div
      ref={ref}
      className="grid h-full min-h-0 min-w-0 flex-1 grid-cols-28 grid-rows-14 gap-2 p-2 will-change-[wight]"
    >
      <Index className="col-span-28 row-span-1" isResizing={isResizing} />
      <Workload className="col-span-12 row-span-6" isResizing={isResizing} />
      <Income className="col-span-16 row-span-6" isResizing={isResizing} />
      <Timeline className="col-span-16 row-span-7" isResizing={isResizing} />
      <DaySchedule className="col-span-12 row-span-7" isResizing={isResizing} />
    </div>
  );
}
