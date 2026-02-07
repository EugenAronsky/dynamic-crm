import { Item, ItemContent } from '@/components/ui/item';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { TrendingUpDown } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import IncomeBlock from './income-block';
import BookingsBlock from './bookings-block';
import CancelationBlock from './cancelation-bloack';

type Props = ComponentProps<typeof Item> & { isResizing: boolean };
type TabsValue = 'month' | 'week' | 'day';

const stats = [
  {
    name: `Income (${format(new Date(), 'MMMM')})`,
    value: 18.2,
    prev: 9.45,
    tip: 'Profit and Loss',
  },
  {
    name: 'Bookings today',
    prev: 13,
    value: 8,
    tip: 'Cancellation Index',
  },
  {
    name: 'WI',
    prev: 17.25,
    value: 12.15,
    tip: 'Workload Index',
  },
];

function Statistics({ isResizing, ...rest }: Props) {
  return (
    <Item
      {...rest}
      className={cn('h-full min-w-fit flex-col items-start justify-center p-0', rest.className)}
    >
      <ItemContent className="flex h-full min-h-fit w-full basis-0 flex-row items-center justify-between">
        <div className="flex h-full gap-2 *:shadow-[0_0_4px_0] *:shadow-black/15">
          <IncomeBlock prev={1800} value={4050} title={`Income (${format(new Date(), 'MMMM')})`} />
          <BookingsBlock prev={8} value={10} title="Bookings today" />
          <CancelationBlock prev={1} value={2} title="Cancelation today" />
        </div>
      </ItemContent>
    </Item>
  );
}

export default Statistics;
