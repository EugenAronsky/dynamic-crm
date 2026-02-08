'use client';
import AITip from '@/components/blocks/widgets/ai-tip';
import DaySchedule from '@/components/blocks/widgets/day-schedule';
import QuickActions from '@/components/blocks/widgets/quick-actions';
import Statistics from '@/components/blocks/widgets/statistics/statistics';
import { useIsResizing } from '@/hooks/use-is-resizing';

export default function Dashboard() {
  const { ref, isResizing } = useIsResizing({ delay: 50 });

  return (
    <div
      ref={ref}
      className="grid h-full min-h-0 min-w-0 flex-1 grid-cols-28 grid-rows-[auto_1fr_1fr] gap-2 p-2 will-change-[wight]"
    >
      <Statistics className="col-span-28" isResizing={isResizing} />
      <DaySchedule className="col-span-14 row-span-2" isResizing={isResizing} />
      <AITip className="col-span-14" isResizing={isResizing} />
      <QuickActions className="col-span-14" isResizing={isResizing} />
    </div>
  );
}
