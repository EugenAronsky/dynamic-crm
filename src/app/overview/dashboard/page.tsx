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
      <Statistics
        className="col-span-28"
        isResizing={isResizing}
        blocks={[
          {
            type: 'Income',
            props: {
              hours: { prev: 120, value: 145 },
              income: { prev: 2040, value: 3880 },
              title: 'Income',
              mode: 'total',
            },
          },
          {
            type: 'Expected',
            props: {
              prev: 800,
              value: 1020,
              title: 'Expected',
            },
          },
          {
            type: 'Orders',
            props: {
              prev: 8,
              value: 10,
              title: 'Orders',
            },
          },
          {
            type: 'Cancelation',
            props: {
              prev: 1,
              value: 2,
              title: 'Cancelation',
            },
          },
          {
            type: 'Conversion',
            props: {
              leads: 42,
              bookings: 18,
              title: 'Conversion',
            },
          },
        ]}
      />
      <DaySchedule className="col-span-14 row-span-2" isResizing={isResizing} />
      <AITip className="col-span-14" isResizing={isResizing} />
      <QuickActions className="col-span-14" isResizing={isResizing} />
    </div>
  );
}
