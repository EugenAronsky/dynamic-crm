'use client';
import AITip from '@/components/blocks/widgets/ai-tip/ai-tip';
import DaySchedule from '@/components/blocks/widgets/day-schedule/day-schedule';
import Pipeline from '@/components/blocks/widgets/pipeline/pipeline';
import { AnyBlockConfig } from '@/components/blocks/widgets/pipeline/pipeline-body';
import QuickActions from '@/components/blocks/widgets/quick-actions/quick-actions';

const PipelineBlocks: AnyBlockConfig[] = [
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
];

export default function Dashboard() {
  return (
    <div className="grid h-full min-h-0 min-w-0 flex-1 grid-cols-28 grid-rows-[auto_1fr_1fr] items-start gap-2 p-2 will-change-[wight]">
      <Pipeline className="col-span-28" blocks={PipelineBlocks} />
      <DaySchedule className="col-span-14 row-span-2" />
      <AITip className="col-span-14" />
      <QuickActions className="col-span-14" />
    </div>
  );
}
