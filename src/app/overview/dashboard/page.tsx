'use client';
import DaySchedule from '@/components/blocks/widgets/day-schedule';
import Statistics from '@/components/blocks/widgets/statistics/statistics';
import Timeline from '@/components/blocks/widgets/timeline/timeline';
import { useIsResizing } from '@/hooks/use-is-resizing';

export default function Dashboard() {
  const { ref, isResizing } = useIsResizing({ delay: 50 });

  return (
    <div
      ref={ref}
      className="grid h-full min-h-0 min-w-0 flex-1 grid-cols-28 grid-rows-14 gap-2 p-2 will-change-[wight]"
    >
      <Statistics className="col-span-28 row-span-2" isResizing={isResizing} />
      {/* <Workload className="col-span-12 row-span-6" isResizing={isResizing} /> */}
      {/* <Income className="col-span-16 row-span-6" isResizing={isResizing} /> */}
      <DaySchedule className="col-span-14 row-span-12" isResizing={isResizing} />
      <Timeline className="col-span-14 row-span-7" isResizing={isResizing} />
    </div>
  );
}
